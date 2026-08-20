import type { Section } from "@/types";
import {
  bilingual,
  callout,
  code,
  heading,
  para,
  table,
} from "../helpers";

const ZUSTAND_CODE = `// ===== ZUSTAND — Simple, Powerful State Management =====
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  devtools(  // Redux DevTools support
    persist(  // localStorage এ save করে
      (set, get) => ({
        items: [],
        total: 0,

        addItem: (item) => set((state) => {
          const newItems = [...state.items, item];
          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price, 0)
          };
        }),

        removeItem: (id) => set((state) => {
          const newItems = state.items.filter(i => i.id !== id);
          return { items: newItems, total: newItems.reduce((s, i) => s + i.price, 0) };
        }),

        clearCart: () => set({ items: [], total: 0 }),
      }),
      { name: 'cart-storage' }
    )
  )
);

// Component এ ব্যবহার:
function CartIcon() {
  const { items, total } = useCartStore();
  // Zustand automatically subscribes to only what you use
  return <div>{items.length} items — ৳{total}</div>;
}

// ===== REACT QUERY — Server State Management =====
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UsersList() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 minute cache
  });

  const mutation = useMutation({
    mutationFn: (newUser: Partial<User>) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // list refresh
    }
  });
}`;

export const stateSection: Section = {
  id: "state",
  index: "08",
  icon: "🗄️",
  title: "State Management",
  titleBn: "Context, Zustand, Redux — সঠিক tool বেছে নেওয়া",
  gradient: "from-purple-500/20 to-sky-500/10",
  badge: "med",
  blocks: [
    table(
      ["Tool", "Best For", "বাংলায়", "Learning Curve"],
      [
        [
          { text: "useState + Context" },
          { text: "Small apps, simple global state (theme, auth)" },
          { text: "ছোট app এ যথেষ্ট" },
          { text: "🟢 Easy", level: "easy" },
        ],
        [
          { text: "Zustand" },
          { text: "Mid-size apps, simple API, no boilerplate" },
          { text: "Simple ও powerful — বেশিরভাগ project এ ideal" },
          { text: "🟡 Medium", level: "med" },
        ],
        [
          { text: "Redux Toolkit" },
          { text: "Large enterprise apps, complex state logic" },
          { text: "Complex app, team project, predictable state" },
          { text: "🔴 Hard", level: "hard" },
        ],
        [
          { text: "React Query / TanStack" },
          { text: "Server state (fetching, caching, syncing)" },
          { text: "API data manage করার জন্য best tool" },
          { text: "🟡 Medium", level: "med" },
        ],
        [
          { text: "Jotai / Recoil" },
          { text: "Atomic state, fine-grained updates" },
          { text: "Atomic approach, performance critical apps" },
          { text: "🟡 Medium", level: "med" },
        ],
      ]
    ),
    code("zustand-store.ts", "Zustand + React Query", ZUSTAND_CODE),
    heading("🤔 সঠিক tool টা কীভাবে বেছে নেবে?"),
    para(
      "Interview তে সবচেয়ে common প্রশ্ন — **\"কেন এটা বেছে নিলে আর ওটা না?\"**। সঠিক উত্তর নির্ভর করে ৪টা জিনিসের উপর: (১) state এর scope — কয়টা component এ লাগে, (২) state এর nature — client state নাকি server state, (৩) update frequency — কতবার change হয়, (৪) team size — কতজন codebase এ কাজ করে। আগে props drilling কতটা problem হচ্ছে সেটা measure করো — ২-৩ level drilling হলে Context enough।",
      "বাংলা: প্রথমে ৪টা প্রশ্ন নিজেকে করো — scope? client/server? frequency? team size? তারপর tool choose করো। আজকাল junior interview এও এভাবে analyze করার আশা করা হয়।"
    ),
    bilingual(
      "Context vs State Library — বড় misunderstanding",
      "Important",
      "অনেকে ভাবে Context একটা state management solution — সেটা ভুল। Context শুধু **prop drilling solve করে** — এটা re-render optimization করে না। Context value change হলে provider এর **সব** consumer re-render হয়। তাই high-frequency state এর জন্য Context use করলে performance hit আসবে। তখন Zustand/Redux use করাই ভালো — যারা selector-based subscription করে মানে শুধু প্রাসঙ্গিক অংশ re-render হয়।",
      "A common misconception: Context IS a state management solution — it's not. Context only solves prop drilling; it doesn't prevent re-renders. When a context value changes, every consumer re-renders. For high-frequency state, use Zustand or Redux with selector-based subscriptions — components only re-render when their selected slice changes."
    ),
    callout(
      "warn",
      "⚠️",
      "**Context + useMemo-ভিত্তিক manual optimization** দিয়ে performant করা যায়, কিন্তু state library use করলে সেটা free। সিদ্ধান্ত নেওয়ার সময় memory allocation, debugging experience, এবং team familiarity — সব factor ভাবো।",
      "Re-render Trap",
      "বাংলা: Context value change এ সব consumer re-render হয়। High-frequency state এ এটা avoid করতে state library ব্যবহার করো।"
    ),
  ],
};
