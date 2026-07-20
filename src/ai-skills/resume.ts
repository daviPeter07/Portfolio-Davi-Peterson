import ptDict from '@/src/locales/pt.json';
import { projects } from '@/src/constants/projects';
import { frontendUI, backendAPIs, coreLanguages, dataDevOps } from '@/src/constants/technologies';

type Dictionary = typeof ptDict;
type ExperienceItem = Dictionary['experience']['items'][keyof Dictionary['experience']['items']];
type ProjectItems = Dictionary['projects']['items'];

export function getResumeInfo(dict: Dictionary) {
  const techFrontend = frontendUI.map((t) => t.name).join(', ');
  const techBackend = backendAPIs.map((t) => t.name).join(', ');
  const techCore = coreLanguages.map((t) => t.name).join(', ');
  const techData = dataDevOps.map((t) => t.name).join(', ');

  const experiencesList = Object.values(dict.experience.items)
    .map(
      (exp: ExperienceItem) =>
        `- ${exp.title} (${exp.period}): ${exp.description}\n  Conquistas:\n  * ${exp.achievements.join('\n  * ')}`
    )
    .join('\n\n');

  const projectsList = projects
    .map((p) => {
      const localeData = dict.projects.items[p.id as keyof ProjectItems];

      if (!localeData) return '';

      return `- ${localeData.title}: ${localeData.description}\n  Tecnologias: ${p.technologies.join(', ')}\n  Link: ${p.demo || p.code || 'Privado'}`;
    })
    .filter(Boolean)
    .join('\n\n');

  return `RESUMO TÉCNICO DAS HABILIDADES DO DAVI:
- Frontend: ${techFrontend}
- Backend: ${techBackend}
- Core/Linguagens: ${techCore}
- Banco de Dados e DevOps: ${techData}

EXPERIÊNCIAS PROFISSIONAIS DO DAVI:
(REGRA PARA A IA: Quando perguntarem sobre as atuações do Davi, NÃO cite os nomes dos cargos completos ou rebuscados. Diga apenas que ele atuou como desenvolvedor, cite a senioridade, a área - Frontend, Backend ou Fullstack - e as principais tecnologias usadas).

${experiencesList}

PROJETOS DESENVOLVIDOS PELO DAVI:
${projectsList}`;
}
