"use client";

import { useI18n } from "@/lib/i18n";
import { asset } from "@/lib/assets";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={asset("/media/track-1.jpg")}
        >
          <source src={asset("/media/intro.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 lg:pt-32">
        <div className="max-w-3xl">
          <span className="tag-label mb-6">{t.hero.badge}</span>

          <h1 className="font-display text-5xl font-bold text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {t.hero.title}
            <span className="mt-1 block text-racing">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg text-mist sm:text-xl">{t.hero.subtitle}</p>
          <p className="mt-3 max-w-2xl text-base text-fog">{t.hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contacts"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-racing px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              {t.hero.ctaPrimary}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-mist/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-steel bg-steel sm:grid-cols-3">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="bg-ink-soft/80 p-5 backdrop-blur-sm">
                <dt className="font-display text-4xl font-bold text-white">{s.value}</dt>
                <dd className="mt-1 text-sm text-fog">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 track-line opacity-80" />
    </section>
  );
}
