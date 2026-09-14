"use client";

import { useI18n } from "@/lib/i18n";

export function Metrics() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.metrics.title}
      className="border-y border-line bg-surface/60"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px bg-line px-0 sm:grid-cols-3 lg:grid-cols-6">
        {t.metrics.items.map((metric) => (
          <div key={metric.label} className="bg-ink px-5 py-7 sm:px-6">
            <p className="font-mono text-2xl font-semibold text-amber text-glow-amber">
              {metric.value}
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-dim">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
