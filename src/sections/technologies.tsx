'use client';

import { useRef } from 'react';
import { Code2, Database, Palette, Server } from 'lucide-react';
import { TechnologyCategory } from '@/src/components/technology-category';
import {
  dataAndDevOps,
  designAndProduct,
  javaScriptEcosystem,
  phpEcosystem,
  techDocs,
} from '@/src/constants/technologies';

export function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="tecnologias" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Minhas <span className="text-primary">Tecnologias</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <TechnologyCategory
              title="Ecossistema JavaScript"
              Icon={Code2}
              items={javaScriptEcosystem}
              infoMap={techDocs}
              invertNames={['Express']}
            />
            <TechnologyCategory
              title="Ecossistema PHP"
              Icon={Server}
              items={phpEcosystem}
              infoMap={techDocs}
            />
            <TechnologyCategory
              title="Dados e DevOps"
              Icon={Database}
              items={dataAndDevOps}
              infoMap={techDocs}
            />
            <TechnologyCategory
              title="Design e Produto"
              Icon={Palette}
              items={designAndProduct}
              infoMap={techDocs}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
