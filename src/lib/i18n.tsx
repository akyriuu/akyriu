"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionaries, LOCALES, type Dictionary, type Locale } from "./content";

const STORAGE_KEY = "devmarcus:locale";
const listeners = new Set<() => void>();

function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

function getServerSnapshot(): Locale {
  return "pt";
}

function store(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  for (const listener of listeners) listener();
}

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  set: (next: Locale) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const set = useCallback((next: Locale) => store(next), []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      set,
      toggle: () => set(locale === "pt" ? "en" : "pt"),
    }),
    [locale, set],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }
  return value;
}
