export type Project = {
  id: string;
  image?: string;
  icon?: string;
  technologies: string[];
  demo?: string;
  code?: string;
  isPrivate?: boolean;
};

export const projects: Project[] = [
  {
    id: 'forgePath',
    icon: 'Brain',
    technologies: ['Go', 'Bubble Tea', 'Bubbles', 'Lip Gloss', 'Cobra', 'Huh', 'Nerd Fonts'],
    code: 'https://github.com/daviPeter07/ForgePath',
  },
  {
    id: 'syncForge',
    image: '/Syncforge-landingpage.png',
    technologies: ['TypeScript', 'Next.js', 'Tailwind'],
    demo: 'https://syncforge-business.vercel.app/',
  },
  {
    id: 'contaCloud',
    image: '/Contacloud-saas.png',
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma', 'LangChain', 'LangGraph'],
    demo: 'https://contacloud.app/',
  },
  {
    id: 'operis',
    image: '/Operis-dashboard.png',
    technologies: ['PHP', 'Laravel 13', 'Inertia.js', 'React'],
    isPrivate: true,
  },
  {
    id: 'residuum',
    image: '/Resdiuum-landingpage.png',
    technologies: ['Python', 'React', 'Vite', 'Tailwind CSS', 'FastAPI'],
    demo: 'https://residuum-frontend-ten.vercel.app/',
  },
  {
    id: 'masterMind',
    image: '/Mastermind-saas.png',
    technologies: ['Java', 'Vue.js', 'Spring Boot'],
    demo: 'https://mastermind-frontend-hyo7.onrender.com/',
  },
  {
    id: 'nexusSkills',
    image: '/nexus-skill-web-image.png',
    technologies: ['TypeScript', 'Next.js', 'Tailwind', 'Firebase'],
    demo: 'https://skill.nxshub.com.br/',
  },
  {
    id: 'uape',
    image: '/uape.png',
    technologies: [
      'TypeScript',
      'Next.js',
      'Cloudflare',
      'shadcn/ui',
      'Tailwind',
      'Lucide React',
      'i18n',
    ],
    demo: 'https://uape.us/',
  },
];
