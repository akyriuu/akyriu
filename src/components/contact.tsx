"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

function CopyEmail() {
  const { t } = useI18n();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = window.setTimeout(() => setIsCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [isCopied]);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(profile.email);
        setIsCopied(true);
      }}
      className="rounded border border-line bg-raised px-3.5 py-2 font-mono text-[12px] text-dim transition-colors hover:border-amber hover:text-amber"
    >
      {isCopied ? `✓ ${t.contact.copied}` : t.contact.copy}
    </button>
  );
}

export function Contact() {
  const { t } = useI18n();

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-line"
    >
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="rounded-lg border border-line bg-surface/70 p-7 sm:p-10">
          <p className="flex items-center gap-2 font-mono text-[12px] text-faint">
            <span className="text-amber">$</span> mail {profile.githubHandle}
          </p>
          <h2 className="mt-5 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.contact.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
            {t.contact.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="rounded border border-amber/40 bg-amber/10 px-4 py-2 font-mono text-[13px] text-amber transition-colors hover:bg-amber/20"
            >
              {profile.email}
            </a>
            <CopyEmail />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-line bg-raised px-3.5 py-2 font-mono text-[12px] text-dim transition-colors hover:border-amber hover:text-amber"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-line bg-raised px-3.5 py-2 font-mono text-[12px] text-dim transition-colors hover:border-amber hover:text-amber"
            >
              GitHub ↗
            </a>
          </div>

          <p className="mt-8 border-t border-line pt-6 font-mono text-[12px] text-faint">
            {profile.phone}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 font-mono text-[11px] text-faint sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{t.ui.builtWith}</p>
      </div>
    </footer>
  );
}
