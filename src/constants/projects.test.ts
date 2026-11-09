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

  it('lists Leaf right after Maucco, with its code link', () => {
    const ids = projects.map(({ id }) => id);
    const leaf = projects.find(({ id }) => id === 'leaf');

    expect(ids.indexOf('leaf')).toBe(ids.indexOf('maucco') + 1);
    expect(leaf?.code).toBe('https://github.com/daviPeter07/leaf');
  });

  it('links Mentor.IA to its three repositories, since it is not live yet', () => {
    const mentorIA = projects.find(({ id }) => id === 'mentorIA');

    expect(mentorIA?.demo).toBeUndefined();
    expect(mentorIA?.inDevelopment).toBe(true);
    expect(mentorIA?.repositories?.map(({ label }) => label)).toEqual([
      'Frontend',
      'Backend',
      'Worker',
    ]);
  });

  it('points every image at a file in public', () => {
    for (const { image } of projects) {
      if (image) {
        expect(existsSync(join(process.cwd(), 'public', image))).toBe(true);
      }
    }
  });
});
