"use client";

import { Section, Tag } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export function StackGrid() {
  const { t } = useI18n();

  return (
    <Section
      id="stack"
      index="04"
      title={t.stack.title}
      subtitle={t.stack.subtitle}
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.stack.groups.map((group) => (
          <div key={group.group}>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-amber uppercase">
              {group.group}
              <span aria-hidden className="h-px flex-1 bg-line" />
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Education() {
  const { t } = useI18n();

  return (
    <Section index="05" title={t.education.title}>
      <ul className="divide-y divide-line border-y border-line">
        {t.education.items.map((item) => (
          <li
            key={item.title}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 py-5"
          >
            <div>
              <p className="text-[15px] font-medium tracking-tight">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-dim">
                {item.org}
                <span className="text-faint"> · {item.kind}</span>
              </p>
            </div>
            <p className="font-mono text-[12px] text-faint">{item.period}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
