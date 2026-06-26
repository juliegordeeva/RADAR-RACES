"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { ctaMailto } from "@/lib/mailto";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { href: string; label: string }[] = [
    { href: "#about", label: t.nav.about },
    { href: "#format", label: t.nav.format },
    { href: "#modules", label: t.nav.modules },
    { href: "#audience", label: t.nav.audience },
    { href: "#speaker", label: t.nav.speaker },
    { href: "#pricing", label: t.nav.pricing },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-steel/70 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-racing text-white shadow-glow">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 12 L18 8" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="font-display text-xl font-bold tracking-wide text-white">
            RADAR<span className="text-racing"> RACES</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-mist transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-steel bg-carbon/60 p-0.5 text-xs font-semibold">
            {(["ru", "en"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === code ? "bg-racing text-white" : "text-fog hover:text-white"
                }`}
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href={ctaMailto()}
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-mist sm:inline-flex"
          >
            {t.nav.cta}
          </a>

          <button
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-steel bg-ink/95 px-5 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-mist transition-colors hover:bg-carbon hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={ctaMailto()}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-racing px-3 py-2.5 text-center text-base font-semibold text-white"
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
