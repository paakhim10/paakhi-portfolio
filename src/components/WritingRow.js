import React from "react";
import { Link } from "react-router-dom";

export default function WritingRow({ article, showExcerpt = false }) {
  return (
    <Link
      to={`/writing/${article.slug}`}
      className="grid grid-cols-[70px_1fr] gap-4 items-baseline px-3 py-3.5 border-b border-b-rule border-l-2 border-l-transparent hover:bg-panel hover:border-l-accent transition-all group"
    >
      <span className="font-mono text-[11.5px] text-gold lowercase pt-0.5">
        {article.type}
      </span>
      <span>
        <span className="text-[15.5px] group-hover:text-accent-soft transition-colors">
          {article.title}
        </span>
        <span className="block font-mono text-[11.5px] text-faint mt-0.5">
          {article.dateDisplay} · {article.readingTime} min
        </span>
        {showExcerpt && article.excerpt && (
          <span className="block text-sm text-dim font-light mt-1.5">
            {article.excerpt}
          </span>
        )}
      </span>
    </Link>
  );
}
