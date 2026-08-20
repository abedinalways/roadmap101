"use client";

import { use } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useGetRoadmapQuery } from "@/store/services/roadmapApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleItem } from "@/store/slices/progressSlice";
import { Paragraph } from "@/components/Rich";
import Badge from "@/components/ui/Badge";

const sectionIdMap: Record<string, string> = {
  "html-css": "htmlcss",
  "javascript": "javascript",
  "typescript": "typescript",
  "react": "react",
  "nextjs": "nextjs",
  "state": "state",
  "performance": "performance",
  "websocket": "websocket",
  "gsap": "gsap",
  "testing": "testing",
  "system-design": "system-design",
  "interview": "interview",
};

export default function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: roadmap, isLoading } = useGetRoadmapQuery();
  const dispatch = useAppDispatch();
  const completedItems = useAppSelector((state) => state.progress.completed);

  const sectionId = sectionIdMap[slug] || slug;
  const section = roadmap?.sections.find((s) => s.id === sectionId);

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

  if (!section) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl">
          <div className="bg-warn/10 border border-warn/20 rounded-xl p-6">
            <p className="text-warn">Section not found.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isCompleted = completedItems[section.id] || false;

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex items-start gap-5 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-xl flex-shrink-0">
            {section.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-mono text-ink3 uppercase tracking-widest mb-1">
              Section {section.index}
            </p>
            <h1 className="text-2xl font-bold text-ink mb-1">{section.title}</h1>
            <p className="text-accent font-medium">{section.titleBn}</p>
          </div>
          <button
            onClick={() => dispatch(toggleItem(section.id))}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isCompleted
                ? "bg-good/20 text-good border border-good/30"
                : "bg-edge text-ink2 hover:bg-edge2"
            }`}
          >
            {isCompleted ? "✓ Completed" : "Mark as Complete"}
          </button>
        </div>

        <div className="space-y-6">
          {section.blocks.map((block, idx) => {
            switch (block.type) {
              case "bilingual":
                return (
                  <div key={idx} className="border border-edge rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 bg-edge/30 border-b border-edge">
                      <h3 className="font-semibold text-ink">{block.title}</h3>
                      {block.tag && (
                        <Badge variant="info" size="sm">{block.tag}</Badge>
                      )}
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-good" />
                          <span className="text-xs font-semibold text-ink3 uppercase tracking-wider">Bangla</span>
                        </div>
                        <Paragraph text={block.bn} className="text-ink2 leading-relaxed" />
                      </div>
                      <hr className="border-edge" />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-xs font-semibold text-ink3 uppercase tracking-wider">English</span>
                        </div>
                        <Paragraph text={block.en} className="text-ink3 leading-relaxed" />
                      </div>
                    </div>
                  </div>
                );

              case "code":
                return (
                  <div key={idx} className="border border-edge rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-edge/30 border-b border-edge">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-bad" />
                          <span className="w-3 h-3 rounded-full bg-warn" />
                          <span className="w-3 h-3 rounded-full bg-good" />
                        </div>
                        <span className="text-sm font-medium text-ink">{block.title}</span>
                      </div>
                      <Badge variant="info">{block.lang}</Badge>
                    </div>
                    <pre className="p-4 bg-codebg overflow-x-auto">
                      <code className="text-sm text-ink font-mono">{block.code}</code>
                    </pre>
                  </div>
                );

              case "topics":
                return (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.items.map((topic, topicIdx) => (
                      <div
                        key={topicIdx}
                        className="bg-card border border-edge rounded-xl p-5 hover:border-accent transition-colors"
                      >
                        <span className="text-2xl mb-3 block">{topic.icon}</span>
                        <h4 className="font-semibold text-ink mb-1">{topic.title}</h4>
                        <p className="text-sm text-accent mb-2">{topic.bn}</p>
                        <p className="text-sm text-ink3 leading-relaxed">{topic.desc}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {topic.tags.map((tag) => (
                            <Badge key={tag} variant="info" size="sm">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );

              case "interview":
                return (
                  <div key={idx} className="bg-gradient-to-br from-accent2/10 to-accent/5 border border-accent2/20 rounded-xl p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-accent2 mb-4">
                      <span className="text-xl">💬</span>
                      {block.title}
                    </h3>
                    <div className="space-y-3">
                      {block.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-bg/50 rounded-lg p-4">
                          <p className="font-medium text-ink mb-2">{item.q}</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-ink2 leading-relaxed">{item.a}</p>
                            </div>
                            <div className="border-t border-edge pt-3">
                              <p className="text-sm text-ink3 leading-relaxed italic">{item.bn}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case "callout":
                return (
                  <div key={idx} className={`border rounded-xl p-4 ${
                    block.variant === "tip" ? "bg-good/10 border-good/20" :
                    block.variant === "warn" ? "bg-warn/10 border-warn/20" :
                    "bg-accent/10 border-accent/20"
                  }`}>
                    <div className="flex gap-3">
                      <span className="text-xl flex-shrink-0">{block.emoji}</span>
                      <div>
                        {block.title && (
                          <h4 className="font-semibold text-ink mb-1">{block.title}</h4>
                        )}
                        <p className="text-sm text-ink2 leading-relaxed">{block.body}</p>
                        {block.bn && (
                          <p className="text-sm text-ink3 leading-relaxed mt-2 italic">{block.bn}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );

              case "table":
                return (
                  <div key={idx} className="border border-edge rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-edge/30 border-b border-edge">
                          {block.columns.map((col, colIdx) => (
                            <th key={colIdx} className="text-left px-4 py-3 text-xs font-semibold text-ink3 uppercase tracking-wider">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-edge">
                        {block.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-edge/20">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-4 py-3 text-sm text-ink2">
                                {cell.text}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

              case "timeline":
                return (
                  <div key={idx} className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent2 to-accent3 opacity-30" />
                    <div className="space-y-6">
                      {block.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="relative pl-12">
                          <div className="absolute left-3 top-6 w-4 h-4 rounded-full bg-accent border-4 border-bg shadow-sm" />
                          <div className="bg-card border border-edge rounded-xl p-5">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-ink">{item.title}</h4>
                                <p className="text-accent text-sm">{item.bn}</p>
                              </div>
                              <Badge variant="info" size="sm">{item.time}</Badge>
                            </div>
                            <p className="text-sm text-ink3 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case "checklist":
                return (
                  <div key={idx} className="space-y-2">
                    {block.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3 p-3 border-b border-edge last:border-b-0">
                        <span className="text-accent font-bold flex-shrink-0">→</span>
                        <div>
                          <p className="text-sm text-ink2">{item.text}</p>
                          {item.bn && (
                            <p className="text-xs text-ink3 mt-1">{item.bn}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );

              case "levelRow":
                return (
                  <div key={idx} className="flex gap-3 flex-wrap">
                    {block.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${
                          item.tone === "basic" ? "bg-good/10 border-good/30 text-good" :
                          item.tone === "mid" ? "bg-warn/10 border-warn/30 text-warn" :
                          "bg-bad/10 border-bad/30 text-bad"
                        }`}
                      >
                        {item.tone === "basic" ? "🟢" : item.tone === "mid" ? "🟡" : "🔴"}
                        {item.label}
                      </div>
                    ))}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
