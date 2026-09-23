"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/lib/experience-content";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-steel/70 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
        <Link href="/" className="group flex items-center gap-2.5 focus-ring rounded-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent text-white shadow-glow">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 4v2M12 18v2M4 12h2M18 12h2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
            RADAR <span className="text-accent">Experience</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-sm text-sm font-medium text-mist transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact/"
            className="focus-ring hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-mist sm:inline-flex"
          >
            Обсудить выезд
          </Link>
          <button
            type="button"
            className="focus-ring flex h-10 w-10 items-center justify-center text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Меню"
          >
            <span className="relative block h-4 w-6">
              <span className={`absolute left-0 block h-0.5 w-6 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 block h-0.5 w-6 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-steel bg-ink/95 px-5 py-4 backdrop-blur-md xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-lg px-3 py-2.5 text-base font-medium text-mist hover:bg-carbon hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 rounded-lg bg-accent px-3 py-2.5 text-center text-base font-semibold text-white"
            >
              Обсудить выезд
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
