"use client";

import { Cube } from "@/components/cube";
import { PixelName } from "@/components/pixel-name";
import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

function DisplayName({ label }: { label: string }) {
  return (
    <>
      <h1 className="sr-only">
        {label} — {profile.name}
      </h1>
      <div className="max-w-[26rem] sm:max-w-[34rem] lg:max-w-[40rem]">
        <PixelName text="MARCUS" />
      </div>
      <p
        aria-hidden
        className="mt-5 font-mono text-sm tracking-[0.34em] text-dim uppercase sm:text-base"
      >
        Vinícius
      </p>
    </>
  );
}

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-[.55] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-amber/8 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
          <span className="text-amber">{t.role}</span>
          <span className="h-px w-8 bg-line-bright" aria-hidden />
          <span>{t.hero.badge}</span>
        </p>

        <DisplayName label={t.role} />

        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-2xl">
            <div className="space-y-3.5 text-[15px] leading-relaxed text-dim sm:text-base">
              {t.hero.lines.map((line, index) => (
                <p
                  key={line}
                  className={
                    index === t.hero.lines.length - 1
                      ? "font-mono text-sm text-text"
                      : undefined
                  }
                >
                  {index === t.hero.lines.length - 1 ? (
                    <>
                      <span className="mr-2 text-amber">&gt;</span>
                      {line}
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href="#projetos"
                className="rounded border border-amber/40 bg-amber/10 px-4 py-2 font-mono text-[13px] text-amber transition-colors hover:bg-amber/20"
              >
                {t.hero.ctaProjects} ↓
              </a>
              <a
                href="#decisoes"
                className="rounded border border-line bg-raised px-4 py-2 font-mono text-[13px] text-text transition-colors hover:border-line-bright"
              >
                {t.hero.ctaDecisions}
              </a>
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="rounded px-3 py-2 font-mono text-[13px] text-dim underline decoration-line-bright underline-offset-4 transition-colors hover:text-amber"
              >
                {t.ui.downloadPdf} ↗
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-[12px] text-faint">
              <li>
                <a
                  className="transition-colors hover:text-amber"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  github/{profile.githubHandle} ↗
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-amber"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin/{profile.linkedinHandle} ↗
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-amber"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Cube
              hint={t.hero.cubeHint}
              keysHint={t.hero.cubeKeys}
              solveLabel={t.hero.cubeSolve}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
