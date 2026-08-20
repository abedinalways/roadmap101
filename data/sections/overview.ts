import type { Section } from "@/types";
import {
  bilingual,
  callout,
  heading,
  levelRow,
  para,
  timeline,
} from "../helpers";

export const overviewSection: Section = {
  id: "overview",
  index: "01",
  icon: "🗺️",
  title: "Roadmap Overview",
  titleBn: "সম্পূর্ণ রোডম্যাপ — কোথা থেকে শুরু করবে এবং কোথায় যাবে",
  gradient: "from-sky-500/20 to-violet-500/20",
  blocks: [
    bilingual(
      "Senior Developer মানে কী?",
      "Overview",
      "Senior Frontend Developer মানে শুধু কোড লেখা না। এর মানে হলো — সমস্যা বোঝা, সঠিক solution বেছে নেওয়া, অন্যদের mentor করা, codebase এর ownership নেওয়া, এবং business goals কে technical solution এ convert করতে পারা। তুমি শুধু feature বানাও না, তুমি architecture তৈরি করো। ধরো একটা জুনিয়র ভাবে — 'আমি button আর form বানাতে পারি'। কিন্তু সিনিয়র ভাবে — 'এই button কোথায় বসবে, এটা কত user handle করবে, loading state কী হবে, error হলে কী দেখাবে, accessibility ঠিক আছে কিনা, performance এ impact পড়বে কিনা'। পুরো system দেখার চোখই তোলে একজন জুনিয়রকে সিনিয়রে।",
      "A Senior Frontend Developer is not just about writing more code — it's about thinking at a higher level. You architect solutions, mentor junior devs, make trade-off decisions, write maintainable and scalable code, and deeply understand performance, security, and user experience. You own the 'why' behind every technical choice. Juniors ask 'how do I build this feature?', seniors ask 'what is the right way to build it for the long term?'."
    ),
    levelRow([
      { tone: "basic", label: "🟢 Junior (0–2 years): Features বানাও, bugs fix করো" },
      { tone: "mid", label: "🟡 Mid (2–4 years): Patterns জানো, independently deliver করো" },
      { tone: "senior", label: "🔴 Senior (4+ years): Architecture, mentoring, ownership" },
    ]),
    heading("📍 তোমার Learning Path (Phase by Phase)", "চারটি ফেজে সিনিয়র হওয়ার পথ"),
    timeline([
      {
        phase: "Phase 1",
        title: "Foundation Mastery",
        bn: "ভিত্তি মজবুত করো",
        desc: "HTML5 semantic elements, CSS3 advanced (Grid, Flexbox, Custom Properties, Container Queries, Animations), JavaScript fundamentals থেকে Advanced (Closures, Prototypes, Async/Await, Event Loop, Modules), Web APIs। মনে রেখো — এই ফেজেই প্রায় ৮০% junior candidate interview এ ব্যর্থ হয়। সিনিয়র হতে হলে foundation টা হতে হবে rock solid।",
        time: "⏱ 4–6 weeks (if not already solid)",
      },
      {
        phase: "Phase 2",
        title: "TypeScript & React Deep Dive",
        bn: "TypeScript ও React এ দক্ষতা বাড়াও",
        desc: "TypeScript advanced types (Generics, Conditional Types, Utility Types, Discriminated Unions), React internals (Reconciliation, Fiber, Hooks), Custom hooks, Performance optimization (memo, useMemo, useCallback, lazy loading), State management patterns (Context, Zustand, Redux Toolkit), React 19 features (useOptimistic, use, Actions)।",
        time: "⏱ 6–8 weeks",
      },
      {
        phase: "Phase 3",
        title: "Next.js, Realtime & Animations",
        bn: "Production-grade skills শেখো",
        desc: "Next.js App Router, SSR/SSG/ISR, Server vs Client Components, Route Handlers, Middleware, WebSocket & Socket.io, SSE, GSAP advanced animations, ScrollTrigger, parallax। এই ফেজেই তুমি production-level tooling এ দক্ষ হয়ে উঠবে।",
        time: "⏱ 6–8 weeks",
      },
      {
        phase: "Phase 4",
        title: "Senior Skills",
        bn: "সিনিয়র মানসিকতা তৈরি করো",
        desc: "Testing (Jest, RTL, Cypress/Playwright), System Design for Frontend, CI/CD, Micro-frontends, Accessibility (a11y), Security (XSS, CSP), Monitoring (Sentry), Code Review best practices, Mentoring। এই ফেজ শেষ হয় না — এটা একটা continuous journey।",
        time: "⏱ 4–6 weeks + ongoing",
      },
    ]),
    heading("📖 এই গাইড কীভাবে ব্যবহার করবে?"),
    para(
      "প্রতিটা section এর নিচে **Interview Questions** বক্স আছে — সেগুলো পড়ে উত্তর নিজে মুখে বলার চেষ্টা করো। **Checklist** গুলোতে ক্লিক করে progress track করো — সেটা তোমার browser এ save থাকবে। উপরের search bar দিয়ে যেকোনো topic খুঁজে পাও যাবে। আর ভাষা toggle দিয়ে পুরো গাইড বাংলা ↔ English এ switch করা যায়।"
    ),
    callout(
      "tip",
      "💡",
      "একই সাথে সব পড়ার চেষ্টা করো না। প্রতিটা topic এর জন্য **একটা করে mini project** বানাও। পড়া আর practice এর ratio সবসময় 1:2 রাখো।",
      "Senior Tip",
      "বাংলা: শুধু পড়লে মনে থাকে না — হাতে করে বানালে তবেই শেখা হয়। প্রতিটা chapter শেষে একটা ছোট project বানানো অভ্যাস করো।"
    ),
    para(
      "তুমি কোথায় আছো সেটা জানতে চাইলে আগে **overview** টা শেষ করো, তারপর নিজের দুর্বল section থেকে শুরু করো। সবচেয়ে common ভুল হলো — ভালো লাগা topic (যেমন animation) নিয়ে বসে থাকা আর কঠিন topic (যেমন system design) এড়িয়ে যাওয়া। কঠিন topics গুলোতেই বেশি সময় দাও, কারণ সেগুলোই interview আর promotion ঠিক করে।"
    ),
  ],
};
