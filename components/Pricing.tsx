"use client";

import { useI18n } from "@/lib/i18n";
import { ctaMailto } from "@/lib/mailto";
import Reveal from "./Reveal";

export default function Pricing() {
  const { t } = useI18n();

  return (
    <section id="pricing" className="border-t border-steel bg-ink-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="tag-label mb-5">{t.pricing.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.pricing.title}
            </h2>
            <p className="mt-6 text-lg text-mist">{t.pricing.intro}</p>
          </Reveal>
        </div>

        {t.pricing.cards && t.pricing.cards.length > 0 && (
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {t.pricing.cards.map((card, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`flex h-full flex-col rounded-3xl border p-8 transition-transform hover:-translate-y-1 ${
                    card.featured
                      ? "border-racing bg-gradient-to-b from-carbon to-ink shadow-glow"
                      : "border-steel bg-carbon"
                  }`}
                >
                  {card.featured && (
                    <span className="mb-4 inline-flex w-fit rounded-full bg-racing px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                      ★
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-4 font-display text-4xl font-bold text-white">{card.price}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-fog">{card.desc}</p>
                  <a
                    href={ctaMailto()}
                    className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                      card.featured
                        ? "bg-racing text-white hover:bg-racing-dark"
                        : "border border-mist/30 text-white hover:bg-white/5"
                    }`}
                  >
                    {t.nav.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={120}>
          <p className={`text-sm text-fog ${t.pricing.cards?.length ? "mt-8" : "mt-6"}`}>
            {t.pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
