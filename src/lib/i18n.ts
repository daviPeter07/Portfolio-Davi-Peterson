import 'server-only';

import pt from '@/src/locales/pt.json';
import {
  locales,
  hasLocale,
  defaultLocale,
  localeToHtmlLang,
  localeToOpenGraph,
} from '@/src/lib/i18n-config';

const dictionaries = {
  pt: () => import('@/src/locales/pt.json').then((module) => module.default),
  en: () => import('@/src/locales/en.json').then((module) => module.default),
  es: () => import('@/src/locales/es.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof pt;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export { defaultLocale, hasLocale, localeToHtmlLang, localeToOpenGraph, locales };
