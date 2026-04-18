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

export const techResources: Record<string, { url: string }> = {
  TypeScript: { url: 'https://www.typescriptlang.org/docs' },
  ReactJS: { url: 'https://react.dev/learn' },
  'Vue.js': { url: 'https://vuejs.org/guide/' },
  'Next.js': { url: 'https://nextjs.org/docs' },
  'Tailwind CSS': { url: 'https://tailwindcss.com/docs' },
  'Node.js': { url: 'https://nodejs.org/en/docs' },
  Express: { url: 'https://expressjs.com' },
  PHP: { url: 'https://www.php.net/manual/en/' },
  Laravel: { url: 'https://laravel.com/docs' },
  'Inertia.js': { url: 'https://inertiajs.com/' },
  MySQL: { url: 'https://dev.mysql.com/doc/' },
  PostgreSQL: { url: 'https://www.postgresql.org/docs/' },
  Docker: { url: 'https://docs.docker.com' },
  'Prisma ORM': { url: 'https://www.prisma.io/docs' },
  Redis: { url: 'https://redis.io/docs/latest' },
  Eloquent: { url: 'https://laravel.com/docs/eloquent' },
  Jest: { url: 'https://jestjs.io/docs/getting-started' },
  Pest: { url: 'https://pestphp.com/docs' },
  Pencil: { url: 'https://pencil.evolus.vn/' },
  Figma: { url: 'https://help.figma.com/hc/en-us' },
};
