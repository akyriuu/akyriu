"use client";

import Link from "next/link";
import { LOCALES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function LocaleSwitch() {
  const { locale, set, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.ui.langLabel}
      className="flex items-center rounded border border-line bg-raised p-0.5 font-mono text-[11px]"
    >
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === locale}
          onClick={() => set(option)}
          className={`rounded px-2 py-1 uppercase transition-colors ${
            option === locale
              ? "bg-amber/15 text-amber"
              : "text-faint hover:text-dim"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function NavBar({ variant = "home" }: { variant?: "home" | "page" }) {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[13px] whitespace-nowrap"
        >
          <span className="text-amber">marcus</span>
          <span className="text-faint">@backend:~$</span>
          <span className="h-3.5 w-[7px] animate-blink bg-amber" aria-hidden />
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {variant === "home" ? (
            <ul className="hidden items-center gap-1 md:flex">
              {t.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="rounded px-2.5 py-1.5 font-mono text-[12px] text-dim transition-colors hover:bg-raised hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Link
              href="/"
              className="rounded px-2.5 py-1.5 font-mono text-[12px] text-dim transition-colors hover:bg-raised hover:text-text"
            >
              ← {t.ui.backHome}
            </Link>
          )}

          <Link
            href="/resume"
            className="rounded border border-line bg-raised px-2.5 py-1.5 font-mono text-[12px] text-text transition-colors hover:border-amber hover:text-amber"
          >
            {t.hero.ctaResume}
          </Link>

          <LocaleSwitch />
        </div>
      </nav>
    </header>
  );
}
