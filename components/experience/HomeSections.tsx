import Reveal from "@/components/Reveal";
import {
  formats,
  faq,
  home,
  howWeWork,
  locations,
  SHOW_ALTAI,
} from "@/lib/experience-content";
import { CtaLink, Section } from "./ui";
import LeadForm from "./LeadForm";

export function HomeHero() {
  const h = home.hero;
  return (
    <section className="relative overflow-hidden border-b border-steel">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(193,123,74,0.18),transparent_50%),radial-gradient(ellipse_at_90%_40%,rgba(70,100,85,0.16),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 lg:pb-28 lg:pt-32">
        <Reveal>
          <p className="tag-label mb-6">{h.eyebrow}</p>
          <h1 className="font-display max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            {h.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-mist">{h.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink href="/contact/">{h.ctaPrimary}</CtaLink>
            <CtaLink href="/formats/" variant="secondary">
              {h.ctaSecondary}
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-fog">{h.under}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePrinciples() {
  const s = home.principles;
  return (
    <Section>
      <Reveal>
        <span className="tag-label mb-5">{s.tag}</span>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
        <p className="mt-5 max-w-3xl text-lg text-mist">{s.text}</p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {s.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <article className="h-full rounded-3xl border border-steel bg-carbon/70 p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{item.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function HomeLevels() {
  const s = home.levels;
  const cards = [s.experience, s.management];
  return (
    <Section className="bg-ink-soft">
      <Reveal>
        <span className="tag-label mb-5">{s.tag}</span>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
        <p className="mt-5 max-w-3xl text-lg text-mist">{s.intro}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 100}>
            <article className="flex h-full flex-col rounded-3xl border border-steel bg-carbon p-7">
              <h3 className="font-display text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-4 text-mist">{card.text}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Подходит, если нужно</p>
              <ul className="mt-3 flex-1 space-y-2 text-sm text-fog">
                {card.fits.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaLink href={card.href}>{card.cta}</CtaLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function HomeConstructor() {
  const s = home.constructor;
  return (
    <Section>
      <Reveal>
        <span className="tag-label mb-5">{s.tag}</span>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {s.axes.map((axis, i) => (
          <Reveal key={axis.title} delay={i * 70}>
            <article className="h-full rounded-3xl border border-steel bg-carbon/60 p-5">
              <p className="font-display text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{axis.title}</h3>
              <p className="mt-3 text-sm text-fog">{axis.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-fog">{s.note}</p>
    </Section>
  );
}

export function HomeFormats() {
  const s = home.formatsPreview;
  return (
    <Section className="bg-ink-soft">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <span className="tag-label mb-5">{s.tag}</span>
          <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
          <p className="mt-5 max-w-2xl text-mist">{s.intro}</p>
        </Reveal>
        <CtaLink href="/formats/" variant="secondary">
          Все форматы
        </CtaLink>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {formats.items.slice(0, 6).map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 70}>
            <article className="h-full rounded-3xl border border-steel bg-carbon p-6">
              <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-mist">{item.desc}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-accent">Для задачи</p>
              <p className="mt-1 text-sm text-fog">{item.task}</p>
              <p className="mt-4 text-xs text-fog">{formats.loadNote}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function HomeLocations() {
  const s = home.locationsPreview;
  return (
    <Section>
      <Reveal>
        <span className="tag-label mb-5">{s.tag}</span>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
        <p className="mt-5 max-w-3xl text-lg text-mist">{s.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-3xl border border-steel bg-carbon p-6">
            <h3 className="font-display text-xl font-semibold text-white">Площадки под задачу</h3>
            <p className="mt-3 text-sm text-fog">{locations.emptyNote}</p>
            <div className="mt-6">
              <CtaLink href="/locations/" variant="secondary">
                К площадкам
              </CtaLink>
            </div>
          </article>
        </Reveal>
        {SHOW_ALTAI && (
          <Reveal delay={80}>
            <article className="rounded-3xl border border-steel bg-carbon p-6">
              <h3 className="font-display text-xl font-semibold text-white">{locations.altai.title}</h3>
              <p className="mt-3 text-sm text-mist">{locations.altai.text}</p>
              <div className="mt-6">
                <CtaLink href="/contact/?geography=Altai">{locations.altai.cta}</CtaLink>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

export function HomeProcess() {
  const s = home.processPreview;
  return (
    <Section className="bg-ink-soft">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <span className="tag-label mb-5">{s.tag}</span>
          <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
        </Reveal>
        <CtaLink href="/how-we-work/" variant="secondary">
          Процесс и роли
        </CtaLink>
      </div>
      <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {howWeWork.steps.map((step, i) => (
          <Reveal key={step.title} delay={(i % 3) * 60} as="li">
            <div className="h-full rounded-3xl border border-steel bg-carbon p-5">
              <p className="font-display text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-fog">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function HomeJulia() {
  const s = home.julia;
  return (
    <Section>
      <Reveal>
        <span className="tag-label mb-5">{s.tag}</span>
        <h2 className="font-display max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{s.title}</h2>
        <p className="mt-5 max-w-3xl text-lg text-mist">{s.text}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {s.accents.map((a) => (
            <li key={a} className="rounded-2xl border border-steel bg-carbon/50 px-4 py-3 text-sm text-mist">
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-fog">
          Подробнее:{" "}
          <a href={s.linkHref} className="text-accent underline underline-offset-4" target="_blank" rel="noopener noreferrer">
            {s.linkLabel}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}

export function HomeFaq() {
  return (
    <Section className="bg-ink-soft">
      <Reveal>
        <span className="tag-label mb-5">FAQ</span>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Частые вопросы</h2>
      </Reveal>
      <div className="mt-10 space-y-3">
        {faq.map((item, i) => (
          <Reveal key={item.q} delay={(i % 4) * 40}>
            <details className="group rounded-2xl border border-steel bg-carbon px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-white marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="text-accent transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-fog">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function HomeContact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="tag-label mb-5">Заявка</span>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Обсудим задачу команды</h2>
          <p className="mt-5 text-lg text-mist">
            Собираем только данные для первого разговора. Медицинские и паспортные сведения на этом шаге не нужны.
          </p>
          <p className="mt-6 text-sm text-fog">
            Или откройте{" "}
            <CtaLink href="/contact/" variant="secondary">
              страницу контактов
            </CtaLink>
          </p>
        </Reveal>
        <Reveal delay={100}>
          <LeadForm />
        </Reveal>
      </div>
    </Section>
  );
}
