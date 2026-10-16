import type { ContentBlock, KnowledgeArticle, KnowledgeCategoryMeta } from "./knowledge-types";
import type { Lang } from "./i18n";
import { t } from "./i18n";
import { icon } from "./icons";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderCategoryCard(cat: KnowledgeCategoryMeta & { count: number }, lang: Lang): string {
  return `
    <button type="button" class="knowledge-card glass" data-act="open-category" data-category="${cat.id}">
      <div class="knowledge-icon">${cat.icon}</div>
      <h3>${esc(t(lang, cat.titleKey))}</h3>
      <p>${esc(t(lang, cat.descKey))}</p>
      <span class="badge">${cat.count} ${esc(t(lang, "articles"))}</span>
    </button>
  `;
}

export function renderArticleCard(article: KnowledgeArticle, lang: Lang): string {
  return `
    <button type="button" class="knowledge-list-item" data-act="open-article" data-article="${article.id}">
      <span class="item-icon">${article.icon}</span>
      <div class="item-text">
        <h4>${esc(t(lang, article.titleKey))}</h4>
        <p>${esc(t(lang, article.descKey))}</p>
      </div>
    </button>
  `;
}

function renderContentBlock(block: ContentBlock, lang: Lang, level = 0): string {
  switch (block.type) {
    case "text":
      return `<p>${esc(block.content || "")}</p>`;

    case "heading":
      return `<h3 class="content-heading">${esc(block.content || "")}</h3>`;

    case "list":
      return `<ul class="content-list">${(block.items || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

    case "code":
      return `<pre class="content-code">${esc(block.content || "")}</pre>`;

    case "note":
      return `<div class="content-note">
        <div class="note-icon">${icon("info")}</div>
        <p>${esc(block.content || "")}</p>
      </div>`;

    case "tip":
      return `<div class="content-tip">
        <div class="tip-icon">💡</div>
        <p>${esc(block.content || "")}</p>
      </div>`;

    case "warning":
      return `<div class="content-warning">
        <div class="warning-icon">⚠️</div>
        <p>${esc(block.content || "")}</p>
      </div>`;

    case "accordion":
      return `
        <details class="content-accordion">
          <summary>${esc(block.title || "")}</summary>
          <div class="accordion-content">
            ${(block.children || []).map((child) => renderContentBlock(child, lang, level + 1)).join("")}
          </div>
        </details>
      `;

    case "table":
      if (!block.rows || block.rows.length === 0) return "";
      const keys = Object.keys(block.rows[0]);
      return `
        <table class="content-table">
          <thead>
            <tr>${keys.map((key) => `<th>${esc(key)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${block.rows
              .map(
                (row) =>
                  `<tr>${keys.map((key) => `<td>${esc(row[key] || "")}</td>`).join("")}</tr>`,
              )
              .join("")}
          </tbody>
        </table>
      `;

    case "illustration":
      if (block.src) {
        // Check if src is an image path or ASCII art
        const isImagePath = block.src.startsWith('/') || block.src.startsWith('http') || block.src.endsWith('.jpg') || block.src.endsWith('.png');
        
        if (isImagePath) {
          return `<figure class="content-illustration">
            <img src="${esc(block.src)}" alt="${esc(block.alt || block.caption || 'Illustration')}" class="illustration-image" />
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ""}
          </figure>`;
        } else {
          // ASCII art
          return `<figure class="content-illustration">
            <div class="illustration-box">${block.src}</div>
            ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ""}
          </figure>`;
        }
      }
      return "";

    default:
      return "";
  }
}

export function renderArticleContent(article: KnowledgeArticle, lang: Lang): string {
  // Use dynamic content if available, otherwise fallback to static content
  const contentBlocks = article.getContent ? article.getContent(lang) : article.content;
  
  return `
    <article class="knowledge-content" data-v="1.1.0">
      ${contentBlocks.map((block) => renderContentBlock(block, lang)).join("")}
    </article>
  `;
}
