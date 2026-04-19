'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { ThemeToggle } from '@/src/components/theme-toggle';
import { useI18n } from '@/src/components/i18n-provider';
import { sectionIds, type SectionId } from '@/src/constants/section-ids';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/src/components/ui/select';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { dictionary, locale } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale !== locale) {
      router.push(`/${nextLocale}`);
    }
  };

  const localeOptions = {
    pt: { flag: 'PT', short: 'PT', label: dictionary.common.languages.pt },
    en: { flag: 'EN', short: 'EN', label: dictionary.common.languages.en },
    es: { flag: 'ES', short: 'ES', label: dictionary.common.languages.es },
  } as const;

  const currentLocale = localeOptions[locale];

  const localeBadgeClassName =
    'inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-primary/10 px-1.5 text-[10px] font-bold text-primary';

  const languageOptions = (
    <>
      <SelectItem value="pt">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className={localeBadgeClassName}>
            {localeOptions.pt.flag}
          </span>
          <span>{localeOptions.pt.label}</span>
        </span>
      </SelectItem>
      <SelectItem value="en">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className={localeBadgeClassName}>
            {localeOptions.en.flag}
          </span>
          <span>{localeOptions.en.label}</span>
        </span>
      </SelectItem>
      <SelectItem value="es">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className={localeBadgeClassName}>
            {localeOptions.es.flag}
          </span>
          <span>{localeOptions.es.label}</span>
        </span>
      </SelectItem>
    </>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection(sectionIds.home)}
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
            aria-label={dictionary.nav.backToTopTitle}
            title={dictionary.nav.backToTopTitle}
          >
            {dictionary.common.siteName}
          </button>

          {/* Desktop Navigation - centered (show only on lg and above) */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-6">
            <button
              onClick={() => scrollToSection(sectionIds.home)}
              className="hover:text-primary transition-colors"
            >
              {dictionary.nav.home}
            </button>
            <button
              onClick={() => scrollToSection(sectionIds.about)}
              className="hover:text-primary transition-colors"
            >
              {dictionary.nav.about}
            </button>
            <button
              onClick={() => scrollToSection(sectionIds.technologies)}
              className="hover:text-primary transition-colors"
            >
              {dictionary.nav.technologies}
            </button>
            <button
              onClick={() => scrollToSection(sectionIds.experience)}
              className="hover:text-primary transition-colors"
            >
              {dictionary.nav.experience}
            </button>
            <button
              onClick={() => scrollToSection(sectionIds.projects)}
              className="hover:text-primary transition-colors"
            >
              {dictionary.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection(sectionIds.contact)}
              className="hover:text-primary transition-colors"
            >
              {dictionary.nav.contact}
            </button>
          </div>

          {/* Desktop Right Controls (show only on lg and above) */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <Select value={locale} onValueChange={handleLocaleChange}>
              <SelectTrigger
                size="sm"
                aria-label={dictionary.common.languageLabel}
                className="w-[152px] shrink-0"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={localeBadgeClassName}>
                    {currentLocale.short}
                  </span>
                  <span>{currentLocale.label}</span>
                </span>
              </SelectTrigger>
              <SelectContent>{languageOptions}</SelectContent>
            </Select>
          </div>

          {/* Mobile/Tablet Navigation (show below lg) */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Select value={locale} onValueChange={handleLocaleChange}>
              <SelectTrigger
                size="sm"
                aria-label={dictionary.common.languageLabel}
                className="w-[152px] shrink-0"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={localeBadgeClassName}>
                    {currentLocale.short}
                  </span>
                  <span>{currentLocale.label}</span>
                </span>
              </SelectTrigger>
              <SelectContent>{languageOptions}</SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Menu (show below lg) */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection(sectionIds.home)}
                className="text-left hover:text-primary transition-colors"
              >
                {dictionary.nav.home}
              </button>
              <button
                onClick={() => scrollToSection(sectionIds.about)}
                className="text-left hover:text-primary transition-colors"
              >
                {dictionary.nav.about}
              </button>
              <button
                onClick={() => scrollToSection(sectionIds.technologies)}
                className="text-left hover:text-primary transition-colors"
              >
                {dictionary.nav.technologies}
              </button>
              <button
                onClick={() => scrollToSection(sectionIds.experience)}
                className="text-left hover:text-primary transition-colors"
              >
                {dictionary.nav.experience}
              </button>
              <button
                onClick={() => scrollToSection(sectionIds.projects)}
                className="text-left hover:text-primary transition-colors"
              >
                {dictionary.nav.projects}
              </button>
              <button
                onClick={() => scrollToSection(sectionIds.contact)}
                className="text-left hover:text-primary transition-colors"
              >
                {dictionary.nav.contact}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
