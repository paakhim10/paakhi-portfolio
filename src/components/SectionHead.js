import React from "react";

export default function SectionHead({ n, title }) {
  return (
    <div className="flex items-center gap-3.5 mb-6">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h2 className="font-display text-xl font-medium tracking-tight">{title}</h2>
      <span className="flex-1 h-px bg-gradient-to-r from-rule to-transparent" />
    </div>
  );
}
