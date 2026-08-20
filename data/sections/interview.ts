import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  heading,
  interview,
  para,
} from "../helpers";

export const interviewSection: Section = {
  id: "interview",
  index: "14",
  icon: "🎯",
  title: "Interview Preparation — Complete Guide",
  titleBn: "Senior Interview জেতার complete strategy",
  gradient: "from-pink-500/20 to-violet-500/15",
  badge: "senior",
  blocks: [
    bilingual(
      "Senior Interview এ কী জিজ্ঞেস হয়?",
      "🔥 Critical",
      "Senior interview সাধারণত ৪টা round এ হয়: (১) <strong>Technical Screening</strong> — JavaScript/TypeScript/React basics; (২) <strong>Coding Challenge</strong> — algorithm বা component building; (৩) <strong>System Design</strong> — architecture discussion; (৪) <strong>Behavioral</strong> — past experience, leadership, conflict resolution। প্রতিটা round আলাদাভাবে prepare করতে হবে। আর ভার্চুয়াল setup এ screen sharing + whiteboard এও practice করা উচিত।",
      "Senior interviews typically have 4 rounds: (1) Technical phone screen with JavaScript/framework questions; (2) Coding challenge — building a real component or solving algorithmic problems; (3) System design — 'Design X for millions of users'; (4) Behavioral — leadership, trade-off decisions, conflict resolution, STAR method answers."
    ),
    interview("💬 Top 12 Senior Frontend Interview Questions", [
      {
        q: "Q1: Explain the React reconciliation algorithm.",
        a: "React diffs the Virtual DOM when state changes: (1) Different element types = unmount old, mount new; (2) Same type = update attributes; (3) Lists = keys for matching. React Fiber makes this work interruptible and prioritized.",
        bn: "বাংলা: State বদলালে React নতুন Virtual DOM tree বানায়, compare করে, changed parts real DOM এ update করে। Fiber এই process কে chunks এ করে priority অনুযায়ী।",
      },
      {
        q: "Q2: SSR vs SSG in Next.js — and when to use each?",
        a: "SSR generates HTML per request (dynamic, real-time). SSG generates at build time (static, fastest). ISR bridges both — static pages that revalidate. Use SSR for user-specific data, SSG for marketing/blog, ISR for pages that update occasionally.",
        bn: "বাংলা: SSR = প্রতি request এ dynamic। SSG = build time এ static। ISR = SSG + auto revalidation। Blog → SSG, user dashboard → SSR, product page → ISR।",
      },
      {
        q: "Q3: How would you optimize a slowly rendering React app?",
        a: "(1) Profile with React DevTools Profiler; (2) React.memo to skip re-renders; (3) useMemo for expensive calculations; (4) useCallback for stable references; (5) Virtualization for long lists; (6) lazy() code splitting; (7) check list keys; (8) avoid anonymous functions in JSX.",
        bn: "বাংলা: Profile করো → slow component খুঁজে → memo/useMemo/useCallback/virtualization/lazy order এ fix করো।",
      },
      {
        q: "Q4: How do you handle race conditions in async React code?",
        a: "Use AbortController to cancel previous fetches. In useEffect, return a cleanup that calls abort(). This prevents memory leaks and stale responses overwriting newer ones. In RTK Query/React Query, stale-time and abort handling come free.",
        bn: "বাংলা: AbortController দিয়ে previous request cancel করো, useEffect cleanup এ abort() call করো। এতে memory leak আর stale data দুটোই solve হয়।",
      },
      {
        q: "Q5: Patterns to avoid prop drilling?",
        a: "(1) Context for global state (theme/auth); (2) Component composition — pass components as children; (3) State libraries (Zustand, Redux); (4) Render props; (5) Custom hooks. Don't reach for Context for 2-3 levels of drilling.",
        bn: "বাংলা: Context, composition (children), Zustand/Redux, custom hooks। 2-3 level drilling normal — Context তাড়াহুড়ো করে use করো না।",
      },
      {
        q: "Q6: Controlled vs uncontrolled components?",
        a: "Controlled: React state is the single source of truth — every change goes through setState. Predictable, testable. Uncontrolled: DOM manages state, accessed via refs. Simpler for basic forms. Controlled for validation/conditional rendering; uncontrolled for simple file inputs.",
        bn: "বাংলা: Controlled = React state control করে, Uncontrolled = DOM নিজে manage করে। Validation থাকলে controlled better।",
      },
      {
        q: "Q7: TypeScript `unknown` vs `any`?",
        a: "`any` disables type checking — dangerous. `unknown` is type-safe — you must narrow before using. Always prefer `unknown` for genuinely unknown values (API responses, catch errors). Narrow with typeof/instanceof/custom guards.",
        bn: "বাংলা: any = type check বন্ধ — dangerous। unknown = narrow করা লাগে — safe। always unknown।",
      },
      {
        q: "Q8: How do you approach accessibility (a11y)?",
        a: "Semantic HTML, contrast 4.5:1, keyboard navigation, focus management in modals, ARIA only when semantic isn't enough, skip links, screen reader testing (NVDA/VoiceOver), automated tests with jest-axe.",
        bn: "বাংলা: Semantic HTML, contrast, keyboard nav, focus trap, ARIA, axe-core testing — non-negotiable।",
      },
      {
        q: "Q9: What's the difference between Virtual DOM and Shadow DOM?",
        a: "Virtual DOM (React) is a JavaScript object representation used for diffing and efficient updates — a performance technique. Shadow DOM (Web Components) is a browser feature for style/behavior encapsulation — isolating component styles from the rest of the page. Different problems, similar-sounding names.",
        bn: "বাংলা: Virtual DOM = React এর diffing technique (performance)। Shadow DOM = browser এর style encapsulation (isolating)। দুটো ভিন্ন জিনিস।",
      },
      {
        q: "Q10: How do closures interact with loops — the classic question?",
        a: "With `var`, all loop iterations share one binding — setTimeout callbacks all see the final value. With `let` (block scoping) or an IIFE/closure factory, each iteration gets its own binding. Use `let` or create a closure per iteration.",
        bn: "বাংলা: var দিলে সব callback শেষ value দেখে। let দিলে প্রতিটা iteration নিজের binding পায়। for loop এ let use করলেই problem solve।",
      },
      {
        q: "Q11: What's your debugging workflow for a production bug?",
        a: "Step 1: Reproduce and isolate (environment, version, input). Step 2: Add instrumentation/logging around the failing path. Step 3: Check monitoring (Sentry, RUM, logs) for the failure window. Step 4: Write a regression test. Step 5: Fix, ship behind a flag, verify, then remove the flag.",
        bn: "বাংলা: Reproduce → isolate → instrument → monitor data দেখো → regression test → fix → flag দিয়ে deploy → verify।",
      },
      {
        q: "Q12: How do you decide between monorepo vs multi-repo?",
        a: "Monorepo (Turborepo/Nx): shared code, atomic changes, consistent tooling, easier refactoring — great for multiple apps sharing design systems or types. Multi-repo: independent versioning/deploy, better for truly independent teams. Start with monorepo for frontend apps sharing packages.",
        bn: "বাংলা: Shared code বেশি থাকলে monorepo — এক commit এ সব update, tools একই। সম্পূর্ণ independent teams হলে multi-repo।",
      },
    ]),
    heading("🧠 Behavioral Questions — STAR Method"),
    para(
      "**STAR Method:** Situation → Task → Action → Result। প্রতিটা behavioral answer এই format এ দাও। Result এ **numbers** দাও — \"load time 40% কমিয়েছি\", \"30% bounce rate কমিয়েছি\"। Interviewer এটা শুনে impression নেয় যে তুমি impact minded।",
      "বাংলা: প্রতিটা story এ ৪টা অংশ — পরিস্থিতি, কাজ, তুমি যা করলে, আর মাপা যায় এমন ফল। Numbers = impact।"
    ),
    bilingual(
      "Common Behavioral Questions",
      "Soft Skills",
      "• \"Tell me about a time you had a technical disagreement with a teammate.\"<br/>• \"Describe a project where you had to make a difficult technical decision.\"<br/>• \"How do you mentor junior developers?\"<br/>• \"Tell me about a production bug you fixed under pressure.\"<br/>• \"How do you handle unrealistic deadlines?\"<br/><br/>এগুলো আগে থেকে prepare করে রাখো **real examples** সহ। মুখস্থ না — নিজের গল্প নিজের ভাষায়।",
      "Senior roles expect leadership and ownership. Prepare STAR answers for: owning/fixing a critical production incident, technical decision-making under constraints, mentoring junior devs, resolving team conflicts, pushing back on unrealistic deadlines. Show you think beyond your own code — you care about team, users, and business impact."
    ),
    callout(
      "warn",
      "⚠️",
      "শুধু feature গুলোর নাম মুখস্থ করবে না — **কেন ব্যবহার করা হয়, কী trade-off আছে, কোন situation এ কোনটা better** — এটা জানা Senior এর কাজ। \"I just use it because everyone uses it\" — এই answer এ fail হবে। Interviewer জিজ্ঞেস করবে: \"Why did you choose Zustand over Redux?\" — উত্তর তোমার কাছে থাকতে হবে।",
      "Interview এ যা করবে না"
    ),
    heading("📚 Resources & 12-week Study Plan"),
    bilingual(
      "Daily Study Plan (2–3 hours/day)",
      "Action Plan",
      "Week 1-2: JavaScript Internals — **You Don't Know JS** (Kyle Simpson) + Event Loop practice<br/>Week 3-4: TypeScript Advanced — typescriptlang.org handbook<br/>Week 5-6: React Deep Dive — Official docs + Dan Abramov's blog (overreacted.io)<br/>Week 7-8: Next.js App Router — docs + নিজে ২টা project বানাও<br/>Week 9-10: State + Testing — Redux Toolkit, RTL (Kent C. Dodds)<br/>Week 11-12: System Design + Mock Interviews<br/><br/>**প্রতিদিন একটা ছোট project / commit বানাও।** শুধু পড়লে হবে না।",
      "Must-read resources: **You Don't Know JS** (Kyle Simpson), **overreacted.io** (Dan Abramov), **kentcdodds.com** (testing + patterns), **joshwcomeau.com** (CSS + animation), **web.dev** (performance + a11y). Build real projects. Contribute to open source. Write blog posts about what you learn."
    ),
    heading("✅ Interview-এর আগের দিন Checklist"),
    checklist([
      { text: "Position এর job description আবার পড়ো — required stack match করো", bn: "JD তে যা লেখা, তার উপর basis করেই প্রশ্ন"},
      { text: "কোনো ২টা project এর depth story prepare করো", bn: "architecture, trade-off, impact"},
      { text: "STAR format এ ৫টা behavioral answer", bn: "conflict, bug, deadline, mentorship"},
      { text: "Typing practice — coding round এ speed important", bn: "clean naming, comments না, test করো"},
      { text: "Whiteboard (virtual) এ system design flow বানাও", bn: "Excalidraw/FigJam এ practice"},
      { text: "ভালো প্রশ্ন prepare করো interview শেষে ask করার জন্য", bn: "'সবচেয়ে বড় challenge কী?'"},
    ]),
    callout(
      "star",
      "🌟",
      "সবচেয়ে important advice: Senior হওয়া মানে শুধু বেশি code জানা না — সমস্যা solve করার mindset, কেন ও কখন কোন tool use করবে সেটা জানা, team কে help করা, business impact বোঝা। Code লেখার পাশাপাশি **documentation, code review, mentoring** practice করো। GitHub এ real projects রাখো, blog লেখো, community তে contribute করো।",
      "Build in public",
      "বাংলা: শেখার সাথে সাথে share করো। এটাই তোমার skills এর সবচেয়ে ভালো proof।"
    ),
  ],
};
