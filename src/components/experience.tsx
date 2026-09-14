"use client";

import { Section } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export function Experience() {
  const { t } = useI18n();

  return (
    <Section
      id="experiencia"
      index="02"
      title={t.experience.title}
      subtitle={t.experience.subtitle}
    >
      <div className="space-y-12">
        {t.experience.items.map((job) => (
          <article
            key={`${job.role}-${job.period}`}
            className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12"
          >
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h3 className="text-lg font-semibold tracking-tight">
                {job.role}
              </h3>
              <p className="mt-1 text-sm text-dim">
                {job.company} · {job.location}
              </p>
              <p className="mt-3 font-mono text-[12px] text-faint">
                {job.period}
              </p>
              {job.current ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[11px] text-amber">
                  <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-amber" />
                  {t.contact.availability}
                </p>
              ) : null}
            </div>

            <ul className="space-y-4 border-l border-line pl-6">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="relative text-[14px] leading-relaxed text-dim">
                  <span
                    aria-hidden
                    className="absolute top-[9px] -left-[1.6875rem] h-1.5 w-1.5 rounded-full border border-amber/60 bg-ink"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
