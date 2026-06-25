"use client";

import { useI18n } from "@/lib/i18n";
import { asset } from "@/lib/assets";
import Reveal from "./Reveal";

export default function Format() {
  const { t } = useI18n();

  return (
    <section id="format" className="relative overflow-hidden border-t border-steel py-24 lg:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${asset("/media/track-2.jpg")})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="tag-label mb-5">{t.format.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.format.title}
            </h2>
            <p className="mt-6 text-lg text-mist">{t.format.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {t.format.parts.map((part, i) => (
            <Reveal key={i} delay={i * 120} as="article">
              <div className="group h-full rounded-3xl border border-steel bg-carbon/70 p-8 backdrop-blur-sm transition-colors hover:border-racing/60">
                <span className="font-display text-sm font-semibold uppercase tracking-widest text-racing">
                  {part.tag}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                  {part.title}
                </h3>
                <p className="mt-3 text-mist">{part.desc}</p>
                <ul className="mt-6 space-y-3">
                  {part.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-mist">
                      <svg className="mt-0.5 h-5 w-5 flex-none text-racing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
