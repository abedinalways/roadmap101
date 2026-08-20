import type { Section } from "@/types";
import {
  bilingual,
  callout,
  para,
  topics,
} from "../helpers";

export const systemDesignSection: Section = {
  id: "system-design",
  index: "13",
  icon: "🏗️",
  title: "Frontend System Design",
  titleBn: "Senior Interview এর সবচেয়ে কঠিন অংশ — System Design",
  gradient: "from-amber-500/20 to-red-500/10",
  badge: "senior",
  blocks: [
    bilingual(
      "Frontend System Design কী জিজ্ঞেস করে?",
      "Senior Interview",
      "Senior interview তে system design question হবেই। যেমন: \"Design a real-time collaborative document editor like Google Docs\", \"Design a social media feed like Facebook\", \"Design an e-commerce product listing page\"। এখানে তুমি কীভাবে architecture করবে, কোন component তৈরি করবে, state কীভাবে manage করবে, performance কীভাবে optimize করবে, scalability নিয়ে কীভাবে ভাবো — এগুলো জানতে চায়। উত্তর এখানে \"সঠিক\" নয় — **reasoning** আর trade-off awareness টা important।",
      "Senior interviews always include a frontend system design question: 'Design a real-time collaborative editor like Google Docs', 'Design a social feed', 'Design an e-commerce listing page'. They want to see component architecture, state management strategy, data fetching approach, performance budgets, error handling, and scalability thinking. There is no single right answer — the interviewer evaluates your reasoning and trade-off awareness."
    ),
    bilingual(
      "Framework: কীভাবে System Design Answer করবে?",
      "Interview Framework",
      "১. <strong>Requirements Clarify করো:</strong> \"এটা কি mobile-only? কতজন users? Real-time দরকার?\" জিজ্ঞেস করো।<br/>২. <strong>High-level Architecture:</strong> Component tree, data flow sketch করো।<br/>৩. <strong>Core Components:</strong> কোন components তৈরি করবে, তাদের props কী।<br/>৪. <strong>State Management:</strong> Local vs Global state কীভাবে ভাগ করবে।<br/>৫. <strong>API Design:</strong> কীভাবে backend থেকে data আনবে।<br/>৬. <strong>Performance:</strong> Lazy loading, virtualization, caching।<br/>৭. <strong>Trade-offs:</strong> তুমি কী choose করলে এবং কেন।<br/><br/>আগে প্রশ্ন করো — তারপর design করো। requirement বুঝতে না পারা উত্তর সবচেয়ে বেশি fail হয়।",
      "Structure your answer: (1) Clarify requirements and constraints, (2) High-level component architecture, (3) State management approach, (4) Data fetching strategy, (5) Performance considerations, (6) Error handling and loading states, (7) Accessibility, (8) Testing strategy, (9) Trade-offs and alternatives. Always explain WHY you made each choice."
    ),
    topics([
      {
        icon: "🧩",
        title: "Component Architecture",
        bn: "Component hierarchy design",
        desc: "Atomic Design (atoms, molecules, organisms), Smart vs Dumb components, Feature-based folder structure, Barrel exports, composition over inheritance।",
        tags: ["Atomic", "Architecture"],
      },
      {
        icon: "🌐",
        title: "Micro-frontends",
        bn: "Large app কে ছোট অংশে ভাগ করো",
        desc: "Module Federation (Webpack 5), independently deployable frontend apps, team autonomy। Enterprise scale এ ব্যবহৃত হয়।",
        tags: ["Module Federation", "Scale"],
      },
      {
        icon: "🔒",
        title: "Security",
        bn: "Frontend security essentials",
        desc: "XSS prevention, CSRF tokens, Content Security Policy, secure cookie flags (HttpOnly, Secure, SameSite), input sanitization।",
        tags: ["XSS", "CSP", "CSRF"],
      },
      {
        icon: "📊",
        title: "Monitoring & Observability",
        bn: "Production এ কী হচ্ছে দেখো",
        desc: "Sentry for error tracking, Datadog/New Relic for performance, custom analytics, Real User Monitoring (RUM), structured logging।",
        tags: ["Sentry", "RUM", "Analytics"],
      },
      {
        icon: "🌍",
        title: "i18n & Internationalization",
        bn: "Multiple language support",
        desc: "next-intl / react-i18next, message extraction, locale routing, RTL support (বাংলা-চাইনিজ-আরবি), date/number formatting।",
        tags: ["i18n", "Locale", "RTL"],
      },
      {
        icon: "🚦",
        title: "Feature Flags & Releases",
        bn: "Safe deployment",
        desc: "Feature flags দিয়ে gradually roll out, canary releases, A/B testing, instant rollback — regression risk ছাড়া ship করা।",
        tags: ["Flags", "Canary", "CI/CD"],
      },
    ]),
    callout(
      "info",
      "🎯",
      "Practice prompts: (১) Real-time collaborative editor (Google Docs), (২) Social media infinite feed, (৩) E-commerce product listing with filters, (৪) Video streaming dashboard, (৫) Chat app with presence। প্রতিটা ২৫ মিনিটে design করার practice করো — timer দিয়ে।",
      "Practice Prompts",
      "বাংলা: আউটলাউড বলো — interviewer যেভাবে শুনবে সেভাবে নিজে নিজে বলার practice সবচেয়ে effective।"
    ),
  ],
};
