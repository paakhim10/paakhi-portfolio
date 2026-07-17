import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { articles, TYPE_META } from "../lib/content";
import WritingRow from "../components/WritingRow";

const FILTERS = [
  { key: "all", label: "All" },
  ...Object.entries(TYPE_META)
    .filter(([key]) => articles.some((a) => a.type === key))
    .map(([key, meta]) => ({ key, label: meta.label })),
];

export default function Writing() {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "Writing — Paakhi Maheshwari";
    return () => {
      document.title = "Paakhi Maheshwari";
    };
  }, []);

  const visible =
    filter === "all" ? articles : articles.filter((a) => a.type === filter);

  return (
    <div className="relative z-10 max-w-[760px] mx-auto px-6 pt-12 min-h-screen">
      <Link
        to="/"
        className="text-dim hover:text-accent-soft inline-flex items-center gap-2 transition-colors text-sm"
      >
        ← Back home
      </Link>

      <div className="mt-8 mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Writing<span className="text-accent">.</span>
        </h1>
        <p className="text-dim font-light mt-2">
          Technical research, storytelling, and everything in between —{" "}
          <a
            href="https://paakhim10.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-soft hover:text-accent transition-colors"
          >
            {"also on Substack ↗︎"}
          </a>
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map((f) => {
          const count =
            f.key === "all"
              ? articles.length
              : articles.filter((a) => a.type === f.key).length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3.5 py-1.5 text-[13px] font-display rounded-full border transition-colors ${
                active
                  ? "border-accent bg-accent/10 text-accent-soft"
                  : "border-rule text-dim hover:border-faint"
              }`}
            >
              {f.label}
              <span className="ml-1.5 font-mono text-[11px] opacity-60">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-rule">
        {visible.map((article) => (
          <WritingRow key={article.slug} article={article} showExcerpt />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-faint font-light mt-6">Nothing here yet.</p>
      )}
    </div>
  );
}
