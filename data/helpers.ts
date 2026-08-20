import type {
  Block,
  ChecklistItem,
  InterviewItem,
  LevelPill,
  TableCell,
  TimelineItem,
  TopicItem,
} from "@/types";

export const bilingual = (title: string, tag: string, bn: string, en: string): Block => ({
  type: "bilingual",
  title,
  tag,
  bn,
  en,
});

export const heading = (title: string, bn?: string): Block => ({
  type: "heading",
  title,
  bn,
});

export const para = (body: string, bn?: string): Block => ({
  type: "paragraph",
  body,
  bn,
});

export const code = (title: string, lang: string, code: string): Block => ({
  type: "code",
  title,
  lang,
  code,
});

export const callout = (
  variant: "tip" | "warn" | "info" | "star",
  emoji: string,
  body: string,
  title?: string,
  bn?: string
): Block => ({ type: "callout", variant, emoji, title, body, bn });

export const interview = (title: string, items: InterviewItem[]): Block => ({
  type: "interview",
  title,
  items,
});

export const topics = (items: TopicItem[]): Block => ({ type: "topics", items });

export const table = (columns: string[], rows: TableCell[][]): Block => ({
  type: "table",
  columns,
  rows,
});

export const timeline = (items: TimelineItem[]): Block => ({ type: "timeline", items });

export const checklist = (items: ChecklistItem[]): Block => ({ type: "checklist", items });

export const levelRow = (items: LevelPill[]): Block => ({ type: "levelRow", items });
