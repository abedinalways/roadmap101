"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@/components/ui/Badge";

const navigation = [
  {
    section: "Getting Started",
    items: [
      { name: "Roadmap Overview", href: "/dashboard", icon: "🗺️" },
    ],
  },
  {
    section: "Core Skills",
    items: [
      { name: "HTML5 & CSS3", href: "/dashboard/html-css", icon: "🎨", difficulty: "basic" as const },
      { name: "Advanced JavaScript", href: "/dashboard/javascript", icon: "⚡", difficulty: "mid" as const },
      { name: "TypeScript", href: "/dashboard/typescript", icon: "🔷", difficulty: "mid" as const },
    ],
  },
  {
    section: "Frameworks",
    items: [
      { name: "React", href: "/dashboard/react", icon: "⚛️", difficulty: "senior" as const },
      { name: "Next.js", href: "/dashboard/nextjs", icon: "▲", difficulty: "senior" as const },
    ],
  },
  {
    section: "Advanced",
    items: [
      { name: "State Management", href: "/dashboard/state", icon: "🗄️", difficulty: "mid" as const },
      { name: "Performance", href: "/dashboard/performance", icon: "🚀", difficulty: "senior" as const },
      { name: "WebSocket", href: "/dashboard/websocket", icon: "🔌", difficulty: "mid" as const },
      { name: "GSAP & Animations", href: "/dashboard/gsap", icon: "🎬", difficulty: "mid" as const },
      { name: "Testing", href: "/dashboard/testing", icon: "🧪", difficulty: "senior" as const },
      { name: "System Design", href: "/dashboard/system-design", icon: "🏗️", difficulty: "senior" as const },
    ],
  },
  {
    section: "Interview",
    items: [
      { name: "Interview Prep", href: "/dashboard/interview", icon: "🎯", difficulty: "senior" as const },
    ],
  },
];

const difficultyColors = {
  basic: "success" as const,
  mid: "warning" as const,
  senior: "danger" as const,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-bg2 border-r border-edge fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-edge">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">🚀</span>
          <span className="font-bold text-ink">Dev Roadmap</span>
        </Link>
        <p className="text-xs text-ink3 mt-1">Junior to Senior Frontend</p>
      </div>

      <nav className="p-4 space-y-6">
        {navigation.map((group) => (
          <div key={group.section}>
            <h3 className="text-xs font-semibold text-ink3 uppercase tracking-wider mb-2">
              {group.section}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent border-l-2 border-accent"
                        : "text-ink2 hover:bg-edge/50 hover:text-ink"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    {"difficulty" in item && item.difficulty && (
                      <Badge variant={difficultyColors[item.difficulty]} size="sm">
                        {item.difficulty}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
