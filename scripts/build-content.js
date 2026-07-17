#!/usr/bin/env node
/**
 * Builds src/content-index.json from the markdown files in content/.
 *
 * Each content/*.md file starts with a frontmatter block:
 *
 *   ---
 *   title: My Article
 *   excerpt: One-line teaser shown on cards.
 *   date: 2026-07-17
 *   type: essay          (research | essay | story | poem | note)
 *   tags: [AI, Philosophy]
 *   draft: true          (optional — excluded from the site)
 *   ---
 *
 * Runs automatically before `npm start` and `npm run build`.
 * Run manually with `npm run content`.
 */

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUT_FILE = path.join(__dirname, "..", "src", "content-index.json");

const VALID_TYPES = ["research", "essay", "story", "poem", "note"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw.trim() };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body: raw.slice(match[0].length).trim() };
}

function displayDate(iso) {
  const [year, month] = iso.split("-").map(Number);
  if (!year || !month || month < 1 || month > 12) return iso;
  return `${MONTHS[month - 1]} ${year}`;
}

function readingTime(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`No content directory found at ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const errors = [];
  const articles = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);

    if (meta.draft === "true") continue;

    if (!meta.title) errors.push(`${file}: missing "title" in frontmatter`);
    if (!/^\d{4}-\d{2}(-\d{2})?$/.test(meta.date || "")) {
      errors.push(`${file}: "date" must be YYYY-MM-DD (got "${meta.date}")`);
    }
    const type = meta.type || "essay";
    if (!VALID_TYPES.includes(type)) {
      errors.push(`${file}: unknown type "${type}" (use ${VALID_TYPES.join(", ")})`);
    }

    articles.push({
      slug,
      title: meta.title || slug,
      excerpt: meta.excerpt || "",
      date: meta.date || "1970-01",
      dateDisplay: displayDate(meta.date || ""),
      type,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      readingTime: readingTime(body),
      body,
    });
  }

  if (errors.length) {
    console.error("Content errors:\n  - " + errors.join("\n  - "));
    process.exit(1);
  }

  articles.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUT_FILE, JSON.stringify(articles, null, 2) + "\n");
  console.log(`✓ ${articles.length} articles → src/content-index.json`);
}

build();
