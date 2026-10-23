import type { KnowledgeArticle } from "./knowledge-types";
import { articleBlocks } from "./locales";

export const NAVIGATION_ARTICLES: KnowledgeArticle[] = [
  {
    id: "nav-lights",
    category: "navigation",
    titleKey: "navLightsTitle",
    descKey: "navLightsDesc",
    icon: "🔦",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("nav-lights", lang),
  },
  {
    id: "colregs",
    category: "navigation",
    titleKey: "colregsTitle",
    descKey: "colregsDesc",
    icon: "⚖️",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("colregs", lang),
  },
  {
    id: "buoys-marks",
    category: "navigation",
    titleKey: "buoysTitle",
    descKey: "buoysDesc",
    icon: "🟢",
    order: 3,
    content: [],
    getContent: (lang) => articleBlocks("buoys-marks", lang),
  },
  {
    id: "emergencies",
    category: "navigation",
    titleKey: "emergenciesTitle",
    descKey: "emergenciesDesc",
    icon: "🆘",
    order: 4,
    content: [],
    getContent: (lang) => articleBlocks("emergencies", lang),
  },
];
