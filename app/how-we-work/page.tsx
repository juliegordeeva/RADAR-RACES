import type { Metadata } from "next";
import { PageShell, PageHero, Section, CtaLink } from "@/components/experience/ui";
import { howWeWork } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: howWeWork.meta.title,
  description: howWeWork.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/how-we-work/" },
};

export default function HowWeWorkPage() {
  const roles = [howWeWork.roles.radar, howWeWork.roles.operator, howWeWork.roles.client];
  return (
    <PageShell>
      <PageHero tag="Как мы работаем" title={howWeWork.title} />
      <Section className="border-t-0 pt-0">
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howWeWork.steps.map((step, i) => (
            <li key={step.title} className="rounded-3xl border border-steel bg-carbon p-6">
              <p className="font-display text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-white">{step.title}</h2>
              <p className="mt-3 text-sm text-fog">{step.desc}</p>
            </li>
          ))}
        </ol>

        <h2 className="font-display mt-16 text-3xl font-semibold text-white">Роли и ответственность</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {roles.map((role) => (
            <article key={role.title} className="rounded-3xl border border-steel bg-carbon p-6">
              <h3 className="font-display text-xl font-semibold text-white">{role.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-fog">
                {role.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-fog">{howWeWork.legalNote}</p>
        <div className="mt-10">
          <CtaLink href="/contact/">Обсудить выезд команды</CtaLink>
        </div>
      </Section>
    </PageShell>
  );
}
