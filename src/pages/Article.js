import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { articles, getArticle } from "../lib/content";
import Markdown from "../components/Markdown";

export default function Article() {
  const { slug } = useParams();
  const article = getArticle(slug);

  useEffect(() => {
    document.title = article
      ? `${article.title} — Paakhi Maheshwari`
      : "Paakhi Maheshwari";
    return () => {
      document.title = "Paakhi Maheshwari";
    };
  }, [article]);

  if (!article) {
    return (
      <div className="relative z-10 pt-24 min-h-screen px-6 text-center">
        <h1 className="font-display text-3xl font-semibold mb-4">Not found</h1>
        <p className="text-dim mb-8 font-light">
          This piece doesn't exist — or hasn't been written yet.
        </p>
        <Link
          to="/writing"
          className="text-accent-soft hover:text-accent transition-colors"
        >
          ← All writing
        </Link>
      </div>
    );
  }

  const index = articles.findIndex((a) => a.slug === slug);
  const newer = index > 0 ? articles[index - 1] : null;
  const older = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <div className="relative z-10 max-w-[760px] mx-auto px-6 pt-12 min-h-screen">
      <Link
        to="/writing"
        className="text-dim hover:text-accent-soft inline-flex items-center gap-2 transition-colors text-sm"
      >
        ← All writing
      </Link>

      <header className="mt-8 mb-10 pb-8 border-b border-rule">
        <p className="font-mono text-xs text-gold mb-3">
          <span className="lowercase">{article.type}</span>
          <span className="text-faint">
            {" "}
            · {article.dateDisplay} · {article.readingTime} min read
          </span>
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
          {article.title}
        </h1>
        {article.tags.length > 0 && (
          <p className="font-mono text-[11.5px] text-faint mt-4">
            {article.tags.map((t) => t.toLowerCase()).join(" · ")}
          </p>
        )}
      </header>

      <article>
        <Markdown>{article.body}</Markdown>
      </article>

      <nav className="mt-16 pt-8 border-t border-rule grid md:grid-cols-2 gap-3.5">
        {older ? (
          <Link
            to={`/writing/${older.slug}`}
            className="border border-rule rounded-2xl p-4 hover:border-accent/50 hover:bg-panel transition-all group"
          >
            <span className="font-mono text-[11px] text-faint">← older</span>
            <p className="font-display text-[15px] text-soft group-hover:text-accent-soft mt-1 transition-colors">
              {older.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {newer && (
          <Link
            to={`/writing/${newer.slug}`}
            className="border border-rule rounded-2xl p-4 hover:border-accent/50 hover:bg-panel transition-all group text-right"
          >
            <span className="font-mono text-[11px] text-faint">newer →</span>
            <p className="font-display text-[15px] text-soft group-hover:text-accent-soft mt-1 transition-colors">
              {newer.title}
            </p>
          </Link>
        )}
      </nav>
    </div>
  );
}
