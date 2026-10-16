import type { KnowledgeCategoryMeta } from "./knowledge-types";

export const KNOWLEDGE_CATEGORIES: KnowledgeCategoryMeta[] = [
  {
    id: "navigation",
    titleKey: "catNavigation",
    descKey: "catNavigationDesc",
    icon: "🚦",
    order: 1,
  },
  {
    id: "seamanship",
    titleKey: "catSeamanship",
    descKey: "catSeamanshipDesc",
    icon: "⚓",
    order: 2,
  },
  {
    id: "vhf",
    titleKey: "catVhf",
    descKey: "catVhfDesc",
    icon: "📻",
    order: 3,
  },
  {
    id: "medical",
    titleKey: "catMedical",
    descKey: "catMedicalDesc",
    icon: "💊",
    order: 4,
  },
  {
    id: "checklists",
    titleKey: "catChecklists",
    descKey: "catChecklistsDesc",
    icon: "✅",
    order: 5,
  },
  {
    id: "weather",
    titleKey: "catWeather",
    descKey: "catWeatherDesc",
    icon: "🌤️",
    order: 6,
  },
  {
    id: "nav-basics",
    titleKey: "catNavBasics",
    descKey: "catNavBasicsDesc",
    icon: "🧭",
    order: 7,
  },
  {
    id: "troubleshooting",
    titleKey: "catTroubleshooting",
    descKey: "catTroubleshootingDesc",
    icon: "⚠️",
    order: 8,
  },
];
