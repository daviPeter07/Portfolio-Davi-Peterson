export type TechItem = { name: string; logo: string };

export const frontendUI: TechItem[] = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Vue.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'Nuxt',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg',
  },
];

export const backendAPIs: TechItem[] = [
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'NestJS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
  },
  {
    name: 'Laravel',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  },
  {
    name: 'Spring Boot',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  },
  {
    name: 'FastAPI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  },
];

export const coreLanguages: TechItem[] = [
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  },
  {
    name: 'PHP',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  },
  {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
];

export const dataDevOps: TechItem[] = [
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Prisma ORM',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
  },
  {
    name: 'Redis',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  {
    name: 'MinIO',
    logo: 'https://cdn.simpleicons.org/minio',
  },
  {
    name: 'BullMQ',
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 6h16M4 12h16M4 18h8'/></svg>",
  },
];

export const techResources: Record<string, { url: string }> = {
  React: { url: 'https://react.dev/learn' },
  'Next.js': { url: 'https://nextjs.org/docs' },
  'Vue.js': { url: 'https://vuejs.org/guide/' },
  Nuxt: { url: 'https://nuxt.com/docs' },
  'Node.js': { url: 'https://nodejs.org/en/docs' },
  NestJS: { url: 'https://docs.nestjs.com/' },
  Laravel: { url: 'https://laravel.com/docs' },
  'Spring Boot': { url: 'https://spring.io/projects/spring-boot' },
  FastAPI: { url: 'https://fastapi.tiangolo.com/' },
  TypeScript: { url: 'https://www.typescriptlang.org/docs' },
  PHP: { url: 'https://www.php.net/manual/en/' },
  Java: { url: 'https://docs.oracle.com/en/java/' },
  Python: { url: 'https://docs.python.org/3/' },
  PostgreSQL: { url: 'https://www.postgresql.org/docs/' },
  'Prisma ORM': { url: 'https://www.prisma.io/docs' },
  Redis: { url: 'https://redis.io/docs/latest' },
  Docker: { url: 'https://docs.docker.com' },
  MinIO: { url: 'https://min.io/docs/minio/linux/index.html' },
  BullMQ: { url: 'https://docs.bullmq.io/' },
};
