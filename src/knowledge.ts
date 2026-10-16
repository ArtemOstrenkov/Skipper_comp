import type { KnowledgeArticle, KnowledgeCategoryMeta } from "./knowledge-types";
import { KNOWLEDGE_CATEGORIES } from "./knowledge-categories";
import { VHF_ARTICLES } from "./knowledge-vhf";
import { CHECKLIST_ARTICLES } from "./knowledge-checklists";
import { NAVIGATION_ARTICLES } from "./knowledge-navigation";
import { SEAMANSHIP_ARTICLES } from "./knowledge-seamanship";
import { MEDICAL_ARTICLES } from "./knowledge-medical";
import { WEATHER_ARTICLES, NAV_BASICS_ARTICLES, TROUBLESHOOTING_ARTICLES } from "./knowledge-other";

export const ALL_ARTICLES: KnowledgeArticle[] = [
  ...NAVIGATION_ARTICLES,
  ...SEAMANSHIP_ARTICLES,
  ...VHF_ARTICLES,
  ...MEDICAL_ARTICLES,
  ...CHECKLIST_ARTICLES,
  ...WEATHER_ARTICLES,
  ...NAV_BASICS_ARTICLES,
  ...TROUBLESHOOTING_ARTICLES,
];

export function getCategoriesWithCounts(): Array<KnowledgeCategoryMeta & { count: number }> {
  return KNOWLEDGE_CATEGORIES.map((cat) => ({
    ...cat,
    count: ALL_ARTICLES.filter((art) => art.category === cat.id).length,
  })).sort((a, b) => a.order - b.order);
}

export function getArticlesByCategory(categoryId: string): KnowledgeArticle[] {
  return ALL_ARTICLES.filter((art) => art.category === categoryId).sort((a, b) => a.order - b.order);
}

export function getArticleById(id: string): KnowledgeArticle | undefined {
  return ALL_ARTICLES.find((art) => art.id === id);
}

export function searchArticles(query: string): KnowledgeArticle[] {
  const q = query.toLowerCase();
  return ALL_ARTICLES.filter(
    (art) =>
      art.titleKey.toLowerCase().includes(q) ||
      art.descKey.toLowerCase().includes(q) ||
      art.id.toLowerCase().includes(q),
  );
}
