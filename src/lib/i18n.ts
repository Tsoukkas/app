import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import el from "../../locales/el.json";
import en from "../../locales/en.json";

export const resources = {
  en: { translation: en },
  el: { translation: el },
} as const;

export type AppLanguage = keyof typeof resources; // "en" | "el"
export const DEFAULT_LANGUAGE: AppLanguage = "en";

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
