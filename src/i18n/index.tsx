import { initReactI18next } from 'react-i18next';
import i18next, { LanguageDetectorAsyncModule, Resource } from 'i18next';

import vi from './locales/vi.json';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb('vi'),
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources: Resource = {
  vi: { translation: vi },
};

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'vi',
  debug: false,
  resources: resources,
  compatibilityJSON: 'v3',
});

const I18nApp = i18next;

export default I18nApp;
