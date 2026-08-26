'use client';

import { useRef } from 'react';
import { CloudCog, Code2 } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { TechnologyItem } from '@/src/components/technology-item';
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
  const groups = [
    {
      title: dictionary.technologies.groups.development,
      Icon: Code2,
      items: [...frontendUI, ...backendAPIs, ...coreLanguages],
    },
    {
      title: dictionary.technologies.groups.dataInfrastructure,
      Icon: CloudCog,
      items: dataDevOps,
    },
  ];

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

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {groups.map(({ title, Icon, items }) => (
              <div
                  key={title}
                  className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-7"
                >
                  <div className="mb-6 flex items-center gap-3 border-b pb-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold">{title}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {items.map((tech) => (
                      <TechnologyItem
                        key={tech.name}
                        name={tech.name}
                        logo={tech.logo}
                        info={infoMap[tech.name]}
                        invertDark={tech.name === 'Prisma'}
                      />
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
