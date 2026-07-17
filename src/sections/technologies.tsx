'use client';

import { useRef } from 'react';
import { Code2, Database, Layout, Server } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { TechnologyCategory } from '@/src/components/technology-category';
import { sectionIds } from '@/src/constants/section-ids';
import {
  frontendUI,
  backendAPIs,
  coreLanguages,
  dataDevOps,
  techResources,
} from '@/src/constants/technologies';

export function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { dictionary } = useI18n();

  const infoMap = Object.fromEntries(
    Object.entries(techResources).map(([name, value]) => [
      name,
      {
        desc: dictionary.technologies.docs[name as keyof typeof dictionary.technologies.docs],
        url: value.url,
      },
    ])
  );

  return (
    <section id={sectionIds.technologies} ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.technologies.titleBefore}{' '}
            <span className="text-primary">{dictionary.technologies.titleAccent}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <TechnologyCategory
              title={dictionary.technologies.categories.frontendUI}
              Icon={Layout}
              items={frontendUI}
              infoMap={infoMap}
            />
            <TechnologyCategory
              title={dictionary.technologies.categories.backendAPIs}
              Icon={Server}
              items={backendAPIs}
              infoMap={infoMap}
            />
            <TechnologyCategory
              title={dictionary.technologies.categories.coreLanguages}
              Icon={Code2}
              items={coreLanguages}
              infoMap={infoMap}
            />
            <TechnologyCategory
              title={dictionary.technologies.categories.dataDevOps}
              Icon={Database}
              items={dataDevOps}
              infoMap={infoMap}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
