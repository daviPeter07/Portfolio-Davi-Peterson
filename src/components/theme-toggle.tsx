'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/src/components/ui/button';
import { useI18n } from '@/src/components/i18n-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { dictionary } = useI18n();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="hover:bg-accent/20 transition-colors"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{dictionary.common.themeToggle}</span>
    </Button>
  );
}
