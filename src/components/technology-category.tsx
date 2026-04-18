'use client';

import { TechnologyItem } from '@/src/components/technology-item';
import { useI18n } from '@/src/components/i18n-provider';
import type { TechItem } from '@/src/constants/technologies';

type TechnologyCategoryProps = {
  title: string;
  Icon: React.ElementType;
  items: TechItem[];
  infoMap: Record<string, { desc: string; url: string }>;
  invertNames?: string[];
};

export function TechnologyCategory({
  title,
  Icon,
  items,
  infoMap,
  invertNames = [],
}: TechnologyCategoryProps) {
  const { dictionary } = useI18n();

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
          {dictionary.common.stacks}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((tech) => (
          <TechnologyItem
            key={tech.name}
            name={tech.name}
            logo={tech.logo}
            info={infoMap[tech.name]}
            invertDark={invertNames.includes(tech.name)}
          />
        ))}
      </div>
    </div>
  );
}
