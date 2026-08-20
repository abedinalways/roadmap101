import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  code,
  heading,
  interview,
  para,
  topics,
} from "../helpers";

const CSS_CODE = `/* ✅ CSS Custom Properties — Design System এর মতো */
:root {
  --color-primary: #4f8ef7;
  --color-surface: #0f1629;
  --spacing-unit: 8px;
  --radius-md: 12px;
  --font-heading: 'Sora', sans-serif;
}

/* ✅ CSS Grid — Advanced Layout */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: calc(var(--spacing-unit) * 3);
}

/* ✅ Container Queries — নতুন CSS feature */
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* ✅ Fluid Typography — clamp() দিয়ে */
.heading {
  /* min: 20px, ideal: 3vw, max: 40px */
  font-size: clamp(20px, 3vw, 40px);
}

/* ✅ :is() & :where() — Modern selectors */
:is(h1, h2, h3, h4) {
  font-family: var(--font-heading);
  line-height: 1.2;
}

/* ✅ :has() — Parent selector (সবচেয়ে powerful) */
.card:has(.badge) {
  border-color: var(--color-primary);
}

/* ✅ Logical Properties — LTR/RTL both তে কাজ করে */
.box {
  margin-inline-start: 1rem;
  padding-block: 0.5rem 1rem;
}`;

export const htmlCssSection: Section = {
  id: "html-css",
  index: "02",
  icon: "🎨",
  title: "HTML5 & CSS3 — Advanced",
  titleBn: "সিনিয়র লেভেলের HTML ও CSS দক্ষতা",
  gradient: "from-red-500/20 to-amber-500/20",
  badge: "basic",
  blocks: [
    bilingual(
      "Semantic HTML — কেন এত গুরুত্বপূর্ণ?",
      "HTML5",
      "Semantic HTML মানে সঠিক element সঠিক জায়গায় ব্যবহার করা। শুধু <div> দিয়ে সব করলে হবে না। <header>, <nav>, <main>, <article>, <section>, <aside>, <footer> — এগুলো SEO, Accessibility, এবং screen reader এর জন্য অত্যন্ত গুরুত্বপূর্ণ। এছাড়া <button> এর বদলে <div onClick> ব্যবহার করলে keyboard navigation ভেঙে যায়। Senior developer সবসময় semantic HTML লেখে এবং বদলে প্রতিটা element এর accessiblity impact ভাবে।",
      "Semantic HTML is about using meaningful elements that describe content purpose. It dramatically improves SEO (search engines understand content better), accessibility (screen readers navigate properly), and code maintainability. A senior dev never uses a <div> when a semantic element fits — and never uses <div onClick> where a real <button> belongs."
    ),
    topics([
      {
        icon: "📐",
        title: "CSS Grid & Flexbox",
        bn: "Complex layout তৈরির tool",
        desc: "Grid for 2D layouts, Flexbox for 1D. Understand auto-fit, auto-fill, minmax(), grid areas, grid-template, flex-grow/shrink/basis, align vs justify (main vs cross axis).",
        tags: ["Grid", "Flexbox", "Layout"],
      },
      {
        icon: "🎭",
        title: "CSS Custom Properties",
        bn: "Dynamic theming এর জন্য CSS variables",
        desc: "CSS Variables (--var-name) enable dynamic theming, component-scoped styles, and JavaScript integration. Essential for design systems. JavaScript দিয়ে var(--x) value পরিবর্তন করে runtime theme switch করা যায়।",
        tags: ["Variables", "Theming"],
      },
      {
        icon: "♿",
        title: "Accessibility (a11y)",
        bn: "সবার জন্য usable করো",
        desc: "ARIA attributes, focus management, color contrast (4.5:1), keyboard navigation, skip links, focus-visible। Senior devs treat a11y as non-negotiable।",
        tags: ["ARIA", "a11y", "WCAG"],
      },
      {
        icon: "📱",
        title: "Responsive Design",
        bn: "সব screen এ perfect look",
        desc: "Mobile-first approach, CSS Container Queries, clamp(), fluid typography, viewport units (svh, dvh, vw)। Modern responsive design কেবল media query এর বাইরে।",
        tags: ["Mobile-first", "Container Query"],
      },
      {
        icon: "⚡",
        title: "Tailwind CSS",
        bn: "Utility-first CSS framework",
        desc: "Utility classes দিয়ে rapid UI development। Design tokens (color, spacing) আগে থেকে ঠিক করা থাকে। Dark mode variant, responsive prefixes (md:, lg:), @apply, custom config — প্রতিটা junior level interview এ Tailwind নিয়ে প্রশ্ন আসে।",
        tags: ["Tailwind", "Utility-first"],
      },
      {
        icon: "🧱",
        title: "BEM & Naming Conventions",
        bn: "Scalable CSS class naming",
        desc: "Block__Element--Modifier pattern. Class name যত organized, codebase তত maintainable। CSS Modules বা Tailwind use করলেও naming logic বোঝা জরুরি।",
        tags: ["BEM", "Scalable CSS"],
      },
    ]),
    code("advanced-css-patterns.css", "CSS3", CSS_CODE),
    heading("🎯 Modern CSS Features — Senior অবশ্যই জানবে"),
    para(
      "CSS এখন আর শুধু layout engine না — এটা একটা полноцен programming medium। **:has()** selector দিয়ে parent select করা যায়, **subgrid** দিয়ে nested grid align করা যায়, **color-mix()** দিয়ে dynamic color তৈরি করা যায়। ২০২৪–২০২৬ এর এই features গুলোই interviewer কে দেখায় তুমি শুধু CSS লিখো না — CSS বুঝো।",
      "বাংলা: প্রতিটা feature টা নিজে একটা ছোট demo দিয়ে practice করো। :has() দিয়ে checkbox-ভিত্তিক theme toggle বানানো সবচেয়ে ভালো exercise।"
    ),
    checklist([
      { text: "Subgrid — nested grid যেটা parent এর tracks follow করে", bn: "grid-template-rows: subgrid"},
      { text: ":has() — parent selector, কন্ডিশনাল styling", bn: "তুলনামূলক সবচেয়ে impactful feature"},
      { text: "color-mix() — দুইটা color মিশিয়ে নতুন color", bn: "theming এ খুব useful"},
      { text: "clamp() — fluid typography + spacing", bn: "min-ideal-max তিনটা value"},
      { text: "CSS nesting — native nesting, SCSS ছাড়াই", bn: "& parent selector"},
      { text: "view transitions API — page transition", bn: "document.startViewTransition()"},
    ]),
    interview("💬 CSS Interview Questions (Senior Level)", [
      {
        q: "What is the difference between `visibility: hidden` and `display: none`?",
        a: "`display: none` removes the element from the document flow entirely (no space occupied). `visibility: hidden` hides the element but keeps its space. `opacity: 0` also keeps space but allows pointer events. Senior devs choose based on animation needs and accessibility impact.",
        bn: "বাংলা: display:none element কে visually সরিয়ে দেয়, কোনো space নেয় না। visibility:hidden লুকায় কিন্তু space রাখে। animation আর accessibility এর জন্য সঠিক choice করতে হবে।",
      },
      {
        q: "What is CSS Specificity? How is it calculated?",
        a: "Specificity determines which CSS rule wins. Inline styles (1,0,0,0) > IDs (0,1,0,0) > Classes/Attributes/Pseudo-classes (0,0,1,0) > Elements/Pseudo-elements (0,0,0,1). `!important` overrides all — avoid it.",
        bn: "বাংলা: কোন CSS rule জিতবে তা specificity দিয়ে ঠিক হয়। Inline > ID > Class > Element। !important দিয়ে সব override করা যায় কিন্তু এটা use করা উচিত নয়।",
      },
      {
        q: "What is the `:has()` selector and why is it a game changer?",
        a: "`:has()` lets you select an element based on its children or siblings — previously impossible in pure CSS. Example: `article:has(img)` styles articles containing images. It enables parent-dependent styling, form validation states (`input:has(+ p.error)`), and theme switching without JavaScript.",
        bn: "বাংলা: :has() দিয়ে বাবা element কে তার child এর ভিত্তিতে select করা যায় — আগে এটা CSS এ ছিল না। এটা দিয়ে form validation state বা conditional styling pure CSS এ করা যায়।",
      },
      {
        q: "Difference between `rem`, `em`, `%`, and `vh/vw`?",
        a: "`rem` is relative to root font-size (16px default) — predictable and accessible. `em` is relative to the element's own font-size — compounds in nested elements. `%` is relative to the parent's same property. `vh/vw` are relative to viewport. Seniors prefer `rem` for typography and spacing, with `clamp()` for fluid sizes.",
        bn: "বাংলা: rem = root (html) font-size এর সাথে সম্পর্কিত — সবচেয়ে predictable। em = নিজের parent font-size এর সাথে, nested হলে compound হয়। % = parent এর সাথে। vh/vw = viewport। Senior দের majority type এ rem use করে।",
      },
    ]),
    callout(
      "tip",
      "💡",
      "Design system বানানোর সময় color, spacing, typography সব **CSS variables** এ রাখো। তাহলে theme switch, dark/light mode, brand change — সব এক লাইনে হবে।",
      "Design Tokens",
      "বাংলা: যেকোনো color বা spacing value hardcode না করে variable এ রাখো। এটাই scalable CSS এর মূল ভিত্তি।"
    ),
  ],
};
