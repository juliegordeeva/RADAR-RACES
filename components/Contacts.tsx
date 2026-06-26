"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Contacts() {
  const { t } = useI18n();
  const hasForm = Boolean(t.contacts.form.submit);

  return (
    <section id="contacts" className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={hasForm ? "grid gap-12 lg:grid-cols-2 lg:gap-16" : "max-w-2xl"}>
          <Reveal>
            <span className="tag-label mb-5">{t.contacts.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.contacts.title}
            </h2>
            {t.contacts.intro && (
              <p className="mt-6 text-lg text-mist">{t.contacts.intro}</p>
            )}

            <div className="mt-10 space-y-5">
              {t.contacts.persons.map((p, i) => (
                <div key={i} className="rounded-2xl border border-steel bg-carbon p-5">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="mt-0.5 text-sm text-fog">{p.role}</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-sm sm:flex-row sm:gap-6">
                    {p.phone && (
                      <a
                        href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}
                        className="text-mist transition-colors hover:text-racing"
                      >
                        {p.phone}
                      </a>
                    )}
                    {p.tg && (
                      <a
                        href={`https://t.me/${p.tg.replace(/^@/, "")}`}
                        className="text-mist transition-colors hover:text-racing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{p.tg.replace(/^@/, "")}
                      </a>
                    )}
                    <a href={`mailto:${p.email}`} className="text-mist transition-colors hover:text-racing">
                      {p.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
