'use client';

import { useState } from 'react';
import { ExternalLink, Github, Lock, Terminal } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { Button } from '@/src/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { projects } from '@/src/constants/projects';
import { sectionIds } from '@/src/constants/section-ids';
import type { GithubRepo } from '@/src/lib/github-repos';
import { localeToHtmlLang } from '@/src/lib/i18n-config';

type ProjectsSectionProps = {
  repos: GithubRepo[];
};

const GITHUB_PROFILE = 'https://github.com/daviPeter07';

// A área fica oculta por enquanto; a IA e as respostas prontas continuam usando os repositórios
const SHOW_GITHUB_REPOS = false;

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  const { dictionary, locale } = useI18n();
  const dateFormat = new Intl.DateTimeFormat(localeToHtmlLang[locale], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filterOptions = [
    { label: dictionary.common.all, value: null },
    ...['TypeScript', 'Python', 'Java', 'PHP', 'Go'].map((tech) => ({ label: tech, value: tech })),
  ];
  const filteredProjects = activeFilter 
    ? projects.filter((p) => p.technologies.includes(activeFilter)) 
    : projects;

  return (
    <section id={sectionIds.projects} className="py-20">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.projects.titleBefore}{' '}
            <span className="text-primary-text">{dictionary.projects.titleAccent}</span>
          </h2>
          <div
            role="group"
            aria-label={dictionary.projects.filterLabel}
            className="mx-auto mb-12 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl border bg-muted/40 p-1.5"
          >
            {filterOptions.map(({ label, value }) => (
              <button
                key={label}
                type="button"
                aria-pressed={activeFilter === value}
                onClick={() => setActiveFilter(value)}
                className={`min-h-11 cursor-pointer rounded-xl px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  activeFilter === value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-background hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredProjects.map((project) => {
              const content =
                dictionary.projects.items[project.id as keyof typeof dictionary.projects.items];

              return (
                <Card
                  key={project.id}
                  className="overflow-hidden"
                >
                  <div className="relative overflow-hidden p-4">
                    {project.icon === 'Terminal' ? (
                      <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
                        <Terminal className="w-20 h-20 text-primary-text" />
                      </div>
                    ) : (
                      <img
                        src={project.image || '/placeholder.svg'}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription>{content.description}</CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-auto flex-col items-stretch gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary-text text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.isPrivate ? (
                        <span className="inline-flex items-center text-sm font-medium text-muted-foreground">
                          <Lock className="h-4 w-4 mr-2" />
                          {dictionary.common.privateSoftware}
                        </span>
                      ) : null}
                      {project.demo ? (
                        <Button
                          size="sm"
                          asChild
                          className="min-h-11 flex-1 transition-colors hover:bg-primary/80"
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {dictionary.common.navigate}
                          </a>
                        </Button>
                      ) : null}
                      {project.code ? (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="min-h-11 flex-1 border-primary bg-transparent text-primary-text transition-colors hover:bg-primary hover:text-primary-foreground dark:border-primary dark:bg-transparent dark:hover:bg-primary"
                        >
                          <a href={project.code} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            {dictionary.common.github}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {SHOW_GITHUB_REPOS && repos.length > 0 && (
            <div className="mt-16 max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {dictionary.projects.github.title}
                </h3>
                <a
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-text hover:underline"
                >
                  <Github className="h-4 w-4" />
                  {dictionary.projects.github.viewAll}
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.homepage ?? repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-2 rounded-xl border p-4 transition-colors hover:border-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <span className="font-semibold break-all">{repo.name}</span>
                    <span className="flex-1 text-sm text-muted-foreground line-clamp-3">
                      {repo.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {[repo.language, dateFormat.format(new Date(repo.pushedAt))]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
