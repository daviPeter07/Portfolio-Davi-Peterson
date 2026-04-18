'use client';

import { ExternalLink, Github } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { Button } from '@/src/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { projects } from '@/src/constants/projects';
import { sectionIds } from '@/src/constants/section-ids';

export function ProjectsSection() {
  const { dictionary } = useI18n();

  return (
    <section id={sectionIds.projects} className="py-20">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.projects.titleBefore}{' '}
            <span className="text-primary">{dictionary.projects.titleAccent}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => {
              const content =
                dictionary.projects.items[project.id as keyof typeof dictionary.projects.items];

              return (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative overflow-hidden p-4">
                    <img
                      src={project.image || '/placeholder.svg'}
                      alt={content.title}
                      className="w-full h-48 object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.demo ? (
                        <Button size="sm" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {dictionary.common.navigate}
                          </a>
                        </Button>
                      ) : null}
                      {project.code ? (
                        <Button
                          size="sm"
                          asChild
                          className="bg-[#0D1117] text-white hover:bg-[#161b22]"
                        >
                          <a href={project.code} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            {dictionary.common.github}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription>{content.description}</CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
