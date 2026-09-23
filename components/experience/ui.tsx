import Link from "next/link";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-bg min-h-screen">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`border-t border-steel py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function PageHero({
  tag,
  title,
  intro,
}: {
  tag?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pb-14 lg:pt-24">
      {tag && <span className="tag-label mb-5">{tag}</span>}
      <h1 className="font-display max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {intro && <p className="mt-6 max-w-3xl text-lg text-mist">{intro}</p>}
    </div>
  );
}

export function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-dark"
      : "border border-mist/30 text-white hover:bg-white/5";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
