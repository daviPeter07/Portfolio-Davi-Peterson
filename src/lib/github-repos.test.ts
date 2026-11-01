import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  excludeFeaturedRepos,
  formatGithubContext,
  getGithubRepos,
  parseGithubRepos,
  type GithubRepo,
} from '@/src/lib/github-repos';

const apiRepo = (overrides: Record<string, unknown> = {}) => ({
  name: 'leaf',
  description: 'App de leitura',
  html_url: 'https://github.com/daviPeter07/leaf',
  homepage: null,
  language: 'TypeScript',
  pushed_at: '2026-10-30T10:00:00Z',
  fork: false,
  archived: false,
  private: false,
  ...overrides,
});

const repo = (overrides: Partial<GithubRepo> = {}): GithubRepo => ({
  name: 'leaf',
  description: 'App de leitura',
  url: 'https://github.com/daviPeter07/leaf',
  homepage: null,
  language: 'TypeScript',
  pushedAt: '2026-10-30T10:00:00Z',
  ...overrides,
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('parseGithubRepos', () => {
  it('maps the API fields', () => {
    expect(parseGithubRepos([apiRepo()])).toEqual([repo()]);
  });

  it.each([
    ['forks', { fork: true }],
    ['archived repositories', { archived: true }],
    ['private repositories', { private: true }],
    ['the profile repository', { name: 'daviPeter07' }],
    ['this portfolio', { name: 'Portfolio-Davi-Peterson' }],
    ['technical tests', { name: 'Teste-Tecnico-Solasstec' }],
  ])('removes %s', (_label, overrides) => {
    expect(parseGithubRepos([apiRepo(overrides)])).toEqual([]);
  });

  it('removes Markdown and caps long descriptions', () => {
    const [{ description }] = parseGithubRepos([
      apiRepo({ description: `Estudos de **Angular** ${'a'.repeat(300)}` }),
    ]);

    expect(description).toMatch(/^Estudos de Angular/);
    expect(description).toHaveLength(200);
  });

  it('treats an empty homepage as missing', () => {
    expect(parseGithubRepos([apiRepo({ homepage: '' })])[0].homepage).toBeNull();
  });

  it('returns nothing for an unexpected body', () => {
    expect(parseGithubRepos({ message: 'rate limit exceeded' })).toEqual([]);
  });
});

describe('getGithubRepos', () => {
  it('requests the most recently pushed repositories with a 10 minute cache', async () => {
    const fetchMock = vi.fn(async () => Response.json([apiRepo()]));
    vi.stubGlobal('fetch', fetchMock);

    expect(await getGithubRepos()).toEqual([repo()]);

    const [url, options] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit & { next: { revalidate: number } },
    ];

    expect(url).toContain('/users/daviPeter07/repos?sort=pushed');
    expect(options.next.revalidate).toBe(600);
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it('sends the token when it is configured', async () => {
    const fetchMock = vi.fn(async () => Response.json([]));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('GITHUB_TOKEN', 'secret');

    await getGithubRepos();

    const [, options] = fetchMock.mock.calls[0] as unknown as [
      string,
      { headers: Record<string, string> },
    ];

    expect(options.headers.Authorization).toBe('Bearer secret');
  });

  it('returns nothing and logs when GitHub refuses', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 403 }))
    );

    expect(await getGithubRepos()).toEqual([]);
    expect(log).toHaveBeenCalled();
  });

  it('returns nothing when the request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Promise.reject(new Error('timeout')))
    );

    expect(await getGithubRepos()).toEqual([]);
  });
});

describe('excludeFeaturedRepos', () => {
  it('removes repositories that match a curated project by name or link', () => {
    const names = excludeFeaturedRepos([
      repo({ name: 'ForgePath' }),
      repo({ name: 'Operis-Saas' }),
      repo({ name: 'Landing', homepage: 'https://syncforge-business.vercel.app' }),
      repo({ name: 'leaf' }),
    ]).map(({ name }) => name);

    expect(names).toEqual(['leaf']);
  });

  it('removes repositories without a description', () => {
    expect(excludeFeaturedRepos([repo({ description: null })])).toEqual([]);
  });

  it('keeps at most 6 repositories', () => {
    const repos = Array.from({ length: 9 }, (_, i) => repo({ name: `repo-${i}` }));

    expect(excludeFeaturedRepos(repos)).toHaveLength(6);
  });
});

describe('formatGithubContext', () => {
  it('describes the repositories for the assistant', () => {
    const context = formatGithubContext([repo({ homepage: 'https://leaf.app' })]);

    expect(context).toContain('leaf');
    expect(context).toContain('App de leitura');
    expect(context).toContain('TypeScript');
    expect(context).toContain('2026-10-30');
    expect(context).toContain('https://leaf.app');
  });

  it('is empty without repositories', () => {
    expect(formatGithubContext([])).toBe('');
  });

  it('includes at most 15 repositories', () => {
    const repos = Array.from({ length: 20 }, (_, i) => repo({ name: `repo-${i}-` }));

    expect(formatGithubContext(repos).match(/repo-\d+-/g)).toHaveLength(15);
  });
});
