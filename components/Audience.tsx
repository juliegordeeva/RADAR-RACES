"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Audience() {
  const { t } = useI18n();

  return (
    <section id="audience" className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="tag-label mb-5">{t.audience.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.audience.title}
            </h2>
            <p className="mt-6 text-lg text-mist">{t.audience.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.audience.list.map((a, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-steel bg-carbon p-6">
                <span className="font-display text-3xl font-bold text-racing">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
