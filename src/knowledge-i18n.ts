// Translations for knowledge base content
// This allows full localization of all educational content

import type { Lang } from "./i18n";

type ContentDict = Record<string, { en: string; ru: string; zh: string }>;

export const knowledgeContent: ContentDict = {
  // Common UI
  "readMore": { en: "Read more", ru: "Читать далее", zh: "阅读更多" },
  "collapse": { en: "Collapse", ru: "Свернуть", zh: "折叠" },
  
  // Note: This is a starter - we'll need to add all content translations
  // For now, keeping content in English in the code files
  // TODO: Move all content strings here for full localization
};

export function tc(lang: Lang, key: string): string {
  const row = knowledgeContent[key];
  if (!row) return key;
  if (lang === "en" || lang === "ru" || lang === "zh") {
    return row[lang] || row.en;
  }
  return row.en;
}
