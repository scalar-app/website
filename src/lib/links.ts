/**
 * Prefixes an internal path with the configured base URL so links work when the site is served
 * from a sub-path (for example https://scalar-app.github.io/website/).
 */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')) return path;
  const b = base.endsWith('/') ? base : `${base}/`;
  if (path === '' || path === '/') return b;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${b}${p}`;
}

export const github = {
  org: 'https://github.com/scalar-app',
  releases: 'https://github.com/scalar-app/desktop/releases',
  discussions: 'https://github.com/orgs/scalar-app/discussions',
  contributing: 'https://github.com/scalar-app/.github/blob/main/CONTRIBUTING.md',
  security: 'https://github.com/scalar-app/.github/blob/main/SECURITY.md',
  roadmap: 'https://github.com/orgs/scalar-app/projects',
  docs: 'https://github.com/scalar-app/docs',
  repos: [
    { name: 'web', url: 'https://github.com/scalar-app/web', what: 'Web application (Next.js)' },
    { name: 'api', url: 'https://github.com/scalar-app/api', what: 'HTTP API and data layer' },
    {
      name: 'worker',
      url: 'https://github.com/scalar-app/worker',
      what: 'Background jobs and sync',
    },
    {
      name: 'integrations',
      url: 'https://github.com/scalar-app/integrations',
      what: 'Provider connectors',
    },
    { name: 'ai', url: 'https://github.com/scalar-app/ai', what: 'Command loop and tools' },
    {
      name: 'desktop',
      url: 'https://github.com/scalar-app/desktop',
      what: 'Native shell (Tauri)',
    },
    {
      name: 'sdk',
      url: 'https://github.com/scalar-app/sdk',
      what: 'TypeScript client for the API',
    },
    { name: 'ui', url: 'https://github.com/scalar-app/ui', what: 'Design tokens and components' },
    { name: 'docs', url: 'https://github.com/scalar-app/docs', what: 'Product and developer docs' },
    { name: 'website', url: 'https://github.com/scalar-app/website', what: 'This site' },
  ],
} as const;
