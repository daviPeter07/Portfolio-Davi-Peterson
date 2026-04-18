export const sectionIds = {
  home: 'home',
  about: 'about',
  technologies: 'technologies',
  experience: 'experience',
  projects: 'projects',
  contact: 'contact',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
