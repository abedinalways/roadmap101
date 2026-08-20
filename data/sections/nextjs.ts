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

const NEXT_CODE = `// ===== APP ROUTER — Server Components (default) =====
// app/users/page.tsx
async function UsersPage() {
  // Server Component — directly fetch করা যায়, no useEffect needed!
  const users = await fetch('https://api.example.com/users', {
    next: { revalidate: 60 } // ISR — ৬০ সেকেন্ড পর revalidate
  }).then(r => r.json());

  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ===== CLIENT COMPONENT =====
'use client'; // এই directive দিতে হবে

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ===== ROUTE HANDLERS (API Routes) =====
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';

  const users = await getUsersFromDB(parseInt(page));
  return NextResponse.json({ users, page });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newUser = await createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}

// ===== MIDDLEWARE — authentication, redirects =====
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};`;

export const nextjsSection: Section = {
  id: "nextjs",
  index: "06",
  icon: "▲",
  title: "Next.js — App Router & Beyond",
  titleBn: "Next.js দিয়ে Production-ready Full-stack Apps",
  gradient: "from-white/10 to-white/5",
  badge: "senior",
  blocks: [
    bilingual(
      "Rendering Strategies — SSR, SSG, ISR, CSR",
      "Critical Concept",
      "<strong>CSR (Client Side Rendering):</strong> Browser এ JavaScript দিয়ে render হয়। SEO খারাপ, প্রথম load slow।<br/><strong>SSR (Server Side Rendering):</strong> প্রতিটি request এ server HTML তৈরি করে পাঠায়। Dynamic data, SEO ভালো।<br/><strong>SSG (Static Site Generation):</strong> Build time এ HTML তৈরি হয়। অনেক fast, কিন্তু data static।<br/><strong>ISR (Incremental Static Regeneration):</strong> SSG + automatic revalidation। নির্দিষ্ট সময় পর পর নতুন data নিয়ে rebuild করে। Best of both worlds!<br/><br/>তুমি কখন কোনটা use করবে সেটাই senior এর test। সব জায়গায় SSR দিলে server cost বাড়ে, সব SSG দিলে data stale থাকে।",
      "<strong>CSR:</strong> HTML rendered in browser via JS. Fast interactions, poor initial SEO.<br/><strong>SSR:</strong> HTML generated per-request on server. Good for real-time data and SEO.<br/><strong>SSG:</strong> HTML pre-built at build time. Blazing fast, but data may be stale.<br/><strong>ISR:</strong> Static pages that automatically revalidate after a set interval — combining the performance of SSG with freshness of SSR.<br/><br/>Choosing correctly is the senior test: SSR everywhere is costly, SSG everywhere means stale data."
    ),
    code("next-app-router.tsx", "Next.js App Router", NEXT_CODE),
    callout(
      "tip",
      "✅",
      "App Router এ সব component **by default Server Component** (fast, ছোট JS bundle, সরাসরি DB access)। শুধু সেখানে <code>'use client'</code> দাও যেখানে useState/useEffect/browser API দরকার। Client components গুলো **tree এর leaf** এ রাখো।",
      "Server vs Client Components",
      "বাংলা: যত কম client component, তত fast app। Tree এর নিচে client leaf components রাখাই best practice।"
    ),
    heading("🗃️ Caching in Next.js — App Router এর cache layers"),
    para(
      "Next.js App Router এ চারটা cache layer আছে: (১) **Request Memoization** — একই request এ একই fetch deduplicate হয়, (২) **Data Cache** — fetch response persistent cache, (৩) **Full Route Cache** — build time এ static page cache, (৪) **Router Cache** — client side navigation cache। এগুলো কখন কীভাবে invalidate হয় সেটা বোঝা senior level এর জন্য essential।",
      "বাংলা: Four layers মনে রাখো — Request Memoization, Data Cache, Full Route Cache, Router Cache। প্রতিটা কে কীভাবে refresh হবে সেটা `revalidate`, `force-dynamic`, `no-store` দিয়ে control করা যায়।"
    ),
    checklist([
      { text: "fetch revalidate: 60 — data cache এ 60s পরে fresh data", bn: "ISR এর data version"},
      { text: "fetch cache: 'no-store' — প্রতি request এ fresh", bn: "dynamic data এর জন্য"},
      { text: "generateStaticParams — dynamic route pre-render", bn: "blog post IDs আগে থেকে জানা থাকলে"},
      { text: "dynamic = 'force-dynamic' — page সবসময় server এ render", bn: "user-specific data"},
      { text: "next/image — automatic optimization", bn: "WebP, lazy, responsive"},
      { text: "next/font — self-hosted fonts, CLS zero", bn: "Google Fonts bundle friendly"},
    ]),
    heading("🪄 Streaming & Suspense — slow section block করো না"),
    para(
      "App Router এ page এর slow অংশটুকু **Suspense boundary** এ wrap করে দিলে বাকি অংশ immediate render হয় আর slow অংশ পরে stream হয়ে আসে। এতে LCP improves হয় আর user কে blank page দেখায় না। `<Suspense fallback={<Skeleton/>}>` — এই একটা pattern দিয়ে page এর perceived performance অনেক বাড়ে।",
      "বাংলা: পুরো page load না হওয়া পর্যন্ত অপেক্ষা না করে, fast অংশ আগে দেখাও, slow অংশ পরে। এটাই streaming।"
    ),
    interview("💬 Next.js Interview Questions", [
      {
        q: "Pages Router vs App Router — what's the difference?",
        a: "Pages Router (legacy): file-based routing in /pages, all components client by default, uses getServerSideProps/getStaticProps. App Router (13+): routing in /app, Server Components by default, async/await directly in components, streaming, Suspense, and nested layouts.",
        bn: "বাংলা: Pages Router পুরনো — সব client component। App Router নতুন — server components default, async/await সরাসরি, streaming support।",
      },
      {
        q: "How does ISR work under the hood?",
        a: "ISR serves a static page built at build time. When the revalidate window passes, the next request gets the cached page while a background job regenerates the page. New data is served on subsequent requests. The old page is never broken during regeneration.",
        bn: "বাংলা: ISR এ static page serve হয়, কিন্তু revalidate সময় পেরিয়ে গেলে background এ নতুন HTML বানিয়ে cache update করে। User কে কখনো stale broken page দেখায় না।",
      },
      {
        q: "When would you use Next.js middleware?",
        a: "Middleware runs before every request — perfect for auth checks, redirects, A/B testing, bot detection, and geo-based routing. It runs on the edge. Example: redirect unauthenticated users from /dashboard to /login before the page renders.",
        bn: "বাংলা: Middleware = request আগে edge এ চলে। Auth check, redirect, bot detection এর জন্য। Page render এর আগেই।",
      },
      {
        q: "Why is `next/image` better than a plain `<img>` tag?",
        a: "next/image auto-optimizes: serves WebP/AVIF, resizes to the needed dimensions, lazy-loads off-screen images, adds `width`/`height` to prevent CLS, and uses a CDN. It also respects `sizes` for responsive images. This alone can improve LCP by seconds.",
        bn: "বাংলা: next/image অটো optimize করে — format, size, lazy load, CLS prevention। Plain img এর চেয়ে অনেক ভালো performance।",
      },
    ]),
  ],
};
