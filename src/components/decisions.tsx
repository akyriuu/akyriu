"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export function Decisions() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(t.decisions.items[0].id);

  return (
    <Section
      id="decisoes"
      index="03"
      title={t.decisions.title}
      subtitle={t.decisions.subtitle}
    >
      <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface/50">
        {t.decisions.items.map((item, index) => {
          const isOpen = open === item.id;
          return (
            <li key={item.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-raised/60 sm:px-6"
                >
                  <span className="mt-0.5 font-mono text-xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-[15px] leading-snug font-medium tracking-tight transition-colors ${
                      isOpen ? "text-amber" : "text-text"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-0.5 font-mono text-sm transition-transform ${
                      isOpen ? "rotate-45 text-amber" : "text-faint"
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>

              {isOpen ? (
                <div className="grid animate-fade-up gap-5 px-5 pb-6 sm:grid-cols-3 sm:px-6 sm:pl-[3.4rem]">
                  {(
                    [
                      ["problem", item.problem],
                      ["approach", item.approach],
                      ["outcome", item.outcome],
                    ] as const
                  ).map(([key, value]) => (
                    <div
                      key={key}
                      className={`border-l-2 pl-4 ${
                        key === "outcome" ? "border-amber/60" : "border-line-bright"
                      }`}
                    >
                      <p className="mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                        <span
                          className={
                            key === "outcome" ? "text-amber" : "text-faint"
                          }
                        >
                          {t.decisionLabels[key]}
                        </span>
                      </p>
                      <p className="text-[13px] leading-relaxed text-dim">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
