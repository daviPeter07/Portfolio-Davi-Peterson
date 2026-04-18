export type TechItem = { name: string; logo: string };

const pencilLogo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M3 21l3.75-1 10.86-10.86-2.75-2.75L4 17.25 3 21z' fill='%23f59e0b'/><path d='M14.86 3.64l2.75 2.75 1.14-1.14a1.5 1.5 0 0 0 0-2.12l-.63-.63a1.5 1.5 0 0 0-2.12 0l-1.14 1.14z' fill='%231f2937'/></svg>";

export const javaScriptEcosystem: TechItem[] = [
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'ReactJS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Vue.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Jest',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  },
];

export const phpEcosystem: TechItem[] = [
  {
    name: 'PHP',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    name: 'Laravel',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  },
  {
    name: 'Inertia.js',
    logo: 'https://cdn.simpleicons.org/inertia',
  },
  {
    name: 'Eloquent',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  },
  {
    name: 'Pest',
    logo: 'https://pestphp.com/www/favicon.svg',
  },
];

export const dataAndDevOps: TechItem[] = [
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Prisma ORM',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  },
  {
    name: 'Redis',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  },
  {
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
];

export const designAndProduct: TechItem[] = [
  {
    name: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Pencil',
    logo: pencilLogo,
  },
];

export const techDocs: Record<string, { desc: string; url: string }> = {
  TypeScript: {
    desc: 'Superset do JavaScript com tipagem estática.',
    url: 'https://www.typescriptlang.org/docs',
  },
  ReactJS: {
    desc: 'Biblioteca para construir interfaces com componentes.',
    url: 'https://react.dev/learn',
  },
  'Vue.js': {
    desc: 'Framework progressivo para construir interfaces reativas e componentizadas.',
    url: 'https://vuejs.org/guide/',
  },
  'Next.js': {
    desc: 'Framework React com rotas, rendering e tooling moderno.',
    url: 'https://nextjs.org/docs',
  },
  'Tailwind CSS': {
    desc: 'Framework utilitário de CSS para criar interfaces rápidas.',
    url: 'https://tailwindcss.com/docs',
  },
  'Node.js': {
    desc: 'Ambiente de execução JavaScript no servidor.',
    url: 'https://nodejs.org/en/docs',
  },
  Express: {
    desc: 'Framework web minimalista para Node.js.',
    url: 'https://expressjs.com',
  },
  PHP: {
    desc: 'Linguagem de script para aplicações web no servidor.',
    url: 'https://www.php.net/manual/en/',
  },
  Laravel: {
    desc: 'Framework PHP para aplicações web com foco em produtividade e DX.',
    url: 'https://laravel.com/docs',
  },
  'Inertia.js': {
    desc: 'Ponte entre backend e frontend para construir SPAs sem abrir mão do servidor.',
    url: 'https://inertiajs.com/',
  },
  MySQL: {
    desc: 'Banco de dados relacional popular e amplamente usado.',
    url: 'https://dev.mysql.com/doc/',
  },
  PostgreSQL: {
    desc: 'Banco de dados relacional avançado e extensível.',
    url: 'https://www.postgresql.org/docs/',
  },
  Docker: {
    desc: 'Plataforma de containers para empacotar e distribuir apps.',
    url: 'https://docs.docker.com',
  },
  'Prisma ORM': {
    desc: 'ORM para TypeScript/Node com schema e migrações.',
    url: 'https://www.prisma.io/docs',
  },
  Redis: {
    desc: 'Banco de dados em memória usado para cache, filas e alta performance.',
    url: 'https://redis.io/docs/latest',
  },
  Eloquent: {
    desc: 'ORM do Laravel para modelagem de dados e consultas expressivas em PHP.',
    url: 'https://laravel.com/docs/eloquent',
  },
  Jest: {
    desc: 'Framework de testes em JavaScript com mocks e asserts.',
    url: 'https://jestjs.io/docs/getting-started',
  },
  Pest: {
    desc: 'Framework de testes para PHP com sintaxe fluida e foco em legibilidade.',
    url: 'https://pestphp.com/docs',
  },
  Pencil: {
    desc: 'Ferramenta de design e prototipação de interfaces para wireframes e fluxos.',
    url: 'https://pencil.evolus.vn/',
  },
  Figma: {
    desc: 'Ferramenta de design colaborativa para UI/UX.',
    url: 'https://help.figma.com/hc/en-us',
  },
};
