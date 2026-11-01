import { z } from 'zod';
import { projects } from '@/src/constants/projects';

const GITHUB_USER = 'daviPeter07';
const REVALIDATE_SECONDS = 600;
const REQUEST_TIMEOUT_MS = 3000;
const MAX_DESCRIPTION_CHARS = 200;
const MAX_SITE_REPOS = 6;
const MAX_CONTEXT_REPOS = 15;
const HIDDEN_REPOS = [GITHUB_USER, 'Portfolio-Davi-Peterson'].map((name) => name.toLowerCase());
const HIDDEN_REPO_PREFIX = 'teste-tecnico';

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  pushedAt: string;
};

const apiRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  pushed_at: z.string(),
  fork: z.boolean(),
  archived: z.boolean(),
  private: z.boolean(),
});

function isPublicProject(repo: z.infer<typeof apiRepoSchema>) {
  const name = repo.name.toLowerCase();

  return (
    !repo.fork &&
    !repo.archived &&
    !repo.private &&
    !HIDDEN_REPOS.includes(name) &&
    !name.startsWith(HIDDEN_REPO_PREFIX)
  );
}

export function parseGithubRepos(body: unknown): GithubRepo[] {
  const parsed = z.array(apiRepoSchema).safeParse(body);

  if (!parsed.success) {
    return [];
  }

  return parsed.data.filter(isPublicProject).map((repo) => ({
    name: repo.name,
    description: repo.description?.replaceAll('*', '').slice(0, MAX_DESCRIPTION_CHARS) ?? null,
    url: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language,
    pushedAt: repo.pushed_at,
  }));
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100&type=owner`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      }
    );

    if (!response.ok) {
      console.error('Error fetching GitHub repositories:', response.status);
      return [];
    }

    return parseGithubRepos(await response.json());
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

function normalizeLink(link: string) {
  return link.toLowerCase().replace(/\/$/, '');
}

function isFeatured(repo: GithubRepo) {
  const name = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const links = [repo.url, repo.homepage].filter(Boolean).map((link) => normalizeLink(link!));

  return projects.some(
    (project) =>
      name.includes(project.id.toLowerCase()) ||
      [project.code, project.demo].some((link) => link && links.includes(normalizeLink(link)))
  );
}

export function excludeFeaturedRepos(repos: GithubRepo[]): GithubRepo[] {
  return repos.filter((repo) => repo.description && !isFeatured(repo)).slice(0, MAX_SITE_REPOS);
}

export function formatGithubContext(repos: GithubRepo[]): string {
  if (repos.length === 0) {
    return '';
  }

  const lines = repos.slice(0, MAX_CONTEXT_REPOS).map((repo) => {
    const details = [
      repo.description ?? 'Sem descrição',
      `Linguagem: ${repo.language ?? 'não informada'}`,
      `Último push: ${repo.pushedAt.slice(0, 10)}`,
      `Link: ${repo.homepage ?? repo.url}`,
    ];

    return `- ${repo.name}: ${details.join('. ')}`;
  });

  return `REPOSITÓRIOS PÚBLICOS DO GITHUB, DO MAIS RECENTE AO MAIS ANTIGO (dados sincronizados automaticamente. Use-os para dizer no que o Davi tem trabalhado e para complementar os projetos):
${lines.join('\n')}`;
}
