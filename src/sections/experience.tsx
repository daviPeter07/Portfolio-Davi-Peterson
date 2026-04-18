'use client';

import { useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { experiences } from '@/src/constants/experiences';
import { sectionIds } from '@/src/constants/section-ids';

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { dictionary } = useI18n();

  return (
    <section id={sectionIds.experience} ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.experience.titleBefore}{' '}
            <span className="text-primary">{dictionary.experience.titleAccent}</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

              {experiences.map((exp, index) => {
                const content =
                  dictionary.experience.items[exp.id as keyof typeof dictionary.experience.items];

                return (
                  <div
                    key={exp.id}
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
                    >
                      <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          {content.period}
                        </div>

                        <h3 className="text-xl font-semibold mb-1">{content.title}</h3>
                        <div className="flex items-center gap-2 text-primary font-medium mb-2">
                          <span>{exp.company}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {content.description}
                        </p>

                        <ul className="space-y-2">
                          {content.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
