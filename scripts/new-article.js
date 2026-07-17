#!/usr/bin/env node
/**
 * Scaffolds a new article: npm run new -- "My Article Title"
 * Creates content/my-article-title.md with today's date, ready to write.
 */

const fs = require("fs");
const path = require("path");

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- "My Article Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[''"".,!?:;()]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const file = path.join(__dirname, "..", "content", `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`content/${slug}.md already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

fs.writeFileSync(
  file,
  `---
title: ${title}
excerpt: One-line teaser shown on cards.
date: ${today}
type: essay
tags: []
draft: true
---

Write here. Delete the draft line when you're ready to publish.
`,
);

console.log(`✓ content/${slug}.md created (draft)`);
console.log("  Edit it, remove the draft line, then npm start / deploy.");
