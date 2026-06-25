"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel bg-ink-soft py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-racing text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 12 L18 8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-white">
            RADAR<span className="text-racing"> RACES</span>
          </span>
        </div>

        <p className="text-center text-sm text-fog">{t.footer.tagline}</p>

        <p className="text-sm text-fog">
          © {year} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
