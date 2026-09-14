"use client";

import { useI18n } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:border focus:border-amber focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-[12px] focus:text-amber"
    >
      {t.ui.skipToContent}
    </a>
  );
}
