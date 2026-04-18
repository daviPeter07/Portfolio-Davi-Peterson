export type Project = {
  id: string;
  image: string;
  technologies: string[];
  demo?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    id: 'aliceBlog',
    image: '/Alice-blog.png',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind', 'Specify'],
    demo: 'https://quely-blog.vercel.app/',
    code: 'https://github.com/daviPeter07/alice-blog',
  },
  {
    id: 'nexusSkills',
    image: '/nexus-skill-web-image.png',
    technologies: ['Next.js', 'Typescript', 'Tailwind', 'Firebase'],
    demo: 'https://skill.nxshub.com.br/',
  },
  {
    id: 'uape',
    image: '/uape.png',
    technologies: [
      'Next.js',
      'TypeScript',
      'Cloudflare',
      'shadcn/ui',
      'Tailwind',
      'Lucide React',
      'i18n',
    ],
    demo: 'https://uape.us/',
  },
  {
    id: 'masterMindLanding',
    image: '/mastermind-landing-page.png',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Radix UI', 'Lucide'],
    demo: 'https://mastermind-landing-page.vercel.app/',
  },
  {
    id: 'masterControl',
    image: '/master-control-image.png',
    technologies: ['PHP', 'Javascript', 'MySQL', 'Tailwind'],
    code: 'https://github.com/daviPeter07/Master-Control',
  },
  {
    id: 'jusFacil',
    image: '/jus-facil.png',
    technologies: ['Expo', 'React Native', 'TypeScript', 'Firebase', 'NativeWind'],
    code: 'https://github.com/daviPeter07/jus-facil',
  },
  {
    id: 'roboticaEducacional',
    image: '/robotica-educacional.png',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind', 'shadcn/ui', 'Radix UI', 'Router'],
    demo: 'https://robotica-educacional.vercel.app/',
  },
];
