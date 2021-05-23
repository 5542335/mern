import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationRU from './locales/ru/translationRU.json';
import translationEN from './locales/en/translationEN.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    keySeparator: false,
    lng: 'ru',

    resources,
  });

export default i18n;
