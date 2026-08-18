import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** True if `public/<name>` exists at build time. Only call from Astro frontmatter. */
export function publicFileExists(name: string): boolean {
  const url = new URL(`../../public/${name}`, import.meta.url);
  return existsSync(fileURLToPath(url));
}
