import type { Metadata } from "next";
import { PageShell, PageHero, Section, CtaLink } from "@/components/experience/ui";
import { locations, SHOW_ALTAI } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: locations.meta.title,
  description: locations.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/locations/" },
};

export default function LocationsPage() {
  return (
    <PageShell>
      <PageHero tag="Площадки" title={locations.title} intro={locations.intro} />
      <Section className="border-t-0 pt-0">
        <article className="rounded-3xl border border-steel bg-carbon p-7">
          <h2 className="font-display text-2xl font-semibold text-white">Публичный каталог площадок</h2>
          <p className="mt-4 max-w-3xl text-mist">{locations.emptyNote}</p>
          <div className="mt-8">
            <CtaLink href="/contact/?from=locations">Обсудить географию</CtaLink>
          </div>
        </article>

        {SHOW_ALTAI && (
          <article className="mt-6 rounded-3xl border border-steel bg-carbon p-7">
            <h2 className="font-display text-2xl font-semibold text-white">{locations.altai.title}</h2>
            <p className="mt-4 max-w-3xl text-mist">{locations.altai.text}</p>
            <div className="mt-8">
              <CtaLink href="/contact/?geography=Altai">{locations.altai.cta}</CtaLink>
            </div>
          </article>
        )}
      </Section>
    </PageShell>
  );
}
