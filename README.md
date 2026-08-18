# Scalar website

The public Scalar site: what Scalar is, how it works, integrations and their status, student mode, open source, download and community. Separate from the authenticated web app in [scalar-app/web](https://github.com/scalar-app/web).

Astro 5, TypeScript, Tailwind CSS 4. Static output, no client side framework, deployed to GitHub Pages by GitHub Actions.

## Run it

Requires Node 24 (`.nvmrc`) and pnpm 11.

```bash
pnpm install
pnpm dev
```

Scripts: `pnpm build`, `pnpm preview`, `pnpm lint`, `pnpm typecheck` (`astro check`), `pnpm test` (Vitest, covers the base path link helper), `pnpm format`.

## Where it deploys

`.github/workflows/pages.yml` builds on every push to `main` and deploys with `actions/deploy-pages`. GitHub Pages serves a repository named `website` at `https://scalar-app.github.io/website/`; a repository named `scalar-app.github.io` is served at the origin root. The workflow sets `PUBLIC_SITE_BASE` accordingly and `astro.config.ts` reads it into `base`. All internal links go through `withBase()` in `src/lib/links.ts`, so both layouts work from the same source. A custom domain later needs a `CNAME` file and `site` updated, nothing structural.

Enable Pages once in the repository settings with source "GitHub Actions".

## Structure

```
src/layouts/Base.astro       document shell: meta, OpenGraph, skip link, header, footer
src/layouts/Page.astro       secondary page layout (title, eyebrow, lede, prose)
src/components/              Header, Footer, Section, TodayMock (the illustrated Today screen)
src/pages/                   index, integrations, download, docs, privacy, security, 404
src/lib/integrations.ts      the single source of integration phases and honest status
src/lib/links.ts             withBase() and GitHub URLs
src/styles/tokens.css        copy of the scalar-app/ui tokens (do not edit here)
src/styles/global.css        Tailwind theme mapped to tokens, base styles, a few utilities
public/                      logo, generated icons, og image, robots.txt
```

## Content rules

- Nothing on the site claims to ship before it does. Integration status lives only in `src/lib/integrations.ts`; flip it there when work actually starts.
- The Today screen on the home page is labelled as an illustration with invented data.
- No marketing filler. Short sentences, concrete nouns.

## Logo

`public/scalar.png` is the source logo (yellow S mark on black, 1254px). Derived assets are generated from it and committed: `scalar-mark.png` (transparent mark for the header), `favicon.png`, `icon-192.png`, `icon-512.png`, `og.png`. To regenerate after a logo change, run a small sharp script (Astro ships sharp) that trims the source, pads it with its own background color and resizes; the header and OpenGraph tags pick the files up automatically when they exist at build time.

## Design tokens

`src/styles/tokens.css` is copied from [scalar-app/ui](https://github.com/scalar-app/ui) (`src/tokens/tokens.css`). The ui repository is canonical; when tokens change there, copy the file over.

## Contributing

See [scalar-app/.github/CONTRIBUTING.md](https://github.com/scalar-app/.github/blob/main/CONTRIBUTING.md).

## License

AGPL-3.0-only. See [LICENSE](./LICENSE).
