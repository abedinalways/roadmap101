import type { Section } from "@/types";
import {
  bilingual,
  callout,
  code,
  heading,
  interview,
  para,
  table,
} from "../helpers";

const SLICE_CODE = `// ===== REDUX TOOLKIT — createSlice =====
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  history: number[];
}

const initialState: CounterState = { value: 0, history: [] };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) { state.value += 1; },
    decrement(state) { state.value -= 1; },
    incrementBy(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    reset(state) { state.value = 0; state.history = []; },
  },
});

// auto-generated actions — manually action object লিখতে হয় না!
export const { increment, decrement, incrementBy, reset } = counterSlice.actions;
export default counterSlice.reducer;

// ===== STORE — configureStore =====
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ===== SELECTOR + DISPATCH in component =====
// "use client";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const value = useSelector((s: RootState) => s.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}

// Redux DevTools এ সব action + state দেখতে পাবে — debugging সহজ ✅`;

const RTK_CODE = `// ===== RTK QUERY — Server State Management =====
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: number;
  name: string;
  email: string;
}

// ১। define API — baseQuery + endpoints
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    // ২। QUERY — data পড়া (GET)
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),

    // ৩। MUTATION — data change করা (POST)
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      // success হলে list auto-refresh
      invalidatesTags: ["User"],
    }),
  }),
});

// auto-generated hooks — manual loading/error state দরকার নেই!
export const { useGetUsersQuery, useCreateUserMutation } = usersApi;

// ===== COMPONENT এ ব্যবহার =====
// "use client";
import { useGetUsersQuery, useCreateUserMutation } from "./usersApi";

function UsersPage() {
  // RTK Query নিজে handle করে: loading, error, cache, refetch, retry
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery();
  const [createUser, { isLoading: creating }] = useCreateUserMutation();

  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorBox error={error} onRetry={refetch} />;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
      <button
        disabled={creating}
        onClick={() => createUser({ name: "Rahim", email: "r@x.com" })}
      >
        Add User
      </button>
    </ul>
  );
}`;

export const reduxSection: Section = {
  id: "redux",
  index: "07",
  icon: "🧠",
  title: "Redux & RTK Query",
  titleBn: "Predictable state + smart data fetching — একসাথে",
  gradient: "from-violet-500/20 to-purple-500/10",
  badge: "senior",
  blocks: [
    bilingual(
      "Redux কেন দরকার?",
      "Must Know",
      "Redux হলো predictable state container। বড় app এ client state global ভাবে manage করা দরকার হয় — login info, cart, settings, notification — অনেক component এ একই state লাগে। Redux এর মূল ৩টা concept: **Store** (একটাই global state tree), **Actions** (state change করার ডিসক্রিপশন — কী ঘটেছে), **Reducers** (pure function — পুরনো state + action দিয়ে নতুন state)। আর **selectors** দিয়ে store থেকে ডেটা বেছে নেওয়া হয়। কারণ Redux **predictable** — প্রতিটা state change একটা নির্দিষ্ট action দিয়ে হয়, আর Redux DevTools এ প্রতিটা change history দেখা যায়।",
      "Redux is a predictable state container. In large apps you need global client state — auth, cart, settings, notifications — shared across many components. Core concepts: **Store** (single state tree), **Actions** (plain objects describing what happened), **Reducers** (pure functions producing new state from old state + action), and **selectors** to read derived data. It's predictable because every change flows through a dispatch, and DevTools gives you full time-travel debugging."
    ),
    heading("🧩 Redux Toolkit — Redux এর আধুনিক দর্শন"),
    para(
      "Purano Redux এ writing actions, action creators, reducers, store setup — এত boilerplate ছিল যে সবাই এড়িয়ে যেত। **Redux Toolkit** এই সব solve করে: `createSlice` এ actions + reducers একসাথে অটো generated হয়, `configureStore` দিয়ে middleware setup (Redux DevTools সহ) এক লাইনে, আর Immer দিয়ে **state mutation syntax এ লিখলেও immutable update অটো হয়ে যায়**। Redux Toolkit এখন Redux এর official recommended way।",
      "বাংলা: Redux Toolkit দিয়ে boilerplate ৮০% কমে গেছে। createSlice, configureStore, Immer — এই তিনটাই main।"
    ),
    code("redux-toolkit-slice.ts", "Redux Toolkit", SLICE_CODE),
    heading("⚡ RTK Query — server state এর সেরা সমাধান"),
    para(
      "**RTK Query** Redux Toolkit এর উপর build করা data fetching library। React Query এর মতোই — কিন্তু Redux store এর সাথে native integration। এটা নিজে handle করে: caching, loading/error state, auto-retry, refetch on focus/reconnect, optimistic updates, tag-based cache invalidation। অর্থাৎ — তুমি শুধু API definition দাও, বাকি সব library করে দেয়। এই সাইটটাই প্রমাণ — **পুরো রোডম্যাপ content টা RTK Query দিয়েই `/api/roadmap` থেকে fetch হচ্ছে!**",
      "RTK Query is a powerful data fetching library built on Redux Toolkit. It handles caching, loading/error states, auto-retry, refetch on focus/reconnect, optimistic updates, and tag-based invalidation automatically. You define the API once and get typed hooks for free. This very site fetches its content from /api/roadmap using RTK Query."
    ),
    code("rtk-query-api.ts", "RTK Query", RTK_CODE),
    heading("⚖️ কখন কোনটা use করবে?"),
    table(
      ["Tool", "Best For", "বাংলায়", "Learning Curve"],
      [
        [
          { text: "useState + Context", },
          { text: "Small apps, simple global state (theme, auth)" },
          { text: "ছোট app এ যথেষ্ট" },
          { text: "🟢 Easy", level: "easy" },
        ],
        [
          { text: "Zustand" },
          { text: "Mid-size apps, minimal boilerplate" },
          { text: "Simple ও powerful — বেশিরভাগ project এ ideal" },
          { text: "🟡 Medium", level: "med" },
        ],
        [
          { text: "Redux Toolkit" },
          { text: "Large enterprise apps, complex state logic" },
          { text: "Predictable, team-friendly, DevTools support" },
          { text: "🔴 Hard", level: "hard" },
        ],
        [
          { text: "RTK Query / React Query" },
          { text: "Server state (fetching, caching, syncing)" },
          { text: "API data manage করার জন্য best tool" },
          { text: "🟡 Medium", level: "med" },
        ],
        [
          { text: "Jotai / Recoil" },
          { text: "Atomic state, fine-grained updates" },
          { text: "Perf-critical, small to mid apps" },
          { text: "🟡 Medium", level: "med" },
        ],
      ]
    ),
    callout(
      "tip",
      "🧠",
      "Senior pattern: **client state** (theme, form, UI toggle) এর জন্য Redux/Zustand, আর **server state** (API data) এর জন্য RTK Query/React Query। দুইটা আলাদা problem — একটার solution দিয়ে অন্যটা solve করার চেষ্টা করো না।",
      "State Split",
      "বাংলা: Server data কখনো Redux store এ manually রাখবে না — RTK Query/React Query cache এ রাখবে। না হলে fetching logic রিপিট হবে আর cache invalidation nightmare হবে।"
    ),
    interview("💬 Redux & RTK Query Interview Questions", [
      {
        q: "What is the difference between Redux Toolkit and React Query?",
        a: "Redux Toolkit manages client-side state with a predictable store/actions/reducers pattern. React Query (TanStack Query) manages server-side state — fetching, caching, syncing API data. They solve different problems. RTK Query unifies them by adding data-fetching on top of Redux Toolkit.",
        bn: "বাংলা: Redux Toolkit = client state (global UI state)। React Query/RTK Query = server state (API data)। দুটো আলাদা problem। RTK Query দুটোকে একসাথে করে।",
      },
      {
        q: "What is an RTK Query tag and how does invalidation work?",
        a: "Tags mark cached data. A query `providesTags` tells RTK Query what data it contains. A mutation `invalidatesTags` tells it 'this data is now stale.' After a mutation, RTK Query automatically refetches queries that provided the invalidated tag — keeping the cache in sync without manual refetch calls.",
        bn: "বাংলা: providesTags = আমার data এ কি আছে। invalidatesTags = এটা পরিবর্তিত হয়েছে। Mutation হলে related queries auto-refetch হয়।",
      },
      {
        q: "Why is Redux reducer required to be a pure function?",
        a: "Reducers must be pure so state transitions are predictable and testable — same input always produces same output, no side effects. This enables time-travel debugging, easy testing, and avoids subtle bugs from shared mutation. RTK Toolkit's Immer wraps reducers, but the pure-function contract stays.",
        bn: "বাংলা: Pure function = same input → same output, no side effects। এটাই predictability আর DevTools time-travel debugging এর ভিত্তি।",
      },
      {
        q: "Zustand vs Redux — when would you choose each?",
        a: "Zustand: minimal API, no boilerplate, small apps, faster to onboard, selectors with automatic subscription scoping. Redux: better for large teams needing strict conventions, time-travel debugging, predictable middleware pipeline, and when server state is unified via RTK Query. Start with Zustand; reach for Redux when the team and app are big enough to need structure.",
        bn: "বাংলা: ছোট/মাঝারি app → Zustand (simple)। বড় enterprise team → Redux (structure + DevTools)।",
      },
    ]),
  ],
};
