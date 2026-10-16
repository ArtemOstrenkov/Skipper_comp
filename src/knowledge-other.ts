import type { KnowledgeArticle } from "./knowledge-types";
import { articleBlocks } from "./locales";

export const WEATHER_ARTICLES: KnowledgeArticle[] = [
  {
    id: "weather-reading",
    category: "weather",
    titleKey: "weatherReadingTitle",
    descKey: "weatherReadingDesc",
    icon: "☁️",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("weather-reading", lang),
  },
  {
    id: "weather-sources",
    category: "weather",
    titleKey: "weatherSourcesTitle",
    descKey: "weatherSourcesDesc",
    icon: "📡",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("weather-sources", lang),
  },
];

export const NAV_BASICS_ARTICLES: KnowledgeArticle[] = [
  {
    id: "chart-reading",
    category: "nav-basics",
    titleKey: "chartReadingTitle",
    descKey: "chartReadingDesc",
    icon: "🗺️",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("chart-reading", lang),
  },
  {
    id: "dead-reckoning",
    category: "nav-basics",
    titleKey: "deadReckoningTitle",
    descKey: "deadReckoningDesc",
    icon: "📐",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("dead-reckoning", lang),
  },
];

export const TROUBLESHOOTING_ARTICLES: KnowledgeArticle[] = [
  {
    id: "engine-problems",
    category: "troubleshooting",
    titleKey: "engineProblemsTitle",
    descKey: "engineProblemsDesc",
    icon: "🔧",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("engine-problems", lang),
  },
  {
    id: "electrical-problems",
    category: "troubleshooting",
    titleKey: "electricalProblemsTitle",
    descKey: "electricalProblemsDesc",
    icon: "⚡",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("electrical-problems", lang),
  },
];
