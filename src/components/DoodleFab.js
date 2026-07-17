import React, { useState } from "react";
import { getDoodle } from "../lib/doodle";

const HINT_KEY = "doodle-hint-seen";

export default function DoodleFab({ onOpen }) {
  // Blooms are cursor-driven; on touch devices only the ambient lines render,
  // so a doodle would never appear — hide the button there.
  const [supported] = useState(() =>
    matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [showHint, setShowHint] = useState(
    () => !localStorage.getItem(HINT_KEY) && !getDoodle(),
  );

  const open = () => {
    localStorage.setItem(HINT_KEY, "1");
    setShowHint(false);
    onOpen();
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-7 z-40">
      {showHint && (
        <button
          onClick={open}
          className="absolute bottom-full right-0 mb-3 whitespace-nowrap bg-panel border border-rule rounded-xl px-3.5 py-2 font-mono text-[11px] text-soft shadow-xl hover:border-accent/50 transition-colors"
        >
          the flowers here are drawable — make them yours{" "}
          <span className="text-accent">{"↘︎"}</span>
        </button>
      )}
      <button
        onClick={open}
        title="draw your own bloom"
        className="group flex flex-col items-center gap-1.5"
      >
        <span className="doodle-float block">
          <span
            className={`doodle-blob w-[58px] h-[58px] flex items-center justify-center bg-panel border text-[21px] transition-all group-hover:scale-110 ${
              showHint
                ? "border-accent/60 text-accent-soft shadow-[0_0_20px_rgb(var(--c-accent)/0.45)]"
                : "border-accent/30 text-accent-soft/80 shadow-[0_0_14px_rgb(var(--c-accent)/0.2)] group-hover:border-accent/60 group-hover:text-accent-soft group-hover:shadow-[0_0_20px_rgb(var(--c-accent)/0.4)]"
            }`}
          >
            {"✎︎"}
          </span>
        </span>
        <span
          className={`font-mono text-[10.5px] transition-colors ${
            showHint
              ? "text-accent-soft"
              : "text-dim group-hover:text-accent-soft"
          }`}
        >
          draw a bloom
        </span>
      </button>
    </div>
  );
}
