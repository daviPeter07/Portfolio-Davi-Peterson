export type TechItem = { name: string; logo: string };

export const frontendUI: TechItem[] = [
  {
    name: 'Next',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
];

export const backendAPIs: TechItem[] = [
  {
    name: 'Nest',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
  },
  {
    name: 'Node',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
];

export const coreLanguages: TechItem[] = [
  {
    name: 'Golang',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
  },
];

export const dataDevOps: TechItem[] = [
  {
    name: 'Postgres',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  {
    name: 'Prisma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
  },
  {
    name: 'Redis',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  },
  {
    name: 'Bull',
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 6h16M4 12h16M4 18h8'/></svg>",
  },
  {
    name: 'MiniIO',
    logo: 'https://cdn.simpleicons.org/minio/C72E49',
  },
  {
    name: 'AWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  },
];

export const techResources: Record<string, { url: string }> = {
  React: { url: 'https://react.dev/learn' },
  Next: { url: 'https://nextjs.org/docs' },
  Nest: { url: 'https://docs.nestjs.com/' },
  Node: { url: 'https://nodejs.org/en/docs' },
  Golang: { url: 'https://go.dev/doc/' },
  Postgres: { url: 'https://www.postgresql.org/docs/' },
  Prisma: { url: 'https://www.prisma.io/docs' },
  Redis: { url: 'https://redis.io/docs/latest' },
  Docker: { url: 'https://docs.docker.com' },
  Bull: { url: 'https://docs.bullmq.io/' },
  MiniIO: { url: 'https://min.io/docs/minio/linux/index.html' },
  AWS: { url: 'https://docs.aws.amazon.com/' },
};
