import { PortfolioPage } from '@/src/components/portfolio-page';
import { excludeFeaturedRepos, getGithubRepos } from '@/src/lib/github-repos';

export const revalidate = 600;

export default async function LocaleHomePage() {
  const repos = excludeFeaturedRepos(await getGithubRepos());

  return <PortfolioPage repos={repos} />;
}
