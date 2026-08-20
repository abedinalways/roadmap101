export type Block =
  | { type: "bilingual"; title: string; tag: string; bn: string; en: string }
  | { type: "heading"; title: string; bn?: string }
  | { type: "paragraph"; body: string; bn?: string }
  | { type: "code"; title: string; lang: string; code: string }
  | {
      type: "callout";
      variant: "tip" | "warn" | "info" | "star";
      emoji: string;
      title?: string;
      body: string;
      bn?: string;
    }
  | { type: "interview"; title: string; items: InterviewItem[] }
  | { type: "topics"; items: TopicItem[] }
  | { type: "table"; columns: string[]; rows: TableCell[][] }
  | { type: "timeline"; items: TimelineItem[] }
  | { type: "checklist"; items: ChecklistItem[] }
  | { type: "levelRow"; items: LevelPill[] };

export interface InterviewItem {
  q: string;
  a: string;
  bn: string;
}

export interface TopicItem {
  id?: string;
  icon: string;
  title: string;
  bn: string;
  desc: string;
  tags: string[];
}

export interface TableCell {
  text: string;
  level?: "easy" | "med" | "hard";
}

export interface TimelineItem {
  phase: string;
  title: string;
  bn: string;
  desc: string;
  time: string;
}

export interface ChecklistItem {
  text: string;
  bn?: string;
}

export interface LevelPill {
  tone: "basic" | "mid" | "senior";
  label: string;
}

export interface Section {
  id: string;
  index: string;
  icon: string;
  title: string;
  titleBn: string;
  gradient: string;
  badge?: "basic" | "med" | "senior";
  blocks: Block[];
}

export interface NavItem {
  id: string;
  label: string;
  labelBn: string;
  icon: string;
  badge?: string;
  badgeTone?: "easy" | "med" | "senior" | "hot";
}

export interface NavGroup {
  label: string;
  labelBn: string;
  items: NavItem[];
}

export interface HeroStat {
  num: string;
  label: string;
}

export interface HeroMeta {
  tag: string;
  titleA: string;
  titleB: string;
  titleBn: string;
  desc: string;
  descBn?: string;
  stats: HeroStat[];
}

export interface RoadmapData {
  meta: {
    hero: HeroMeta;
    totalTopics: number;
  };
  nav: NavGroup[];
  sections: Section[];
}
