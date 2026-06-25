"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="tag-label mb-5">{t.about.tag}</span>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
                {t.about.title}
              </h2>
            </Reveal>
            <div className="mt-7 space-y-5">
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-lg leading-relaxed text-mist">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative rounded-3xl border border-steel bg-carbon/60 p-7 sm:p-9">
              <div className="absolute -top-3 left-7 rounded-full bg-racing px-3 py-1 font-display text-xs font-semibold uppercase tracking-widest text-white">
                R · A · D · A · R
              </div>
              <ul className="mt-3 divide-y divide-steel">
                {t.about.radar.map((row, i) => (
                  <li key={i} className="flex items-center gap-5 py-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-ink font-display text-2xl font-bold text-racing">
                      {row.letter}
                    </span>
                    <span className="text-base text-mist">{row.word}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
