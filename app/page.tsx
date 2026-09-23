import type { Metadata } from "next";
import { PageShell } from "@/components/experience/ui";
import {
  HomeConstructor,
  HomeContact,
  HomeFaq,
  HomeFormats,
  HomeHero,
  HomeJulia,
  HomeLevels,
  HomeLocations,
  HomePrinciples,
  HomeProcess,
} from "@/components/experience/HomeSections";
import { home } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  alternates: { canonical: "https://experience.radarexec.ru/" },
};

export default function HomePage() {
  return (
    <PageShell>
      <HomeHero />
      <HomePrinciples />
      <HomeLevels />
      <HomeConstructor />
      <HomeFormats />
      <HomeLocations />
      <HomeProcess />
      <HomeJulia />
      <HomeFaq />
      <HomeContact />
    </PageShell>
  );
}
