import type { KnowledgeArticle } from "./knowledge-types";
import { articleBlocks } from "./locales";

export const CHECKLIST_ARTICLES: KnowledgeArticle[] = [
  {
    id: "pre-charter",
    category: "checklists",
    titleKey: "preCharterTitle",
    descKey: "preCharterDesc",
    icon: "📋",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("pre-charter", lang),
  },
  {
    id: "before-departure",
    category: "checklists",
    titleKey: "beforeDepartureTitle",
    descKey: "beforeDepartureDesc",
    icon: "⛵",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("before-departure", lang),
  },
  {
    id: "daily-checks",
    category: "checklists",
    titleKey: "dailyChecksTitle",
    descKey: "dailyChecksDesc",
    icon: "🌅",
    order: 3,
    content: [],
    getContent: (lang) => articleBlocks("daily-checks", lang),
  },
  {
    id: "emergency-bag",
    category: "checklists",
    titleKey: "emergencyBagTitle",
    descKey: "emergencyBagDesc",
    icon: "🆘",
    order: 4,
    content: [],
    getContent: (lang) => articleBlocks("emergency-bag", lang),
  },
];
