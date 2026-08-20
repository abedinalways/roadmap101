import type { Section } from "@/types";
import {
  bilingual,
  callout,
  code,
  heading,
  interview,
  para,
} from "../helpers";

const TS_CODE = `// ===== BASIC TYPES =====
type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator'; // Union type
  createdAt: Date;
  address?: string; // Optional property
};

// ===== GENERIC TYPES — Reusable type patterns =====
type ApiResponse<T> = {
  data: T;
  error: string | null;
  loading: boolean;
  meta?: {
    total: number;
    page: number;
  };
};

// ব্যবহার:
type UserResponse = ApiResponse<User>;
type UserListResponse = ApiResponse<User[]>;

// ===== UTILITY TYPES — Advanced =====
type PartialUser = Partial<User>;       // সব field optional
type ReadonlyUser = Readonly<User>;     // সব field immutable
type UserPreview = Pick<User, 'id' | 'name'>;   // শুধু নির্দিষ্ট fields
type UserWithoutId = Omit<User, 'id'>;  // id বাদে বাকি সব

// ===== CONDITIONAL TYPES =====
type IsArray<T> = T extends any[] ? 'yes' : 'no';
type Test1 = IsArray<string[]>; // 'yes'
type Test2 = IsArray<string>;   // 'no'

// ===== MAPPED TYPES =====
type Optional<T> = {
  [K in keyof T]?: T[K]; // Custom Partial
};

// ===== INTERSECTION TYPES =====
type AdminUser = User & {
  permissions: string[];
  lastLogin: Date;
};

// ===== DISCRIMINATED UNIONS — Pattern matching =====
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

function renderState(state: LoadingState) {
  switch (state.status) {
    case 'success': return state.data; // TypeScript জানে data আছে ✅
    case 'error': return state.error;   // TypeScript জানে error আছে ✅
  }
}

// ===== TYPE GUARDS =====
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}

// ===== SATISFIES — Type safety + inferred literal types =====
const config = {
  width: 800,
  height: 600,
  mode: 'dark',
} satisfies Record<string, number | string>;

config.mode; // 'dark' (literal) এভাবে access করা যায় ✅`;

const TSCONFIG_CODE = `{
  "compilerOptions": {
    "strict": true,                 // সবচেয়ে গুরুত্বপূর্ণ
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}`;

export const typescriptSection: Section = {
  id: "typescript",
  index: "04",
  icon: "🔷",
  title: "TypeScript — Basic to Advanced",
  titleBn: "TypeScript দিয়ে type-safe, scalable code লেখা",
  gradient: "from-cyan-500/20 to-sky-500/20",
  badge: "med",
  blocks: [
    bilingual(
      "কেন TypeScript শিখবে?",
      "Essential",
      "TypeScript হলো JavaScript এর একটি superset যেটি static typing add করে। এর ফলে bugs আগেই ধরা পড়ে, IDE support অনেক ভালো হয় (autocomplete, refactoring), code পড়া ও maintain করা সহজ হয়। Production-grade application এ TypeScript ছাড়া কাজ করা এখন প্রায় অসম্ভব। Senior developer হতে হলে TypeScript এ advanced knowledge থাকা বাধ্যতামূলক। ধরো — একটা API response এর shape type দিয়ে define করা থাকলে, field rename করলেই compile time এ error দেখাবে, user এর কাছে যাওয়ার আগেই।",
      "TypeScript adds static typing to JavaScript, catching errors at compile time rather than runtime. It enables better IDE support (autocomplete, refactoring), makes code self-documenting, and scales well for large teams. Advanced TypeScript includes utility types, conditional types, mapped types, discriminated unions, and template literal types. The compiler is your teammate — it catches mistakes before users ever see them."
    ),
    code("typescript-advanced.ts", "TypeScript", TS_CODE),
    heading("⚙️ Strict Mode — সবচেয়ে বড় senior signal"),
    para(
      "Interview এ **'strict mode চালু করবে নাকি'** প্রশ্ন না আসলেও, config দেখেই interviewer বুঝে তুমি senior কিনা। `strict: true` আসলে একসাথে চালু করে — `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess` সহ অনেকগুলো safety check। এগুলো off রেখে কাজ করলে TypeScript ব্যবহার করে লাভ নেই। `any` কোনো কাজে লাগে না — সেটা type safety কে পুরো বাইপাস করে দেয়।",
      "বাংলা: strict: true চালু রাখো। any ব্যবহার এড়িয়ে চলো। যেকোনো junior-এর লেখা TypeScript code এ strictNullChecks off থাকলে সেটা red flag।"
    ),
    code("tsconfig.json", "JSON", TSCONFIG_CODE),
    callout(
      "warn",
      "⚠️",
      "**`any` কখনোই use করো না** — এটা TypeScript কে JavaScript বানিয়ে দেয়। API response এ unknown + type guard দিয়ে narrow করো। Library type নাই? নিজে declaration file লিখো। এই habit টাই senior কে আলাদা করে।",
      "Avoid `any`",
      "বাংলা: any দিয়ে সাপোর্ট সমস্যা solve হলেও long-term এ সবচেয়ে বড় debt তৈরি হয়।"
    ),
    interview("💬 TypeScript Interview Questions", [
      {
        q: "What is the difference between `type` and `interface` in TypeScript?",
        a: "Both define object shapes. `interface` supports declaration merging (can be extended across files) and is better for OOP. `type` is more flexible — supports unions, intersections, mapped types, conditional types. Prefer `interface` for public APIs and object shapes; `type` for everything else.",
        bn: "বাংলা: interface declaration merging support করে, type বেশি flexible — union, intersection, conditional types। Public API তে interface, complex logic এ type।",
      },
      {
        q: "What are Generics and why are they useful?",
        a: "Generics enable reusable type-safe components/functions. Instead of `any`, use `<T>` to say 'the type will be decided when used.' Like `Array<string>` vs `Array<number>` — same structure, different types. RTK Query, React hooks, Zustand stores — সবখানে generic type দেখা যায়।",
        bn: "বাংলা: Generics = reusable type-safe pattern। any না দিয়ে T দিয়ে flexible type বানানো যায়।",
      },
      {
        q: "What is the `satisfies` operator (TypeScript 4.9+)?",
        a: "`satisfies` checks a value against a type without widening it. Unlike an annotation, it preserves the inferred literal types. Example: `const config = {...} satisfies Record<string, string | number>` keeps literal types for each key while still type-checking the whole object.",
        bn: "বাংলা: satisfies দিয়ে type check হয় কিন্তু literal type নষ্ট হয় না। annotation দিলে literal type টা widen হয়ে যেত।",
      },
      {
        q: "Explain key utility types: `Partial`, `Pick`, `Omit`, `Record`.",
        a: "`Partial<T>` makes all properties optional. `Pick<T, K>` selects a subset of keys. `Omit<T, K>` removes keys. `Record<K, V>` builds an object type with keys K and values V. These come from the standard library and cover 80% of everyday type transformations.",
        bn: "বাংলা: Partial = সব optional, Pick = কিছু key নাও, Omit = কিছু key বাদ দাও, Record = key-value map type।",
      },
    ]),
  ],
};
