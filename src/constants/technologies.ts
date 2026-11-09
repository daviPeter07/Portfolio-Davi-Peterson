export type TechItem = { name: string; logo: string };

export const frontendUI: TechItem[] = [
  {
    name: 'Next',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Angular',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
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
    name: 'RabbitMQ',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg',
  },
  {
    name: 'MiniIO',
    logo: 'https://cdn.simpleicons.org/minio/C72E49',
  },
  {
    name: 'Cloudflare R2',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg',
  },
  {
    name: 'AWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  },
  {
    name: 'Microserviços',
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e8804a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='9' y='2' width='6' height='6' rx='1'/><rect x='2' y='16' width='6' height='6' rx='1'/><rect x='16' y='16' width='6' height='6' rx='1'/><path d='M12 8v4M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2'/></svg>",
  },
];

export const techResources: Record<string, { url: string }> = {
  React: { url: 'https://react.dev/learn' },
  Next: { url: 'https://nextjs.org/docs' },
  Angular: { url: 'https://angular.dev/overview' },
  Nest: { url: 'https://docs.nestjs.com/' },
  Node: { url: 'https://nodejs.org/en/docs' },
  Golang: { url: 'https://go.dev/doc/' },
  Postgres: { url: 'https://www.postgresql.org/docs/' },
  Prisma: { url: 'https://www.prisma.io/docs' },
  Redis: { url: 'https://redis.io/docs/latest' },
  Docker: { url: 'https://docs.docker.com' },
  RabbitMQ: { url: 'https://www.rabbitmq.com/docs' },
  Microserviços: { url: 'https://microservices.io/' },
  MiniIO: { url: 'https://min.io/docs/minio/linux/index.html' },
  'Cloudflare R2': { url: 'https://developers.cloudflare.com/r2/' },
  AWS: { url: 'https://docs.aws.amazon.com/' },
};
