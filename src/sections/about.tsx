'use client';

import { Accessibility, Gauge, GitPullRequest, Layers3 } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { sectionIds } from '@/src/constants/section-ids';

export function AboutSection() {
  const { dictionary } = useI18n();

  return (
    <section id={sectionIds.about} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.about.titleBefore}{' '}
            <span className="text-primary">{dictionary.about.titleAccent}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {dictionary.about.paragraphs.first}
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {dictionary.about.paragraphs.second}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">
                    {dictionary.about.stats.seniorityValue}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dictionary.about.stats.seniorityLabel}
                  </div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">
                    {dictionary.about.stats.experienceValue}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {dictionary.about.stats.experienceLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <Gauge className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{dictionary.about.cards.performance.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {dictionary.about.cards.performance.description}
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <Accessibility className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{dictionary.about.cards.accessibility.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {dictionary.about.cards.accessibility.description}
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <Layers3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{dictionary.about.cards.scalability.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {dictionary.about.cards.scalability.description}
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <GitPullRequest className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{dictionary.about.cards.collaboration.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {dictionary.about.cards.collaboration.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
