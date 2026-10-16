import type { KnowledgeArticle } from "./knowledge-types";
import { articleBlocks } from "./locales";

export const SEAMANSHIP_ARTICLES: KnowledgeArticle[] = [
  {
    id: "essential-knots",
    category: "seamanship",
    titleKey: "knotsTitle",
    descKey: "knotsDesc",
    icon: "🪢",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("essential-knots", lang),
  },
  {
    id: "anchoring",
    category: "seamanship",
    titleKey: "anchoringTitle",
    descKey: "anchoringDesc",
    icon: "⚓",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("anchoring", lang),
  },
  {
    id: "docking",
    category: "seamanship",
    titleKey: "dockingTitle",
    descKey: "dockingDesc",
    icon: "🛥️",
    order: 3,
    content: [],
    getContent: (lang) => articleBlocks("docking", lang),
  },
];
