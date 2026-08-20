import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  code,
  heading,
  para,
} from "../helpers";

const GSAP_CODE = `import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // ===== TIMELINE — Sequenced animations =====
    const tl = gsap.timeline();

    tl.from('.hero-title', {
      y: 80, opacity: 0, duration: 0.8, ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 40, opacity: 0, duration: 0.6, ease: 'power2.out'
    }, '-=0.4') // overlap by 0.4s
    .from('.hero-cta', {
      scale: 0.8, opacity: 0, duration: 0.4
    }, '-=0.2');

    // ===== STAGGER — Multiple elements =====
    gsap.from(cardsRef.current, {
      y: 60, opacity: 0,
      duration: 0.6, ease: 'back.out(1.7)',
      stagger: 0.1, // প্রতি card 100ms delay
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',   // viewport এর 80% এ trigger
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // ===== SCROLL-LINKED — Parallax effect =====
    gsap.to('.parallax-bg', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // scroll এর সাথে smooth sync
      }
    });

    // ===== PIN — Sticky + Animation =====
    gsap.to('.progress-bar', {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

  }, { scope: containerRef }); // scope — container এর ভেতরে selectors

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">...</h1>
      {cards.map((card, i) => (
        <div ref={el => el && (cardsRef.current[i] = el)}>...</div>
      ))}
    </div>
  );
}`;

export const gsapSection: Section = {
  id: "gsap",
  index: "11",
  icon: "🎬",
  title: "GSAP & Advanced Animations",
  titleBn: "Professional-grade animations — Basic থেকে ScrollTrigger পর্যন্ত",
  gradient: "from-emerald-500/20 to-amber-500/10",
  badge: "med",
  blocks: [
    bilingual(
      "GSAP কেন CSS Animation এর চেয়ে ভালো?",
      "GSAP",
      "GSAP (GreenSock Animation Platform) CSS animation এর চেয়ে অনেক বেশি control দেয়। Complex sequences, timeline-based animations, physics-based motion (inertia, bounce), ScrollTrigger দিয়ে scroll-linked animations — এগুলো CSS দিয়ে করা প্রায় অসম্ভব। GSAP সব browser এ consistently কাজ করে এবং performance অনেক ভালো (GPU-accelerated)। React এ `useGSAP()` hook দিয়ে properly integrate করতে হয় — এটা cleanup ও scope handle করে।",
      "GSAP offers superior control over CSS animations: timeline sequencing, staggering, physics-based motion (inertia, bounce), and the powerful ScrollTrigger plugin for scroll-linked animations. It's cross-browser consistent, GPU-accelerated, and provides fine-grained control over every frame. Use `useGSAP()` in React for proper cleanup and scoped selectors."
    ),
    code("gsap-advanced.tsx", "GSAP + React", GSAP_CODE),
    heading("🎯 Animation Best Practices"),
    para(
      "Senior developer জানেন **কবে animation দিতে হবে** — শুধু কীভাবে না। Golden rules: animate শুধু **transform এবং opacity** (এই দুইটা property GPU এ runs — expensive property (width, height, top, left) এড়াও), **ease** সবসময় দাও (linear বাদে natural look পাবে), motion sickness এড়াতে `prefers-reduced-motion` respect করো, আর animation কে performance budget এ রাখো।",
      "বাংলা: ৬০fps-এ smooth animation চাও — transform ও opacity ছাড়া অন্য কিছু animate করো না। Reduced motion ইউজারদের কথা ভাবো।"
    ),
    checklist([
      { text: "animate koro transform + opacity — 60fps guaranteed", bn: "GPU compositor layer এ চলে"},
      { text: "ease always দাও — linear look unnatural", bn: "power2.out, back.out(1.7)"},
      { text: "stagger use করো — mass group এ একসাথে না", bn: "stagger: 0.1 দিলে cascade effect"},
      { text: "prefers-reduced-motion respect করো", bn: "gsap.matchMedia() দিয়ে"},
      { text: "ScrollTrigger scrub: true দিয়ে scroll-linked animation", bn: "parallax এর জন্য"},
      { text: "SSR এ useGSAP — isometric rendering এ warning আসবে", bn: "'use client' + useEffect pattern"},
    ]),
    callout(
      "tip",
      "💡",
      "GSAP & ScrollTrigger দিয়ে ওয়েবসাইট scroll experience level up করা যায় — **but** prioritize performance। ভারী page এ animation drop করলে frame drops আর user frustration আসবে। Website এর primary job content delivery — animation secondary।",
      "Motion Budget",
      "বাংলা: Animation নেওয়ার আগে ভাবো — এটা কি user experience improve করছে নাকি শুধু decoration?"
    ),
  ],
};
