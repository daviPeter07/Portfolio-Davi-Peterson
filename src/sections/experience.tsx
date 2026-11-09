'use client';

import { useState } from 'react';
import { Calendar, ChevronDown, MapPin } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { experiences, type Experience } from '@/src/constants/experiences';
import { sectionIds } from '@/src/constants/section-ids';

const VISIBLE_ACHIEVEMENTS = 2;

function AchievementList({ achievements }: { achievements: string[] }) {
  return (
    <ul className="space-y-2">
      {achievements.map((achievement) => (
        <li key={achievement} className="flex items-start gap-2 text-sm">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
  );
}

function CompanyLink({ experience }: { experience: Experience }) {
  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary-text underline decoration-primary/60 underline-offset-4 hover:decoration-primary"
    >
      {experience.company}
    </a>
  );
}

export function ExperienceSection() {
  const { dictionary } = useI18n();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const current = experiences.filter(({ isCurrent }) => isCurrent);
  const previous = experiences.filter(({ isCurrent }) => !isCurrent);

  const getContent = (id: string) =>
    dictionary.experience.items[id as keyof typeof dictionary.experience.items];

  const toggleExpanded = (id: string) => {
    setExpandedIds((ids) =>
      ids.includes(id) ? ids.filter((expandedId) => expandedId !== id) : [...ids, id]
    );
  };

  return (
    <section id={sectionIds.experience} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.experience.titleBefore}{' '}
            <span className="text-primary-text">{dictionary.experience.titleAccent}</span>
          </h2>

          <div className="mx-auto max-w-6xl">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {dictionary.experience.current}
            </h3>

            <div className="grid gap-6 lg:grid-cols-3">
              {current.map((experience) => {
                const content = getContent(experience.id);
                const isExpanded = expandedIds.includes(experience.id);
                const achievements = isExpanded
                  ? content.achievements
                  : content.achievements.slice(0, VISIBLE_ACHIEVEMENTS);

                return (
                  <article
                    key={experience.id}
                    data-experience="current"
                    className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
                  >
                    <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {content.period}
                    </p>
                    <h4 className="text-xl font-semibold mb-1">{content.title}</h4>
                    <p className="mb-1">
                      <CompanyLink experience={experience} />
                    </p>
                    <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </p>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {content.description}
                    </p>

                    <AchievementList achievements={achievements} />

                    {content.achievements.length > VISIBLE_ACHIEVEMENTS && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleExpanded(experience.id)}
                        className="mt-auto min-h-11 cursor-pointer self-start pt-2 text-sm font-medium text-primary-text hover:underline"
                      >
                        {isExpanded
                          ? dictionary.experience.showLess
                          : dictionary.experience.showMore}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>

            <h3 className="mt-14 mb-4 text-lg font-semibold">{dictionary.experience.previous}</h3>

            <div className="divide-y rounded-xl border bg-card">
              {previous.map((experience) => {
                const content = getContent(experience.id);

                return (
                  <details key={experience.id} data-experience="previous" className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="font-semibold">{content.title}</span>
                        <span className="text-sm text-muted-foreground">{experience.company}</span>
                      </span>
                      <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">
                        {content.period}
                      </span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>

                    <div className="max-w-3xl space-y-4 px-5 pb-5">
                      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2 sm:hidden">
                          <Calendar className="h-4 w-4" />
                          {content.period}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {experience.location}
                        </span>
                        <CompanyLink experience={experience} />
                      </p>
                      <p className="leading-relaxed text-muted-foreground">{content.description}</p>
                      <AchievementList achievements={content.achievements} />
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
