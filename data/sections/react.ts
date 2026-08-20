import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  code,
  heading,
  interview,
  para,
} from "../helpers";

const HOOKS_CODE = `// ===== CUSTOM HOOKS — Senior skill =====
// useFetch — API call এর জন্য reusable hook
import { useState, useEffect, useCallback, useRef } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController>();

  const fetchData = useCallback(async () => {
    abortRef.current?.abort(); // previous request cancel করো
    abortRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url, { signal: abortRef.current.signal });
      if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);
      const json: T = await res.json();
      setData(json);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort(); // cleanup
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ===== PERFORMANCE HOOKS =====
const ExpensiveComponent = React.memo(({ data }: { data: User[] }) => {
  // props না বদলালে re-render হবে না
  const processedData = useMemo(
    () => data.filter(u => u.role === 'admin'),
    [data] // শুধু data বদলালে recalculate
  );

  const handleClick = useCallback((id: number) => {
    console.log('Clicked:', id);
  }, []); // dependency নেই — সবসময় same reference

  return <div>...</div>;
});

// ===== useReducer — Complex state management =====
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; payload: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'RESET': return action.payload;
    default: return state;
  }
}`;

const BOUNDARY_CODE = `// ===== ERROR BOUNDARY — class component দিতে হবে =====
"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Sentry তে report করো
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorUI error={this.state.error} />;
    }
    return this.props.children;
  }
}

// ===== SUSPENSE — lazy loading =====
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}

// ===== REACT 19 — useOptimistic =====
"use client";

import { useOptimistic, useTransition } from "react";

function LikeButton({ likes }: { likes: number }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (state, newValue: number) => newValue
  );
  const [, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(() => addOptimistic(likes + 1));
    likePost(); // background এ API call
  };

  return <button onClick={handleLike}>♥ {optimisticLikes}</button>;
}`;

export const reactSection: Section = {
  id: "react",
  index: "05",
  icon: "⚛️",
  title: "React — Deep Dive",
  titleBn: "React এর ভেতরের mechanics থেকে Advanced Patterns পর্যন্ত",
  gradient: "from-cyan-500/15 to-cyan-500/5",
  badge: "senior",
  blocks: [
    bilingual(
      "React Internals — কীভাবে কাজ করে?",
      "Senior Must Know",
      "<strong>Virtual DOM:</strong> React একটি in-memory DOM tree রাখে। যখন state বদলায়, React Virtual DOM এ নতুন tree তৈরি করে, পুরনো tree এর সাথে compare করে (Diffing), এবং শুধু changed parts কে real DOM এ update করে — এটাকে Reconciliation বলে।<br/><br/><strong>React Fiber:</strong> React 16 থেকে আসা নতুন reconciliation engine যেটি কাজকে chunks এ ভাগ করে এবং priority দিয়ে করে, ফলে UI block হয় না। Fiber এর কাজ interruptible — matlab ekta high-priority update (যেমন typing) এসে gachle porer work pause kore diye age ota shesh kore.",
      "<strong>Virtual DOM:</strong> React maintains an in-memory representation of the DOM. On state change, it creates a new virtual tree, diffs it against the previous one (reconciliation), and makes minimal real DOM updates.<br/><br/><strong>React Fiber:</strong> The new reconciliation algorithm (React 16+) that breaks work into units, enables time-slicing, and supports Concurrent Mode — allowing React to pause, resume, and prioritize rendering work. Typing should never lag because a huge list re-render was in progress."
    ),
    code("react-advanced-hooks.tsx", "React + TypeScript", HOOKS_CODE),
    bilingual(
      "React Design Patterns — Senior Level",
      "Patterns",
      "Senior developer কিছু important design patterns জানে যেগুলো code reusability এবং maintainability বাড়ায়। এগুলো হলো: <strong>Compound Components</strong> (related components একসাথে, implicit state share করে — যেমন Select + Option), <strong>Custom Hooks</strong> (logic extract করা), <strong>HOC (Higher Order Components)</strong> (component wrap করে feature add — যেমন withAuth), <strong>Render Props</strong> (function prop দিয়ে logic share), <strong>Provider Pattern</strong> (Context দিয়ে global state)।",
      "Design patterns solve recurring problems elegantly. Key React patterns: <strong>Compound Components</strong> (components sharing implicit state, like Select + Option), <strong>Custom Hooks</strong> (logic extraction), <strong>HOC</strong> (wrapping components for cross-cutting concerns like auth), <strong>Render Props</strong> (sharing logic via function props), and the modern <strong>Hooks composition</strong> pattern. Modern codebases prefer composition over inheritance-heavy HOC chains."
    ),
    heading("🧱 Error Boundaries & Suspense"),
    para(
      "**Error Boundary** একটা React component যা এর ভেতরের child components এ error হলে পুরো app crash না করে fallback UI দেখায়। Class component হতেই হয় — hooks এ এখনো error boundary নেই। **Suspense** দিয়ে async অপারেশন loading state manage করা যায় — lazy loading components, data fetching (React 19 এ server components + Suspense streaming)।",
      "বাংলা: Error Boundary = পুরো app crash না করে একটা সুন্দর fallback দেখায়। Suspense = loading state declare করার নতুন React উপায়।"
    ),
    code("error-boundary.tsx", "React 19", BOUNDARY_CODE),
    heading("🚀 React 19 — নতুন যা যা জানা দরকার"),
    checklist([
      { text: "useOptimistic — optimistic UI update (like button instant)", bn: "API slow হলেও UI instant respond করে"},
      { text: "useActionState + <form action> — form submission native", bn: "useState/useFormStatus এর simple version"},
      { text: "use() hook — Promise / Context suspense দিয়ে read করা যায়", bn: "top-level এ await impossible টা solve করে"},
      { text: "Actions — Server Actions, async transitions", bn: "React 18 এর transitions এর extension"},
      { text: "Ref as a prop — forwardRef আর দরকার নেই", bn: "React 19 এ ref normal prop"},
      { text: "Compiler (React Compiler) — auto memoization", bn: "useMemo/useCallback অটো optimize"},
    ]),
    interview("💬 React Interview Questions (Senior)", [
      {
        q: "What is the difference between useMemo and useCallback?",
        a: "`useMemo` memoizes a computed value. `useCallback` memoizes a function reference. Both take a dependency array. Use `useMemo` for expensive calculations; `useCallback` for stable references passed to children or effect deps.",
        bn: "বাংলা: useMemo = value cache, useCallback = function reference cache। Expensive calculation → useMemo, child এ function pass → useCallback।",
      },
      {
        q: "Why shouldn't you update state directly in React?",
        a: "React state is immutable by design. Direct mutation doesn't trigger re-renders because React uses reference equality checks. Always create new objects/arrays: `setState([...prev, item])`, not `prev.push(item)`.",
        bn: "বাংলা: Direct mutation করলে React reference equality check এ detect করতে পারে না। সবসময় নতুন object/array বানাও।",
      },
      {
        q: "What are React keys and why are they important?",
        a: "Keys help React identify which list items changed, were added, or removed. They must be unique among siblings. Never use array index as keys for dynamic lists — reordering breaks because React maps old DOM nodes to wrong items.",
        bn: "বাংলা: Keys = list item এর identity। Array index key হিসেবে দিলে reorder এ ভুল হয়। Stable unique id use করো।",
      },
      {
        q: "What causes unnecessary re-renders and how do you fix them?",
        a: "Common causes: parent state changes, new object/array/function references every render, missing keys, context value changes. Fixes: React.memo, useMemo/useCallback, memoized selectors, component composition (state colocation), and React Compiler in React 19.",
        bn: "বাংলা: প্রতি render এ নতুন reference তৈরি হওয়াই main কারণ। React.memo + useCallback + state colocation দিয়ে fix হয়।",
      },
      {
        q: "`useEffect` vs `useLayoutEffect`?",
        a: "`useEffect` runs after paint — async, non-blocking, good for data fetching/subscriptions. `useLayoutEffect` runs synchronously after DOM mutations but before paint — used for measuring layout, DOM-dependent reads that must happen before the browser repaints. Misusing layout effect blocks rendering.",
        bn: "বাংলা: useEffect paint এর পরে চলে। useLayoutEffect paint এর আগে — layout measurement এর জন্য। বেশিরভাগ সময় useEffect যথেষ্ট।",
      },
      {
        q: "What does StrictMode do in development?",
        a: "StrictMode runs effects twice in development to surface bugs: non-idempotent effects, missing cleanup, impure render functions. It also double-invokes render functions and state updaters to catch impure logic. In production it does nothing — zero overhead.",
        bn: "বাংলা: StrictMode development এ effects double run করে যাতে cleanup না থাকা বা impure logic ধরা পড়ে। Production এ কিছু করে না।",
      },
    ]),
    callout(
      "tip",
      "✅",
      "Re-render সমস্যা হলে **React DevTools Profiler** দিয়ে প্রথমে খুঁজে বের করো কোন component বারবার render হচ্ছে — তারপর fix করো। আগে থেকেই useMemo/useCallback দিয়ে সব wrap করে দিলে code জটিল হয়ে যায়।",
      "Performance First",
      "বাংলা: Optimization তখনই করো যখন profile করে সমস্যা পেয়েছো। অযথা memo করলে code পড়া কঠিন হয়।"
    ),
  ],
};
