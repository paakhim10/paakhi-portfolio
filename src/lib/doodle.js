// Visitor-drawn bloom shape, persisted in localStorage. Strokes are stored
// normalized to the unit circle (center 0,0 / radius 1) so BloomCanvas can
// scale them like it scales the default flower.

const KEY = "bloom-doodle";
export const DOODLE_EVENT = "bloom-shape-changed";

export function getDoodle() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const strokes = JSON.parse(raw);
    return Array.isArray(strokes) && strokes.length ? strokes : null;
  } catch {
    return null;
  }
}

export function saveDoodle(rawStrokes) {
  const strokes = normalize(rawStrokes);
  if (!strokes) return false;
  localStorage.setItem(KEY, JSON.stringify(strokes));
  window.dispatchEvent(new CustomEvent(DOODLE_EVENT));
  return true;
}

export function clearDoodle() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(DOODLE_EVENT));
}

function normalize(rawStrokes) {
  const pts = rawStrokes.flat();
  if (pts.length < 2) return null;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const [x, y] of pts) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  let r = 0;
  for (const [x, y] of pts) {
    r = Math.max(r, Math.hypot(x - cx, y - cy));
  }
  if (r < 4) return null; // a doodle, not a dot
  return rawStrokes
    .filter((s) => s.length > 1)
    .map((s) =>
      s.map(([x, y]) => [
        Math.round(((x - cx) / r) * 1000) / 1000,
        Math.round(((y - cy) / r) * 1000) / 1000,
      ]),
    );
}
