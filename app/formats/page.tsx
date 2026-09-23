import type { Metadata } from "next";
import { PageShell, PageHero, Section, CtaLink } from "@/components/experience/ui";
import { formats } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: formats.meta.title,
  description: formats.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/formats/" },
};

export default function FormatsPage() {
  return (
    <PageShell>
      <PageHero tag="Форматы" title={formats.title} intro={formats.intro} />
      <Section className="border-t-0 pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          {formats.items.map((item) => (
            <article key={item.title} className="rounded-3xl border border-steel bg-carbon p-6">
              <h2 className="font-display text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-mist">{item.desc}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-accent">Для задачи</p>
              <p className="mt-1 text-sm text-fog">{item.task}</p>
              <p className="mt-4 text-xs text-fog">{formats.loadNote}</p>
              <p className="mt-1 text-xs text-fog">{formats.geoNote}</p>
              <div className="mt-6">
                <CtaLink href="/contact/?from=formats">{formats.cta}</CtaLink>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
