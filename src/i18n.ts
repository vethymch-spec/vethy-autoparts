import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import ru from './locales/ru.json';
import ar from './locales/ar.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

export const supportedLngs = ['en', 'es', 'ru', 'ar', 'pt', 'fr', 'de'] as const;
export type Lng = (typeof supportedLngs)[number];

export const rtlLngs = new Set(['ar']);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ru: { translation: ru },
      ar: { translation: ar },
      pt: { translation: pt },
      fr: { translation: fr },
      de: { translation: de },
    },
    fallbackLng: 'en',
    supportedLngs: [...supportedLngs],
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
  });

export default i18n;
