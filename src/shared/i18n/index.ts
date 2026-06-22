import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import ru from "./locales/ru.json"

export const LANGUAGE_STORAGE_KEY = "vinyl-music:language"
export const supportedLanguages = ["en", "ru"] as const
export type AppLanguage = typeof supportedLanguages[number]

export const isAppLanguage = (language: string): language is AppLanguage =>
  supportedLanguages.includes(language as AppLanguage)

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage)

const getInitialLanguage = (): AppLanguage => {
  if (canUseStorage()) {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (savedLanguage && isAppLanguage(savedLanguage)) return savedLanguage
  }

  const browserLanguage = typeof navigator !== "undefined"
    ? navigator.language.split("-")[0]
    : "en"

  return isAppLanguage(browserLanguage) ? browserLanguage : "en"
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
