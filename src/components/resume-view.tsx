"use client";

import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/contact";
import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="mb-5 font-mono text-[11px] tracking-[0.2em] text-amber uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ResumeView() {
  const { t } = useI18n();

  return (
    <>
      <div className="print:hidden">
        <NavBar variant="page" />
      </div>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <header className="pb-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
              {t.ui.resumeTitle}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-2 text-dim">
              {t.role} — Node.js | NestJS | TypeScript | AWS
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[12px] text-faint">
              <li>
                <a className="hover:text-amber" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="hover:text-amber" href={profile.phoneHref}>
                  {profile.phone}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-amber"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.linkedinHandle}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-amber"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  github/{profile.githubHandle}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-2.5 print:hidden">
              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-amber/40 bg-amber/10 px-4 py-2 font-mono text-[12px] text-amber transition-colors hover:bg-amber/20"
              >
                {t.ui.downloadPdf} ↗
              </a>
            </div>
          </header>

          <div className="space-y-10">
            <Block title={t.summary.title}>
              <p className="text-[14px] leading-relaxed text-dim">
                {t.summary.body}
              </p>
            </Block>

            <Block title={t.experience.title}>
              <div className="space-y-8">
                {t.experience.items.map((job) => (
                  <article key={`${job.role}-${job.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[15px] font-medium tracking-tight">
                        {job.role} · {job.company}
                      </h3>
                      <p className="font-mono text-[12px] text-faint">
                        {job.period}
                      </p>
                    </div>
                    <p className="mt-1 text-[13px] text-faint">{job.location}</p>
                    <ul className="mt-4 space-y-2.5">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2.5 text-[13px] leading-relaxed text-dim"
                        >
                          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber/70" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Block>

            <Block title={t.stack.title}>
              <dl className="space-y-3.5">
                {t.stack.groups.map((group) => (
                  <div
                    key={group.group}
                    className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="font-mono text-[12px] text-faint">
                      {group.group}
                    </dt>
                    <dd className="text-[13px] text-dim">
                      {group.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block title={t.education.title}>
              <ul className="space-y-4">
                {t.education.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                  >
                    <div>
                      <p className="text-[14px] font-medium tracking-tight">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-dim">
                        {item.org}
                        <span className="text-faint"> · {item.kind}</span>
                      </p>
                    </div>
                    <p className="font-mono text-[12px] text-faint">
                      {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
