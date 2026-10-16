import type { ContentBlock } from "./knowledge-types";
import raw from "./locales.json?raw";

/** One catalog: UI strings, month names, and knowledge-article bodies. */
type Phrase = {
  en: string;
  ru?: string;
  zh?: string;
  de?: string;
  es?: string;
  fr?: string;
  it?: string;
  nl?: string;
  sv?: string;
  no?: string;
  hr?: string;
  cs?: string;
};

type LocaleFile = {
  messages: Record<string, Phrase>;
  months: { en: string[]; ru: string[]; zh: string[] };
  articles: Record<string, Record<string, ContentBlock[]>>;
};

const data = JSON.parse(raw) as LocaleFile;

export const messages: Record<string, Phrase> = data.messages;
export const months = data.months;

export function articleBlocks(id: string, lang: string): ContentBlock[] {
  const entry = data.articles[id];
  if (!entry) return [];
  return entry[lang] ?? entry.en ?? [];
}
