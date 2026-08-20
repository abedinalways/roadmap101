import type { Section } from "@/types";
import {
  bilingual,
  callout,
  code,
  interview,
} from "../helpers";

const WS_CODE = `// ===== PRODUCTION-GRADE useWebSocket HOOK =====
import { useEffect, useRef, useState, useCallback } from 'react';

type WSStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseWebSocketOptions {
  onMessage?: (data: unknown) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const { onMessage, reconnectInterval = 3000, maxReconnectAttempts = 5 } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WSStatus>('disconnected');
  const reconnectCount = useRef(0);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      setStatus('connected');
      reconnectCount.current = 0; // reset on success
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.(data);
      } catch {
        onMessage?.(event.data);
      }
    };

    ws.onerror = () => setStatus('error');

    ws.onclose = () => {
      setStatus('disconnected');
      // Auto-reconnect with exponential backoff
      if (reconnectCount.current < maxReconnectAttempts) {
        setTimeout(() => {
          reconnectCount.current++;
          connect();
        }, reconnectInterval * Math.pow(2, reconnectCount.current));
      }
    };
  }, [url, onMessage, reconnectInterval, maxReconnectAttempts]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close(); // cleanup
  }, [connect]);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { status, send };
}

// ব্যবহার — Chat Component
function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { status, send } = useWebSocket(
    \`wss://api.example.com/chat/\${roomId}\`,
    {
      onMessage: (data) => setMessages(prev => [...prev, data as Message])
    }
  );

  const sendMessage = (text: string) => send({ type: 'message', text });
}`;

export const websocketSection: Section = {
  id: "websocket",
  index: "10",
  icon: "🔌",
  title: "WebSocket & Real-time Communication",
  titleBn: "Real-time features বানানো — Chat, Live Updates, Collaboration",
  gradient: "from-emerald-500/20 to-cyan-500/15",
  badge: "med",
  blocks: [
    bilingual(
      "WebSocket vs HTTP — কখন কোনটা?",
      "Architecture",
      "<strong>HTTP:</strong> Request-Response pattern। Client request করে, server response দেয়। One-way communication (client থেকে)। প্রতিটা request এ নতুন connection হয় (HTTP/1.1) — overhead বেশি।<br/><strong>WebSocket:</strong> Full-duplex, persistent connection। Server ও client যেকোনো সময় data পাঠাতে পারে। Chat apps, live notifications, collaborative tools, real-time games, live price feeds এর জন্য।<br/><strong>Server-Sent Events (SSE):</strong> Server থেকে client এ one-way stream। AI chatbot response streaming এর জন্য perfect। WebSocket এর চেয়ে simple — কারণ server→client update লাগলে শুধু।",
      "<strong>HTTP:</strong> Stateless request/response. Good for CRUD operations. <strong>WebSocket:</strong> Persistent bidirectional connection — both client and server can send messages anytime. Essential for chat, collaboration, live feeds. <strong>SSE:</strong> Server-to-client streaming only — great for live feeds, notifications, and AI streaming responses. Simpler than WebSocket when you only need server→client updates."
    ),
    code("websocket-hook.tsx", "WebSocket + React", WS_CODE),
    callout(
      "info",
      "🛠️",
      "Production এ raw WebSocket এর বদলে **Socket.io** (auto-reconnect, rooms, fallback polling) বা **Pusher/Ably** (managed service) use করা common। নিজের হাতে reconnect, heartbeat, queue logic লেখার চেয়ে এগুলো বেশি reliable।",
      "Socket.io vs Raw WS",
      "বাংলা: Raw WebSocket fast কিন্তু Socket.io feature rich — rooms, broadcast, auto-reconnect। Scale-up করার আগে এটা ভাবো।"
    ),
    interview("💬 Realtime Interview Questions", [
      {
        q: "WebSocket vs HTTP Long Polling — what's the difference?",
        a: "Long polling keeps an HTTP request open until the server has new data, then responds; the client immediately re-requests. WebSocket opens one persistent TCP connection with full-duplex bidirectional messaging. WebSocket has far lower overhead and latency; long polling is simpler but wasteful.",
        bn: "বাংলা: Long polling এ প্রতিটা data এর জন্য নতুন request। WebSocket এ একটাই persistent connection, দুই দিক থেকে instant message।",
      },
      {
        q: "How do you handle reconnection and message ordering in a chat app?",
        a: "Reconnect with exponential backoff, sequence numbers on messages, buffer messages while offline and resend on reconnect, dedupe on the client, and show connection status in the UI. Heartbeat ping/pong to detect dead connections.",
        bn: "বাংলা: Backoff দিয়ে reconnect, message এ sequence number, offline buffer, আর UI তে connection status দেখানো।",
      },
    ]),
  ],
};
