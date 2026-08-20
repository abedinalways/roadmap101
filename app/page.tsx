"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const features = [
  {
    icon: "🎨",
    title: "HTML5 & CSS3",
    description: "Master semantic HTML, CSS Grid, Flexbox, and modern CSS features.",
  },
  {
    icon: "⚡",
    title: "Advanced JavaScript",
    description: "Deep dive into closures, event loop, prototypes, and async patterns.",
  },
  {
    icon: "🔷",
    title: "TypeScript",
    description: "Learn type-safe development with advanced TypeScript patterns.",
  },
  {
    icon: "⚛️",
    title: "React",
    description: "Master React internals, hooks, performance optimization, and patterns.",
  },
  {
    icon: "▲",
    title: "Next.js",
    description: "Build production-ready apps with App Router, SSR, and SSG.",
  },
  {
    icon: "🧪",
    title: "Testing",
    description: "Write unit, integration, and E2E tests with Jest and Cypress.",
  },
];

const stats = [
  { number: "12+", label: "Major Topics" },
  { number: "100+", label: "Concepts Covered" },
  { number: "2", label: "Languages (BN + EN)" },
  { number: "50+", label: "Interview Questions" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge variant="info" size="md" className="mb-6">
            Complete Roadmap • Bangla + English
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Junior to <span className="text-gradient-accent">Senior</span>
            <br />Frontend Developer
          </h1>
          <p className="text-xl text-ink2 mb-4">
            তোমার সম্পূর্ণ গাইড — Basic থেকে Advanced পর্যন্ত
          </p>
          <p className="text-ink3 max-w-2xl mx-auto mb-8">
            React, Next.js, TypeScript, WebSocket, GSAP — সব কিছু বাংলা ও ইংরেজিতে বিস্তারিতভাবে শেখার এই গাইড তোমাকে সিনিয়র ডেভেলপার হিসেবে প্রস্তুত করবে।
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-accent font-mono">{stat.number}</div>
                <div className="text-sm text-ink3">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">View Roadmap</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-edge">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You&apos;ll Learn</h2>
            <p className="text-ink3">Comprehensive coverage of all frontend topics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:border-accent transition-colors">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-ink3">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-edge">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-ink3 mb-8">
            Join thousands of developers who are mastering frontend development with our comprehensive roadmap.
          </p>
          <Link href="/login">
            <Button size="lg">Start Learning Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-edge">
        <div className="max-w-6xl mx-auto text-center text-ink3 text-sm">
          <p>© 2024 Dev Roadmap. Built with Next.js, Redux Toolkit, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
