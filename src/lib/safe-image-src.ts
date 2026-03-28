/** Public path used when image URL is missing or invalid. */
export const DEFAULT_AVATAR_SRC = "/default-avatar.svg";

/**
 * Returns a safe `src` for profile images: same-origin paths, or http(s) URLs.
 * Malformed strings fall back to the default avatar so Next/Image does not throw.
 */
export function getSafeAvatarSrc(src: string | null | undefined): string {
  if (src == null) return DEFAULT_AVATAR_SRC;
  const t = src.trim();
  if (!t) return DEFAULT_AVATAR_SRC;
  if (t.startsWith("/")) return t;
  try {
    const u = new URL(t);
    if (u.protocol === "http:" || u.protocol === "https:") return t;
  } catch {
    /* invalid URL */
  }
  return DEFAULT_AVATAR_SRC;
}
