import type { Metadata } from "next";
import { PageShell, PageHero, Section, CtaLink } from "@/components/experience/ui";
import { management } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: management.meta.title,
  description: management.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/management-format/" },
};

export default function ManagementFormatPage() {
  return (
    <PageShell>
      <PageHero tag="Управленческий формат" title={management.title} intro={management.text} />
      <Section className="border-t-0 pt-0">
        <h2 className="font-display text-2xl font-semibold text-white">Возможные модули</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {management.modules.map((m) => (
            <li key={m} className="rounded-2xl border border-steel bg-carbon px-4 py-3 text-sm text-mist">
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-fog">{management.bureauNote}</p>
        <div className="mt-10">
          <CtaLink href="/contact/?level=management">{management.cta}</CtaLink>
        </div>
      </Section>
    </PageShell>
  );
}
