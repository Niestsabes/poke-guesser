import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
    de: { translation: require('./assets/locales/de.json')},
    en: { translation: require('./assets/locales/en.json')},
    es: { translation: require('./assets/locales/es.json')},
    fr: { translation: require('./assets/locales/fr.json')},
    it: { translation: require('./assets/locales/it.json')}
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === "development",
        interpolation: {  escapeValue: false }
    });

export default i18n;