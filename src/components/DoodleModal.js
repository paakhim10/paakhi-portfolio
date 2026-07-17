import React, { useCallback, useEffect, useRef, useState } from "react";
import { getDoodle, saveDoodle, clearDoodle } from "../lib/doodle";

const SIZE = 280;

export default function DoodleModal({ open, onClose }) {
  const canvasRef = useRef(null);
  const strokesRef = useRef([]);
  const drawingRef = useRef(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, SIZE, SIZE);
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--c-accent")
      .trim()
      .split(/\s+/)
      .join(",");
    ctx.strokeStyle = `rgba(${accent},0.9)`;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokesRef.current) {
      if (stroke.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      for (let j = 1; j < stroke.length - 1; j++) {
        const mx = (stroke[j][0] + stroke[j + 1][0]) / 2;
        const my = (stroke[j][1] + stroke[j + 1][1]) / 2;
        ctx.quadraticCurveTo(stroke[j][0], stroke[j][1], mx, my);
      }
      const last = stroke[stroke.length - 1];
      ctx.lineTo(last[0], last[1]);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    strokesRef.current = [];
    setHasStrokes(false);
    setHasSaved(Boolean(getDoodle()));

    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, redraw]);

  if (!open) return null;

  const point = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    canvasRef.current.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    strokesRef.current.push([point(e)]);
  };

  const onPointerMove = (e) => {
    if (!drawingRef.current) return;
    const stroke = strokesRef.current[strokesRef.current.length - 1];
    const p = point(e);
    const last = stroke[stroke.length - 1];
    if (Math.hypot(p[0] - last[0], p[1] - last[1]) > 1.5) {
      stroke.push(p);
      redraw();
    }
  };

  const onPointerUp = () => {
    drawingRef.current = false;
    setHasStrokes(strokesRef.current.some((s) => s.length > 1));
  };

  const handleSave = () => {
    if (saveDoodle(strokesRef.current)) onClose();
  };

  const handleFlower = () => {
    clearDoodle();
    onClose();
  };

  const handleClear = () => {
    strokesRef.current = [];
    setHasStrokes(false);
    redraw();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-label="Draw your own bloom"
    >
      <div
        className="bg-page border border-rule rounded-2xl p-6 w-full max-w-[340px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-lg font-medium">
          Draw your own bloom<span className="text-accent">.</span>
        </h2>
        <p className="font-mono text-[11px] text-faint mt-1 mb-4 leading-relaxed">
          sketch something small — it will grow under your cursor and drift
          through the pages, in this browser only.
        </p>
        <canvas
          ref={canvasRef}
          style={{ width: SIZE, height: SIZE }}
          className="bg-panel/50 border border-rule rounded-xl cursor-crosshair touch-none w-full"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="font-mono text-[12px] text-faint hover:text-accent-soft transition-colors"
            >
              clear
            </button>
            {hasSaved && (
              <button
                onClick={handleFlower}
                className="font-mono text-[12px] text-faint hover:text-accent-soft transition-colors"
              >
                back to flower
              </button>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={!hasStrokes}
            className="px-4 py-1.5 text-sm font-display font-medium bg-accent text-page rounded-[10px] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Make it bloom
          </button>
        </div>
      </div>
    </div>
  );
}
