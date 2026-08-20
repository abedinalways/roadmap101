import type { HeroMeta, NavGroup } from "@/types";

export const HERO: HeroMeta = {
  tag: "📖 Complete Roadmap • বাংলা + English",
  titleA: "Junior থেকে",
  titleB: "Senior Frontend Developer",
  titleBn: "তোমার সম্পূর্ণ গাইড — Basic থেকে Advanced পর্যন্ত",
  desc: "React, Next.js, TypeScript, Redux, RTK Query, WebSocket, GSAP, Testing, System Design — সব কিছু বাংলা ও ইংরেজিতে বিস্তারিতভাবে। এই গাইড তোমাকে সিনিয়র ডেভেলপার হিসেবে প্রস্তুত করবে এবং যেকোনো ইন্টারভিউতে আত্মবিশ্বাসী করবে।",
  stats: [
    { num: "14+", label: "Major Topics" },
    { num: "120+", label: "Concepts Covered" },
    { num: "2", label: "Languages (BN + EN)" },
    { num: "60+", label: "Interview Questions" },
  ],
};

export const NAV: NavGroup[] = [
  {
    label: "Start",
    labelBn: "শুরু",
    items: [
      {
        id: "overview",
        label: "Roadmap Overview",
        labelBn: "রোডম্যাপ ওভারভিউ",
        icon: "🗺️",
      },
    ],
  },
  {
    label: "Core Skills",
    labelBn: "মৌলিক দক্ষতা",
    items: [
      {
        id: "html-css",
        label: "HTML5 & CSS3",
        labelBn: "HTML ও CSS",
        icon: "🎨",
        badge: "Basic",
        badgeTone: "easy",
      },
      {
        id: "javascript",
        label: "Advanced JavaScript",
        labelBn: "উন্নত জাভাস্ক্রিপ্ট",
        icon: "⚡",
        badge: "Mid",
        badgeTone: "med",
      },
      {
        id: "typescript",
        label: "TypeScript",
        labelBn: "টাইপস্ক্রিপ্ট",
        icon: "🔷",
        badge: "Mid",
        badgeTone: "med",
      },
    ],
  },
  {
    label: "Frameworks",
    labelBn: "ফ্রেমওয়ার্ক",
    items: [
      {
        id: "react",
        label: "React (Deep Dive)",
        labelBn: "রিঅ্যাক্ট",
        icon: "⚛️",
        badge: "Senior",
        badgeTone: "senior",
      },
      {
        id: "nextjs",
        label: "Next.js",
        labelBn: "নেক্সট.জেএস",
        icon: "▲",
        badge: "Senior",
        badgeTone: "senior",
      },
    ],
  },
  {
    label: "State & Data",
    labelBn: "স্টেট ও ডেটা",
    items: [
      {
        id: "redux",
        label: "Redux & RTK Query",
        labelBn: "রিডাক্স ও আরটিকে কুয়েরি",
        icon: "🧠",
        badge: "Hot",
        badgeTone: "hot",
      },
      {
        id: "state",
        label: "State Management",
        labelBn: "স্টেট ম্যানেজমেন্ট",
        icon: "🗄️",
        badge: "Mid",
        badgeTone: "med",
      },
    ],
  },
  {
    label: "Performance & Motion",
    labelBn: "পারফরম্যান্স ও মোশন",
    items: [
      {
        id: "performance",
        label: "Performance",
        labelBn: "পারফরম্যান্স",
        icon: "🚀",
        badge: "Senior",
        badgeTone: "senior",
      },
      {
        id: "websocket",
        label: "WebSocket & Realtime",
        labelBn: "রিয়েলটাইম",
        icon: "🔌",
        badge: "Mid",
        badgeTone: "med",
      },
      {
        id: "gsap",
        label: "GSAP & Animations",
        labelBn: "অ্যানিমেশন",
        icon: "🎬",
        badge: "Mid",
        badgeTone: "med",
      },
    ],
  },
  {
    label: "Senior Skills",
    labelBn: "সিনিয়র দক্ষতা",
    items: [
      {
        id: "testing",
        label: "Testing",
        labelBn: "টেস্টিং",
        icon: "🧪",
        badge: "Senior",
        badgeTone: "senior",
      },
      {
        id: "system-design",
        label: "System Design",
        labelBn: "সিস্টেম ডিজাইন",
        icon: "🏗️",
        badge: "Senior",
        badgeTone: "senior",
      },
      {
        id: "interview",
        label: "Interview Prep",
        labelBn: "ইন্টারভিউ প্রস্তুতি",
        icon: "🎯",
        badge: "🔥 Hot",
        badgeTone: "hot",
      },
    ],
  },
];
