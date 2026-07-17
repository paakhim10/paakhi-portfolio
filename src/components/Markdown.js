import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: ({ children, ...props }) => (
    <h1
      className="font-display text-2xl md:text-3xl font-semibold text-accent-soft mt-10 mb-5 tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-display text-xl md:text-2xl font-medium text-accent-soft mt-10 mb-4 tracking-tight"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="font-display text-lg font-medium text-ink mt-8 mb-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="font-display text-base font-medium text-ink mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-soft leading-relaxed mb-4 font-light" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-accent-soft underline decoration-accent/40 underline-offset-4 hover:text-accent transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent/50 pl-6 my-6 italic text-[17px] leading-loose text-soft [&_em]:text-soft"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-2 marker:text-accent/70" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-2 marker:text-accent/70" {...props} />,
  li: (props) => <li className="mb-1 font-light text-soft" {...props} />,
  hr: () => <hr className="border-rule my-10" />,
  img: (props) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      className="rounded-2xl mx-auto my-6 max-w-full border border-rule"
      loading="lazy"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full border-collapse border border-rule text-sm"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-panel text-ink" {...props} />,
  th: (props) => (
    <th
      className="border border-rule px-3 py-2 font-display font-medium text-left"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-rule px-3 py-2 text-soft font-light" {...props} />
  ),
  strong: (props) => <strong className="text-ink font-medium" {...props} />,
  em: (props) => <em className="text-dim italic" {...props} />,
  code: (props) => (
    <code
      className="bg-panel px-1.5 py-0.5 rounded font-mono text-[0.85em] text-accent-soft"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-panel border border-rule rounded-2xl p-4 overflow-x-auto my-6 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-soft"
      {...props}
    />
  ),
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
