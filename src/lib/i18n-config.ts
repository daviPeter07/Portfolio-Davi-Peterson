export const locales = ['pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

export const localeToHtmlLang: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

export const localeToOpenGraph: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
};

export const hasLocale = (locale: string): locale is Locale => locales.includes(locale as Locale);
