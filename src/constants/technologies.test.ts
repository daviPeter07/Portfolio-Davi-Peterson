import { describe, expect, it } from 'vitest';
import {
  backendAPIs,
  coreLanguages,
  dataDevOps,
  frontendUI,
  techResources,
} from '@/src/constants/technologies';
import en from '@/src/locales/en.json';
import es from '@/src/locales/es.json';
import pt from '@/src/locales/pt.json';

const names = (items: { name: string }[]) => items.map(({ name }) => name);
const allTechnologies = [...frontendUI, ...backendAPIs, ...coreLanguages, ...dataDevOps];

describe('technologies', () => {
  it('shows Angular next to Next', () => {
    expect(names(frontendUI).slice(0, 2)).toEqual(['Next', 'Angular']);
  });

  it('replaces Bull with RabbitMQ and adds microservices', () => {
    expect(names(dataDevOps)).toEqual(
      expect.arrayContaining(['RabbitMQ', 'Microserviços', 'Cloudflare R2'])
    );
    expect(names(dataDevOps)).not.toContain('Bull');
  });

  it.each(Object.entries({ pt, en, es }))(
    'documents every technology in %s',
    (_locale, dictionary) => {
      for (const { name } of allTechnologies) {
        expect(techResources[name]?.url).toMatch(/^https:/);
        expect(
          dictionary.technologies.docs[name as keyof typeof dictionary.technologies.docs]
        ).toBeTruthy();
      }
    }
  );

  it.each(Object.entries({ pt, en, es }))('drops Bull from %s', (_locale, dictionary) => {
    expect(dictionary.technologies.docs).not.toHaveProperty('Bull');
  });
});
