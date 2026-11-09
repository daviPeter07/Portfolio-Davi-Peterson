'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/src/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { useI18n } from '@/src/components/i18n-provider';
import { useIsMobile } from '@/src/hooks/use-mobile';

type TechnologyItemProps = {
  name: string;
  logo: string;
  info?: { desc: string; url: string };
  invertDark?: boolean;
};

// Nomes longos ocupam a linha inteira no grid de 2 colunas, onde não cabem
const WIDE_NAMES = ['Microserviços', 'Cloudflare R2'];

export function TechnologyItem({ name, logo, info, invertDark }: TechnologyItemProps) {
  const isMobile = useIsMobile();
  const { dictionary } = useI18n();

  const content = (
    <div className="space-y-2">
      <div className="text-sm font-semibold">{name}</div>
      {info?.desc && <p className="text-sm text-muted-foreground">{info.desc}</p>}
      {info?.url && (
        <a
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary-text hover:underline"
        >
          {dictionary.common.documentation}
        </a>
      )}
    </div>
  );

  const item = (
    <div
      title={name}
      className={`group flex items-center gap-2 px-2.5 py-3 rounded-lg border bg-muted/30 hover:bg-muted transition-transform hover:-translate-y-0.5 hover:ring-1 ring-primary/20 ${
        WIDE_NAMES.includes(name) ? 'min-[380px]:col-span-2 sm:col-span-1' : ''
      }`}
    >
      {name === 'NativeWind' || name === 'AWS' ? (
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-white p-1">
          <img src={logo} alt={name} title={name} className="h-full w-full object-contain" />
        </span>
      ) : (
        <img
          src={logo}
          alt={name}
          title={name}
          className={`w-9 h-9 object-contain ${invertDark ? 'dark:invert dark:brightness-0' : ''}`}
        />
      )}
      <span className="min-w-0 font-semibold text-sm whitespace-normal cursor-default select-none">
        {name}
      </span>
    </div>
  );

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{item}</PopoverTrigger>
        <PopoverContent sideOffset={8} align="center">
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>{item}</HoverCardTrigger>
      <HoverCardContent sideOffset={8} align="center">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
