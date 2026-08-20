import type { RoadmapData } from "@/types";
import { NAV, HERO } from "./meta";
import { overviewSection } from "./sections/overview";
import { htmlCssSection } from "./sections/htmlcss";
import { javascriptSection } from "./sections/javascript";
import { typescriptSection } from "./sections/typescript";
import { reactSection } from "./sections/react";
import { nextjsSection } from "./sections/nextjs";
import { reduxSection } from "./sections/redux";
import { stateSection } from "./sections/state";
import { performanceSection } from "./sections/performance";
import { websocketSection } from "./sections/websocket";
import { gsapSection } from "./sections/gsap";
import { testingSection } from "./sections/testing";
import { systemDesignSection } from "./sections/system-design";
import { interviewSection } from "./sections/interview";

export const SECTIONS = [
  overviewSection,
  htmlCssSection,
  javascriptSection,
  typescriptSection,
  reactSection,
  nextjsSection,
  reduxSection,
  stateSection,
  performanceSection,
  websocketSection,
  gsapSection,
  testingSection,
  systemDesignSection,
  interviewSection,
];

const countTopics = (): number =>
  SECTIONS.reduce((total, section) => {
    return (
      total +
      section.blocks.reduce((blockTotal, block) => {
        if (block.type === "topics") return blockTotal + block.items.length;
        if (block.type === "checklist") return blockTotal + block.items.length;
        if (block.type === "interview") return blockTotal + block.items.length;
        return blockTotal;
      }, 0)
    );
  }, 0);

export const ROADMAP: RoadmapData = {
  meta: {
    hero: HERO,
    totalTopics: countTopics(),
  },
  nav: NAV,
  sections: SECTIONS,
};

export type { NavGroup, NavItem, Section, Block } from "@/types";
