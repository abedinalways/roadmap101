"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAppSelector } from "@/store/hooks";
import { useGetRoadmapQuery } from "@/store/services/roadmapApi";
import { Paragraph } from "@/components/Rich";

export default function DashboardRoadmapPage() {
  const { data: roadmap, isLoading, error } = useGetRoadmapQuery();
  const completedItems = useAppSelector((state) => state.progress.completed);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-20 w-full" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl">
          <div className="bg-bad/10 border border-bad/20 rounded-xl p-6">
            <p className="text-bad">Failed to load roadmap data. Please try again.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalCount = roadmap?.sections.length || 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink mb-2">Roadmap Overview</h1>
          <p className="text-lg text-accent font-medium">
            {roadmap?.meta.hero.descBn || roadmap?.meta.hero.desc}
          </p>
        </div>

        <div className="bg-card border border-edge rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-ink">Your Progress</h2>
            <span className="text-sm text-ink3">{completedCount} / {totalCount} sections</span>
          </div>
          <div className="w-full bg-edge rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {roadmap?.sections.map((section) => {
            const isCompleted = completedItems[section.id] || false;
            return (
              <div
                key={section.id}
                className={`bg-card border rounded-xl p-6 transition-colors ${
                  isCompleted ? "border-good/30 bg-good/5" : "border-edge"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{section.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-ink">{section.title}</h3>
                      <span className="text-xs text-ink3">Section {section.index}</span>
                      {isCompleted && (
                        <span className="text-good text-sm">✓ Completed</span>
                      )}
                    </div>
                    <p className="text-accent text-sm mb-2">{section.titleBn}</p>
                    <div className="text-sm text-ink3">
                      {section.blocks
                        .filter((block) => block.type === "bilingual")
                        .slice(0, 1)
                        .map((block, idx) => (
                          <Paragraph key={idx} text={block.en} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
