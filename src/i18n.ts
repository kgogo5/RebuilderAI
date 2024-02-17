import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { lang } from "../lang";

const resources = {
  ko: {
    translation: lang.ko,
  },
  en: {
    translation: lang.en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
