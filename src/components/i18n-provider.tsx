'use client';

import { createContext, useContext } from 'react';
import type { Dictionary, Locale } from '@/src/lib/i18n';

type I18nContextValue = {
  dictionary: Dictionary;
  locale: Locale;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  children: React.ReactNode;
  dictionary: Dictionary;
  locale: Locale;
};

export function I18nProvider({ children, dictionary, locale }: I18nProviderProps) {
  return <I18nContext.Provider value={{ dictionary, locale }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
