import { messages, months } from "./locales";

export const EXTRA_LANGS = ["de", "es", "fr", "it", "nl", "sv", "no", "hr", "cs"] as const;
export type ExtraLang = (typeof EXTRA_LANGS)[number];
export type CoreLang = "en" | "ru" | "zh";
export type Lang = CoreLang | ExtraLang;

export const LANGS: Lang[] = ["en", "ru", "zh", ...EXTRA_LANGS];
export const PRIMARY_LANGS: Lang[] = ["en", "ru", "zh"];

export const LANG_META: Record<Lang, { code: string; name: string }> = {
  en: { code: "EN", name: "English" },
  ru: { code: "RU", name: "Русский" },
  zh: { code: "中", name: "中文" },
  de: { code: "DE", name: "Deutsch" },
  es: { code: "ES", name: "Español" },
  fr: { code: "FR", name: "Français" },
  it: { code: "IT", name: "Italiano" },
  nl: { code: "NL", name: "Nederlands" },
  sv: { code: "SV", name: "Svenska" },
  no: { code: "NO", name: "Norsk" },
  hr: { code: "HR", name: "Hrvatski" },
  cs: { code: "CZ", name: "Čeština" },
};

const LANG_KEY = "vhf-panic-lang";
const COMIC_LANGS: Lang[] = ["en", "ru", "zh"];

const LOCALE: Record<Lang, string> = {
  en: "en",
  ru: "ru",
  zh: "zh-CN",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  nl: "nl",
  sv: "sv",
  no: "nb",
  hr: "hr",
  cs: "cs",
};

export function isLang(value: string | undefined | null): value is Lang {
  return Boolean(value && (LANGS as string[]).includes(value));
}

export function htmlLang(lang: Lang): string {
  return LOCALE[lang];
}

export function comicSrc(lang: Lang): string {
  const file = COMIC_LANGS.includes(lang) ? lang : "en";
  return `/comic/${file}.jpg`;
}

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* ignore */
  }
  const nav = navigator.language.toLowerCase();
  const prefix = nav.slice(0, 2);
  if (prefix === "nb" || prefix === "nn") return "no";
  if (prefix === "cz") return "cs";
  if (isLang(prefix)) return prefix;
  return "en";
}

export function persistLang(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function t(lang: Lang, key: string, vars?: Record<string, string>): string {
  const row = messages[key];
  let out = row?.[lang] || row?.en || key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.replaceAll(`{${name}}`, value);
    }
  }
  return out;
}

export function monthNames(lang: Lang): string[] {
  if (lang === "en" || lang === "ru" || lang === "zh") return months[lang];
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(htmlLang(lang), { month: "long" }).format(new Date(2020, i, 1)),
  );
}

export const MONTHS = new Proxy({} as Record<Lang, string[]>, {
  get(_target, prop: string) {
    return isLang(prop) ? monthNames(prop) : undefined;
  },
});

export const MONTHS_RADIO = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
