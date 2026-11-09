import { contact } from '@/src/constants/contact';
import { experiences } from '@/src/constants/experiences';
import { getProjectLink, projects } from '@/src/constants/projects';
import {
  aiAgents,
  backendAPIs,
  cicdDeploy,
  coreLanguages,
  dataDevOps,
  frontendUI,
} from '@/src/constants/technologies';
import type { GithubRepo } from '@/src/lib/github-repos';
import type { Dictionary } from '@/src/lib/i18n';

export const faqTopics = ['projects', 'experience', 'technologies', 'contact'] as const;
export type FaqTopic = (typeof faqTopics)[number];

// Radicais comparados sem acento, para cobrir pt, en e es com a mesma lista
const topicKeywords: Record<FaqTopic, string[]> = {
  projects: ['projet', 'project', 'proyect', 'portfolio'],
  experience: ['experienc', 'trabalh', 'trabaj', 'empresa', 'company', 'job', 'carreira', 'career'],
  technologies: [
    'tecnolog',
    'technolog',
    'stack',
    'linguag',
    'lenguaj',
    'language',
    'frontend',
    'backend',
    'framework',
  ],
  contact: [
    'contat',
    'contact',
    'email',
    'e-mail',
    'correo',
    'linkedin',
    'github',
    'falar com',
    'falo com',
    'fala com',
  ],
};

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

export function rankFaqTopics(
  lastQuestion: string,
  answeredTopics: FaqTopic[]
): { topics: FaqTopic[]; highlighted: FaqTopic | null } {
  const question = normalize(lastQuestion);
  const scored = faqTopics
    .filter((topic) => !answeredTopics.includes(topic))
    .map((topic) => ({
      topic,
      score: topicKeywords[topic].filter((keyword) => question.includes(keyword)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return {
    topics: scored.map(({ topic }) => topic),
    highlighted: scored[0]?.score ? scored[0].topic : null,
  };
}

function getProjectLines(dictionary: Dictionary) {
  return projects.map((project) => {
    const { title } =
      dictionary.projects.items[project.id as keyof typeof dictionary.projects.items];

    return `- ${title}: ${getProjectLink(project) ?? dictionary.common.privateSoftware}`;
  });
}

function getExperienceLines(dictionary: Dictionary) {
  return experiences.map(({ id, company }) => {
    const { title, period } =
      dictionary.experience.items[id as keyof typeof dictionary.experience.items];

    return `- ${title} (${company}): ${period}`;
  });
}

function getTechnologyLines() {
  return [frontendUI, backendAPIs, coreLanguages, dataDevOps, aiAgents, cicdDeploy].map(
    (group) => `- ${group.map((technology) => technology.name).join(', ')}`
  );
}

function getContactLines() {
  return [
    `- E-mail: ${contact.email}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- GitHub: ${contact.github}`,
  ];
}

function getGithubLines(dictionary: Dictionary, repos: GithubRepo[]) {
  if (repos.length === 0) {
    return [];
  }

  return [
    '',
    dictionary.aiAssistant.faq.projects.githubIntro,
    ...repos.map((repo) => `- ${repo.name}: ${repo.homepage ?? repo.url}`),
  ];
}

export function getFaqAnswer(
  topic: FaqTopic,
  dictionary: Dictionary,
  repos: GithubRepo[] = []
): string {
  const lines = {
    projects: getProjectLines,
    experience: getExperienceLines,
    technologies: getTechnologyLines,
    contact: getContactLines,
  }[topic](dictionary);
  const githubLines = topic === 'projects' ? getGithubLines(dictionary, repos) : [];

  return [dictionary.aiAssistant.faq[topic].intro, ...lines, ...githubLines].join('\n');
}
