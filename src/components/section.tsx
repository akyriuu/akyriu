import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  subtitle,
  aside,
  children,
}: {
  id?: string;
  index: string;
  title: string;
  subtitle?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-5">
          <div>
            <span className="font-mono text-xs text-amber">
              {index} <span className="text-faint">{"//"}</span>
            </span>
            <h2 className="mt-2.5 text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm text-dim">{subtitle}</p>
            ) : null}
          </div>
          {aside}
        </header>
        <div className="pt-8 sm:pt-10">{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-line bg-raised px-2 py-0.5 font-mono text-[11px] text-dim">
      {children}
    </span>
  );
}
