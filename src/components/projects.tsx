"use client";

import { useState } from "react";
import { Section, Tag } from "@/components/section";
import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const PER_PAGE = 4;

export function Projects() {
  const { t } = useI18n();
  const [page, setPage] = useState(0);

  const items = t.projects.items;
  const pages = Math.ceil(items.length / PER_PAGE);
  const current = Math.min(page, pages - 1);
  const from = current * PER_PAGE;
  const visible = items.slice(from, from + PER_PAGE);

  return (
    <Section
      id="projetos"
      index="01"
      title={t.projects.title}
      subtitle={t.projects.subtitle}
      aside={
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[12px] text-dim transition-colors hover:text-amber"
        >
          {t.ui.profileLink} ↗
        </a>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((project, index) => (
          <article
            key={project.id}
            className="group relative flex animate-fade-up flex-col gap-4 rounded-lg border border-line bg-surface/70 p-6 transition-colors hover:border-line-bright"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs text-faint">
                {String(from + index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-dim uppercase">
                {project.kind}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-amber">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {project.summary}
              </p>
            </div>

            <div className="mt-auto">
              <p className="mb-2.5 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                {t.projects.highlightsLabel}
              </p>
              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-dim"
                  >
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber/70" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>

      {pages > 1 ? (
        <div className="mt-8 flex items-center justify-between gap-4 font-mono text-[12px]">
          <button
            type="button"
            onClick={() => setPage(Math.max(0, current - 1))}
            disabled={current === 0}
            className="rounded border border-line bg-raised px-3 py-1.5 text-dim transition-colors enabled:hover:border-amber enabled:hover:text-amber disabled:opacity-35"
          >
            ← {t.ui.prev}
          </button>

          <div className="flex items-center gap-3 text-faint">
            <div className="flex gap-1.5">
              {Array.from({ length: pages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`${t.projects.title} ${index + 1}`}
                  aria-current={index === current}
                  onClick={() => setPage(index)}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    index === current ? "bg-amber" : "bg-line-bright hover:bg-dim"
                  }`}
                />
              ))}
            </div>
            <span className="hidden sm:inline">
              {t.ui.pageCounter(from + 1, from + visible.length, items.length)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setPage(Math.min(pages - 1, current + 1))}
            disabled={current === pages - 1}
            className="rounded border border-line bg-raised px-3 py-1.5 text-dim transition-colors enabled:hover:border-amber enabled:hover:text-amber disabled:opacity-35"
          >
            {t.ui.next} →
          </button>
        </div>
      ) : null}
    </Section>
  );
}
