import type { KnowledgeArticle } from "./knowledge-types";
import { articleBlocks } from "./locales";

export const MEDICAL_ARTICLES: KnowledgeArticle[] = [
  {
    id: "seasickness",
    category: "medical",
    titleKey: "seasicknessTitle",
    descKey: "seasicknessDesc",
    icon: "🤢",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("seasickness", lang),
  },
  {
    id: "first-aid",
    category: "medical",
    titleKey: "firstAidTitle",
    descKey: "firstAidDesc",
    icon: "🩹",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("first-aid", lang),
  },
];
