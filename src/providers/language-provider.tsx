import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import i18n, { AppLanguage, DEFAULT_LANGUAGE } from "../lib/i18n";

const STORAGE_KEY = "app_language";

type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (lng: AppLanguage) => Promise<void>;
  isReady: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const lng = (stored as AppLanguage) || DEFAULT_LANGUAGE;
        setLanguageState(lng);
        await i18n.changeLanguage(lng);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const setLanguage = async (lng: AppLanguage) => {
    setLanguageState(lng);
    await AsyncStorage.setItem(STORAGE_KEY, lng);
    await i18n.changeLanguage(lng);
  };

  const value = useMemo(
    () => ({ language, setLanguage, isReady }),
    [language, isReady],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useAppLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useAppLanguage must be used within LanguageProvider");
  return ctx;
}
