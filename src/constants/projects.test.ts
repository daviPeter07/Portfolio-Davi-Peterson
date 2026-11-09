import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from '@/src/constants/projects';

describe('projects', () => {
  it('lists the featured projects first, in order', () => {
    expect(projects.map(({ id }) => id).slice(0, 6)).toEqual([
      'operis',
      'syncForge',
      'masterMind',
      'contaCloud',
      'residuum',
      'maucco',
    ]);
  });

  it('links Operis to its live page only, since its code is closed', () => {
    const operis = projects.find(({ id }) => id === 'operis');

    expect(operis?.demo).toBe('https://www.dgcomputer.com.br/operis/');
    expect(operis?.code).toBeUndefined();
  });

  it('points every image at a file in public', () => {
    for (const { image } of projects) {
      if (image) {
        expect(existsSync(join(process.cwd(), 'public', image))).toBe(true);
      }
    }
  });
});
