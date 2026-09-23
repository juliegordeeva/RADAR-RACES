import type { Metadata } from "next";
import { PageShell, PageHero, Section, CtaLink } from "@/components/experience/ui";
import { about, home } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/about/" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero tag="О проекте" title={about.title} intro={about.role} />
      <Section className="border-t-0 pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">{about.audienceTitle}</h2>
            <ul className="mt-5 space-y-2 text-sm text-mist">
              {about.audience.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">{about.situationsTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm text-mist">
              {about.situations.map((item, i) => (
                <li key={item} className="rounded-2xl border border-steel bg-carbon px-4 py-3">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}. </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-3xl rounded-2xl border border-steel bg-ink-soft px-5 py-4 text-sm text-fog">
          {about.kidsNote}
        </p>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-white">{home.julia.title}</h2>
          <p className="mt-4 max-w-3xl text-mist">{home.julia.text}</p>
        </div>

        <div className="mt-10">
          <CtaLink href="/contact/">Обсудить выезд команды</CtaLink>
        </div>
      </Section>
    </PageShell>
  );
}
