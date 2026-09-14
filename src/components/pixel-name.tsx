const GLYPH_WIDTH = 5;
const GLYPH_HEIGHT = 7;
const GLYPH_GAP = 1;

/** 5x7 bitmap glyphs — solid strokes only, so nothing thins out when scaled down. */
const GLYPHS: Record<string, string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  C: [".###.", "#...#", "#....", "#....", "#....", "#...#", ".###."],
  M: ["#...#", "##.##", "#.#.#", "#...#", "#...#", "#...#", "#...#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
};

/**
 * Every lit cell becomes a subpath of a single `<path>`: one fill pass, so
 * adjacent cells merge without the antialiasing seams that separate rects leave.
 */
function pathOf(glyphs: string[][]): string {
  const segments: string[] = [];
  glyphs.forEach((glyph, index) => {
    const offset = index * (GLYPH_WIDTH + GLYPH_GAP);
    glyph.forEach((row, y) => {
      [...row].forEach((cell, x) => {
        if (cell === "#") segments.push(`M${offset + x} ${y}h1v1h-1Z`);
      });
    });
  });
  return segments.join("");
}

export function PixelName({
  text,
  gradientId = "pixel-name",
}: {
  text: string;
  gradientId?: string;
}) {
  const glyphs = [...text.toUpperCase()]
    .map((character) => GLYPHS[character])
    .filter((glyph): glyph is string[] => Boolean(glyph));

  if (glyphs.length === 0) return null;

  const width = glyphs.length * (GLYPH_WIDTH + GLYPH_GAP) - GLYPH_GAP;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${GLYPH_HEIGHT}`}
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-amber)" />
          <stop offset="52%" stopColor="var(--color-text)" />
          <stop offset="100%" stopColor="var(--color-cyan)" />
        </linearGradient>
      </defs>
      <path d={pathOf(glyphs)} fill={`url(#${gradientId})`} />
    </svg>
  );
}
