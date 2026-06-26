"use client";

import { useI18n } from "@/lib/i18n";
import { ctaMailto } from "@/lib/mailto";
import Reveal from "./Reveal";

export default function Pricing() {
  const { t } = useI18n();
  const blocks = t.pricing.blocks ?? [];
  const [asset, partners, included] = blocks;

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

        {blocks.length > 0 && (
          <div className="mt-14">
            <div className="grid gap-6 lg:grid-cols-5">
              {asset && (
                <Reveal className="lg:col-span-2">
                  <div className="flex h-full flex-col rounded-3xl border border-racing/40 bg-gradient-to-b from-carbon to-ink p-8 shadow-glow">
                    <span className="font-display text-sm font-semibold uppercase tracking-widest text-racing">
                      {asset.title}
                    </span>
                    <p className="mt-4 text-lg leading-relaxed text-mist">{asset.desc}</p>
                  </div>
                </Reveal>
              )}

              {partners && (
                <Reveal className="lg:col-span-3" delay={80}>
                  <div className="h-full rounded-3xl border border-steel bg-carbon p-8">
                    <h3 className="font-display text-xl font-bold text-white">{partners.title}</h3>
                    {partners.items.length > 0 && (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {partners.items.map((item, j) => (
                          <li key={j} className="flex gap-3 text-sm text-mist">
                            <svg
                              className="mt-0.5 h-5 w-5 flex-none text-racing"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                            >
                              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            {included && (
              <Reveal delay={140}>
                <div className="mt-6 rounded-3xl border border-steel bg-carbon/60 px-8 py-6 backdrop-blur-sm">
                  <p className="text-base leading-relaxed text-mist">{included.desc}</p>
                </div>
              </Reveal>
            )}
          </div>
        )}

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

        <Reveal delay={180}>
          <p
            className={`text-sm text-fog ${
              blocks.length || t.pricing.cards?.length ? "mt-8" : "mt-6"
            }`}
          >
            {t.pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
