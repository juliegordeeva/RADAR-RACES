import type { Metadata } from "next";
import ContactClient from "@/components/experience/ContactClient";
import { PageShell, PageHero, Section } from "@/components/experience/ui";
import { contact } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/contact/" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero tag="Контакты" title={contact.title} intro={contact.intro} />
      <Section className="border-t-0 pt-0">
        <ContactClient />
      </Section>
    </PageShell>
  );
}
