import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves a repo named `website` at https://scalar-app.github.io/website/
// and a repo named `scalar-app.github.io` at the org root. The workflow sets
// PUBLIC_SITE_BASE accordingly. Locally it defaults to '/'.
const base = process.env.PUBLIC_SITE_BASE ?? '/';

export default defineConfig({
  site: 'https://scalar-app.github.io',
  base,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
