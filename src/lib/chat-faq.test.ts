import { describe, expect, it } from 'vitest';
import { contact } from '@/src/constants/contact';
import { projects } from '@/src/constants/projects';
import { faqTopics, getFaqAnswer, rankFaqTopics } from '@/src/lib/chat-faq';
import en from '@/src/locales/en.json';
import es from '@/src/locales/es.json';
import pt from '@/src/locales/pt.json';

const dictionaries = { pt, en, es };

describe('rankFaqTopics', () => {
  it('keeps the default order when no topic matches', () => {
    expect(rankFaqTopics('ele joga futebol?', [])).toEqual({
      topics: [...faqTopics],
      highlighted: null,
    });
  });

  it.each([
    ['quais projetos ele fez?', 'projects'],
    ['what projects did he build?', 'projects'],
    ['¿qué proyectos hizo?', 'projects'],
    ['como falo com ele?', 'contact'],
    ['como posso falar com o Davi?', 'contact'],
    ['how can I contact him?', 'contact'],
    ['qual a EXPERIENCIA dele?', 'experience'],
    ['Qual a experiência dele?', 'experience'],
    ['quais tecnologias ele usa?', 'technologies'],
    ['¿qué lenguajes usa?', 'technologies'],
  ] as const)('highlights the topic of "%s"', (question, topic) => {
    const ranked = rankFaqTopics(question, []);

    expect(ranked.highlighted).toBe(topic);
    expect(ranked.topics[0]).toBe(topic);
  });

  it('picks the topic with the most matches', () => {
    expect(rankFaqTopics('linkedin ou email para falar sobre um projeto', []).highlighted).toBe(
      'contact'
    );
  });

  it('removes answered topics', () => {
    const ranked = rankFaqTopics('quais projetos ele fez?', ['projects']);

    expect(ranked.topics).toEqual(['experience', 'technologies', 'contact']);
    expect(ranked.highlighted).toBeNull();
  });

  it('returns nothing when every topic was answered', () => {
    expect(rankFaqTopics('oi', [...faqTopics]).topics).toEqual([]);
  });
});

describe.each(Object.entries(dictionaries))('getFaqAnswer in %s', (_locale, dictionary) => {
  it('lists every project with its link or the private label', () => {
    const answer = getFaqAnswer('projects', dictionary);

    for (const project of projects) {
      const { title } =
        dictionary.projects.items[project.id as keyof typeof dictionary.projects.items];

      expect(answer).toContain(title);
      expect(answer).toContain(project.demo ?? project.code ?? dictionary.common.privateSoftware);
    }
  });

  it('adds recent GitHub repositories to the projects answer', () => {
    const answer = getFaqAnswer('projects', dictionary, [
      {
        name: 'leaf',
        description: 'App',
        url: 'https://github.com/daviPeter07/leaf',
        homepage: null,
        language: null,
        pushedAt: '2026-10-30T10:00:00Z',
      },
    ]);

    expect(answer).toContain(dictionary.aiAssistant.faq.projects.githubIntro);
    expect(answer).toContain('- leaf: https://github.com/daviPeter07/leaf');
  });

  it('omits the GitHub part without repositories', () => {
    expect(getFaqAnswer('projects', dictionary)).not.toContain(
      dictionary.aiAssistant.faq.projects.githubIntro
    );
  });

  it('lists every experience', () => {
    const answer = getFaqAnswer('experience', dictionary);

    for (const experience of Object.values(dictionary.experience.items)) {
      expect(answer).toContain(experience.title);
      expect(answer).toContain(experience.period);
    }
  });

  it('lists the technologies', () => {
    expect(getFaqAnswer('technologies', dictionary)).toContain('Next');
  });

  it('lists the contact channels', () => {
    const answer = getFaqAnswer('contact', dictionary);

    expect(answer).toContain(contact.email);
    expect(answer).toContain(contact.linkedin);
    expect(answer).toContain(contact.github);
  });

  it.each(faqTopics)('has translated text for %s', (topic) => {
    const { question, intro } = dictionary.aiAssistant.faq[topic];

    expect(question).not.toBe('');
    expect(getFaqAnswer(topic, dictionary).startsWith(intro)).toBe(true);
    expect(getFaqAnswer(topic, dictionary)).not.toContain('undefined');
  });
});
