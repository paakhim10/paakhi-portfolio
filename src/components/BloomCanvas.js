import React, { useEffect, useRef } from "react";
import { getDoodle, DOODLE_EVENT } from "../lib/doodle";

// Faithful port of design-mockups/d-ambient.html ("bloom" mode):
// faint flowing lines masked behind the content column, ink flowers that
// grow on the line under a lingering cursor, fade when released, and small
// idle blooms the page dreams up on its own. A visitor doodle (see
// lib/doodle.js) replaces the flower shape when present. Colors come from
// the palette CSS variables.

const LINES = 16;
const GROW = 700;
const LIFE = 2600;
const RELEASE_FADE = 1800;

function readPalette() {
  const styles = getComputedStyle(document.documentElement);
  const rgb = (name) => styles.getPropertyValue(name).trim().split(/\s+/).join(",");
  return {
    accent: rgb("--c-accent"),
    gold: rgb("--c-gold"),
    soft: rgb("--c-accent-soft"),
    base: rgb("--c-faint"),
  };
}

export default function BloomCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // No cursor on touch devices — keep only the ambient lines there.
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let W, H;
    let pal = readPalette();
    let doodle = getDoodle();
    let raf;
    let lastT = 0;
    let lastIdleBloom = 0;
    let lastScrollSpawn = 0;
    let lastScrollY = window.scrollY;
    let anchor = null;
    const transient = [];
    const mouse = { x: -9999, y: -9999 };

    // 0 = accent (rose), 1 = gold (brass), 2 = accent-soft (blush)
    const colorOf = (f) => [pal.accent, pal.gold, pal.soft][f.colIdx] || pal.accent;
    const randColIdx = () => {
      const r = Math.random();
      return r < 0.5 ? 0 : r < 0.82 ? 1 : 2;
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function lineY(i, x, t) {
      const baseY = ((i + 0.5) / LINES) * H;
      return (
        baseY +
        12 * Math.sin(x * 0.0038 + t * 0.00045 + i * 1.7) +
        7 * Math.sin(x * 0.0092 - t * 0.0003 + i * 0.6)
      );
    }

    function drawLines(t) {
      ctx.lineWidth = 1;
      for (let i = 0; i < LINES; i++) {
        ctx.strokeStyle =
          i % 3 === 0 ? `rgba(${pal.gold},0.26)` : `rgba(${pal.base},0.22)`;
        ctx.beginPath();
        for (let x = -10; x <= W + 10; x += 9) {
          const y = lineY(i, x, t);
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    function nearestLine(x, y, t) {
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < LINES; i++) {
        const d = Math.abs(lineY(i, x, t) - y);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return { i: best, d: bestD };
    }

    function drawBloom(f, size, t, alpha) {
      if (size < 1 || alpha <= 0) return;
      const cy = lineY(f.line, f.x, t);
      const col = colorOf(f);
      ctx.save();
      ctx.translate(f.x, cy);
      ctx.shadowColor = `rgba(${col},${0.5 * alpha})`;
      ctx.shadowBlur = 10;

      if (doodle) {
        // the visitor's own shape blooms instead of the flower —
        // a gentle sway rather than a spin, so drawings stay readable
        const s = size * (0.92 + 0.08 * Math.sin(t * 0.0016 + f.rot * 3));
        ctx.rotate(Math.sin(t * 0.0004 + f.rot) * 0.12);
        ctx.strokeStyle = `rgba(${col},${0.65 * alpha})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (const stroke of doodle) {
          ctx.beginPath();
          ctx.moveTo(stroke[0][0] * s, stroke[0][1] * s);
          for (let j = 1; j < stroke.length - 1; j++) {
            const mx = ((stroke[j][0] + stroke[j + 1][0]) / 2) * s;
            const my = ((stroke[j][1] + stroke[j + 1][1]) / 2) * s;
            ctx.quadraticCurveTo(stroke[j][0] * s, stroke[j][1] * s, mx, my);
          }
          const last = stroke[stroke.length - 1];
          ctx.lineTo(last[0] * s, last[1] * s);
          ctx.stroke();
        }
        ctx.restore();
        return;
      }

      ctx.rotate(f.rot + t * 0.00012);
      ctx.lineWidth = 1.1;
      const layers = size > 26 ? 2 : 1;
      for (let l = 0; l < layers; l++) {
        const R = size * (l === 0 ? 1 : 0.55);
        ctx.strokeStyle = `rgba(${col},${(l === 0 ? 0.55 : 0.45) * alpha})`;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.045) {
          const r =
            R *
            Math.sin(f.petals * a + (l === 0 ? 0 : Math.PI / f.petals)) *
            (0.85 + 0.15 * Math.sin(t * 0.002 + a));
          const px = r * Math.cos(a);
          const py = r * Math.sin(a);
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(${col},${0.8 * alpha})`;
      ctx.arc(0, 0, Math.min(1.2 + size * 0.03, 3), 0, 6.283);
      ctx.fill();
      ctx.restore();
    }

    function makeBloom(x, line, size) {
      return {
        x,
        line,
        size,
        petals: 5 + ((Math.random() * 3) | 0),
        rot: Math.random() * 6.28,
        colIdx: randColIdx(),
      };
    }

    function releaseAnchor(t) {
      if (anchor) {
        transient.push({ ...anchor, t0: t, kind: "released" });
        anchor = null;
      }
    }

    function updateAnchor(t, dt) {
      if (mouse.x < -999) return releaseAnchor(t);
      const near = nearestLine(mouse.x, mouse.y, t);
      if (near.d > 90) return releaseAnchor(t);
      if (anchor && anchor.line === near.i && Math.abs(mouse.x - anchor.x) < 70) {
        anchor.size = Math.min(anchor.size + (dt * 30) / (1 + anchor.size / 22), 115);
      } else {
        releaseAnchor(t);
        anchor = makeBloom(mouse.x, near.i, 5);
      }
    }

    function drawTransients(t) {
      for (let i = transient.length - 1; i >= 0; i--) {
        const f = transient[i];
        const age = t - f.t0;
        if (f.kind === "released") {
          const fade = 1 - age / RELEASE_FADE;
          if (fade <= 0) {
            transient.splice(i, 1);
            continue;
          }
          drawBloom(f, f.size, t, fade);
        } else {
          if (age > LIFE) {
            transient.splice(i, 1);
            continue;
          }
          const ease = 1 - Math.pow(1 - Math.min(age / GROW, 1), 3);
          const fade = age < LIFE - 900 ? 1 : (LIFE - age) / 900;
          drawBloom(f, f.size * ease, t, fade);
        }
      }
      if (transient.length > 30) transient.splice(0, transient.length - 30);
    }

    function frame(t) {
      // The palette variables may not be readable on the very first frames
      // (slow CSS apply on mobile) — retry instead of stroking in black.
      if (!pal.accent || !pal.base) {
        pal = readPalette();
        raf = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      ctx.clearRect(0, 0, W, H);
      drawLines(t);
      if (!finePointer) {
        raf = requestAnimationFrame(frame);
        return;
      }
      updateAnchor(t, dt);
      if (t - lastIdleBloom > 2600 + Math.random() * 2000) {
        transient.push({
          ...makeBloom(Math.random() * W, (Math.random() * LINES) | 0, 8 + Math.random() * 8),
          t0: t,
          kind: "idle",
        });
        lastIdleBloom = t;
      }
      drawTransients(t);
      if (anchor) {
        drawBloom(anchor, anchor.size, t, 1);
      }
      raf = requestAnimationFrame(frame);
    }

    // scrolling sprinkles small blooms in the margins
    function onScroll() {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      if (dy > 60 && now - lastScrollSpawn > 350) {
        const left = Math.random() < 0.5;
        const band = Math.max(W * 0.16, 60);
        const x = left ? 10 + Math.random() * band : W - 10 - Math.random() * band;
        transient.push({
          ...makeBloom(x, (Math.random() * LINES) | 0, 7 + Math.random() * 9),
          t0: now,
          kind: "idle",
        });
        lastScrollSpawn = now;
        lastScrollY = window.scrollY;
      }
    }

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onOut = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onDoodleChange = () => {
      doodle = getDoodle();
    };

    resize();
    window.addEventListener("resize", resize);
    if (finePointer) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onOut);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener(DOODLE_EVENT, onDoodleChange);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(DOODLE_EVENT, onDoodleChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />;
}
