"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const completedItems = useAppSelector((state) => state.progress.completed);
  const completedCount = Object.values(completedItems).filter(Boolean).length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink mb-2">Welcome to Dev Roadmap</h1>
          <p className="text-lg text-accent font-medium">
            জুনিয়র থেকে সিনিয়র ফ্রন্টএন্ড ডেভেলপার হওয়ার সম্পূর্ণ গাইড
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-edge rounded-xl p-6">
            <div className="text-3xl font-bold text-accent mb-2">12+</div>
            <div className="text-sm text-ink3">Total Sections</div>
          </div>
          <div className="bg-card border border-edge rounded-xl p-6">
            <div className="text-3xl font-bold text-good mb-2">{completedCount}</div>
            <div className="text-sm text-ink3">Completed</div>
          </div>
          <div className="bg-card border border-edge rounded-xl p-6">
            <div className="text-3xl font-bold text-accent2 mb-2">50+</div>
            <div className="text-sm text-ink3">Interview Questions</div>
          </div>
        </div>

        <div className="bg-card border border-edge rounded-xl p-6">
          <h2 className="text-xl font-semibold text-ink mb-4">Getting Started</h2>
          <p className="text-ink2 mb-4">
            Use the sidebar to navigate through different sections of the roadmap.
            Each section covers important frontend development topics with both
            Bangla and English explanations.
          </p>
          <div className="space-y-2 text-sm text-ink3">
            <p>• Start with HTML5 & CSS3 for the foundation</p>
            <p>• Move to Advanced JavaScript for core concepts</p>
            <p>• Learn TypeScript for type-safe development</p>
            <p>• Master React and Next.js for modern frameworks</p>
            <p>• Prepare for interviews with our comprehensive guide</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
