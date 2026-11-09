import { describe, expect, it } from 'vitest';
import { experiences } from '@/src/constants/experiences';
import en from '@/src/locales/en.json';
import es from '@/src/locales/es.json';
import pt from '@/src/locales/pt.json';

describe('experiences', () => {
  it('places SyncForge by its April 2026 start, after more recent roles', () => {
    expect(experiences.map(({ id }) => id).slice(0, 4)).toEqual([
      'solasstec',
      'residuum',
      'syncForge',
      'twoBrains',
    ]);
  });

  it.each(Object.entries({ pt, en, es }))(
    'has translated text for every role in %s',
    (_locale, dictionary) => {
      for (const { id } of experiences) {
        const item = dictionary.experience.items[id as keyof typeof dictionary.experience.items];

        expect(item?.title).toBeTruthy();
        expect(item?.achievements.length).toBeGreaterThan(0);
      }
    }
  );

  it.each(Object.entries({ pt, en, es }))(
    'dates SyncForge from April 2026 in %s',
    (_locale, dictionary) => {
      expect(
        (dictionary.experience.items as Record<string, { period: string }>).syncForge?.period
      ).toMatch(/^04-2026 - /);
    }
  );
});
