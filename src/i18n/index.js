import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import uk from "./locales/uk.json";
import zh from "./locales/zh.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import pt from "./locales/pt.json";
import ru from "./locales/ru.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";
import id from "./locales/id.json";
import vi from "./locales/vi.json";
import th from "./locales/th.json";
import it from "./locales/it.json";
import de from "./locales/de.json";

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
  zh: {
    translation: zh,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
  pt: {
    translation: pt,
  },
  ru: {
    translation: ru,
  },
  ar: {
    translation: ar,
  },
  hi: {
    translation: hi,
  },
  id: {
    translation: id,
  },
  vi: {
    translation: vi,
  },
  th: {
    translation: th,
  },
  it: {
    translation: it,
  },
  de: {
    translation: de,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
