import type { KnowledgeArticle } from "./knowledge-types";
import { articleBlocks } from "./locales";

export const VHF_ARTICLES: KnowledgeArticle[] = [
  {
    id: "vhf-channels",
    category: "vhf",
    titleKey: "vhfChannelsTitle",
    descKey: "vhfChannelsDesc",
    icon: "📻",
    order: 1,
    content: [],
    getContent: (lang) => articleBlocks("vhf-channels", lang),
  },
  {
    id: "vhf-dsc",
    category: "vhf",
    titleKey: "vhfDscTitle",
    descKey: "vhfDscDesc",
    icon: "🔴",
    order: 2,
    content: [],
    getContent: (lang) => articleBlocks("vhf-dsc", lang),
  },
  {
    id: "vhf-etiquette",
    category: "vhf",
    titleKey: "vhfEtiquetteTitle",
    descKey: "vhfEtiquetteDesc",
    icon: "🎙️",
    order: 3,
    content: [],
    getContent: (lang) => articleBlocks("vhf-etiquette", lang),
  },
  {
    id: "vhf-phonetic",
    category: "vhf",
    titleKey: "vhfManual",
    descKey: "vhfManualDesc",
    icon: "🔤",
    order: 4,
    content: [],
    getContent: (lang) => articleBlocks("vhf-phonetic", lang),
  },
];
