const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Prefix public asset paths for GitHub Pages /basePath. */
export function withBase(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${base}${path}`;
}
