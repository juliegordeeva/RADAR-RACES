"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Modules() {
  const { t } = useI18n();

  return (
    <section id="modules" className="border-t border-steel bg-ink-soft py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="tag-label mb-5">{t.modules.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.modules.title}
            </h2>
            <p className="mt-6 text-lg text-mist">{t.modules.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.modules.list.map((m, i) => (
            <Reveal key={m.n} delay={(i % 3) * 90} as="article">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-steel bg-carbon p-7 transition-all hover:-translate-y-1 hover:border-racing/60">
                <span className="font-display text-6xl font-bold text-steel transition-colors group-hover:text-racing/30">
                  {m.n}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold uppercase text-white">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
