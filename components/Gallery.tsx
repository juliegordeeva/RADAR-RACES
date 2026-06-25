"use client";

import { useI18n } from "@/lib/i18n";
import { asset } from "@/lib/assets";
import Reveal from "./Reveal";

export default function Gallery() {
  const { t } = useI18n();
  const images = [
    asset("/media/track-1.jpg"),
    asset("/media/track-2.jpg"),
  ];

  return (
    <section className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="tag-label mb-5">{t.gallery.tag}</span>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-mist">{t.gallery.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="group relative h-72 overflow-hidden rounded-2xl border border-steel sm:h-80 lg:h-[26rem]">
              <img
                src={images[0]}
                alt="Moscow Raceway · pit lane"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group relative h-72 overflow-hidden rounded-2xl border border-steel sm:h-80 lg:h-[26rem]">
              <img
                src={images[1]}
                alt="Sport cars on track"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
