"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Speaker() {
  const { t } = useI18n();
  const initials = t.speaker.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <section id="speaker" className="border-t border-steel bg-ink-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="tag-label mb-5">{t.speaker.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.speaker.title}
            </h2>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex h-24 w-24 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-racing to-racing-dark font-display text-3xl font-bold text-white shadow-glow">
                {initials}
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-white">{t.speaker.name}</p>
                <p className="mt-1 text-sm text-fog">{t.speaker.role}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-steel bg-carbon p-5">
              <p className="font-semibold text-white">{t.speaker.producerName}</p>
              <p className="mt-1 text-sm text-fog">{t.speaker.producerRole}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-4">
              {t.speaker.bio.map((line, i) => (
                <li key={i} className="flex gap-4 rounded-xl border border-steel bg-carbon/60 p-4">
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-racing" />
                  <span className="text-mist">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
