import contentIndex from "../content-index.json";

// Generated from content/*.md by scripts/build-content.js — sorted newest first.
export const articles = contentIndex;

export const TYPE_META = {
  research: { label: "Research", creative: false },
  essay: { label: "Essay", creative: false },
  story: { label: "Story", creative: true },
  poem: { label: "Poem", creative: true },
  note: { label: "Note", creative: false },
};

export function isCreative(article) {
  return TYPE_META[article.type]?.creative ?? false;
}

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null;
}
