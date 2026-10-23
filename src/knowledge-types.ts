import type { Lang } from "./i18n";

export type KnowledgeCategory =
  | "navigation"
  | "seamanship"
  | "vhf"
  | "medical"
  | "checklists"
  | "weather"
  | "nav-basics"
  | "troubleshooting";

export interface ContentBlock {
  type: "text" | "heading" | "list" | "table" | "code" | "note" | "warning" | "tip" | "accordion" | "illustration";
  content?: string;
  items?: string[];
  rows?: Array<{ [key: string]: string }>;
  title?: string;
  children?: ContentBlock[];
  src?: string;
  alt?: string;
  caption?: string;
}

export interface KnowledgeArticle {
  id: string;
  category: KnowledgeCategory;
  titleKey: string;
  descKey: string;
  icon: string;
  order: number;
  content: ContentBlock[];
  getContent?: (lang: Lang) => ContentBlock[]; // Dynamic multilingual content
  quiz?: Quiz;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  questionKey: string;
  options: string[];
  correctAnswer: number;
  explanationKey: string;
}

export interface KnowledgeCategoryMeta {
  id: KnowledgeCategory;
  titleKey: string;
  descKey: string;
  icon: string;
  order: number;
}
