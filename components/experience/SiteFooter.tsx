import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_TG, footer, home } from "@/lib/experience-content";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel bg-ink-soft py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            RADAR <span className="text-accent">Experience</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-fog">{footer.tagline}</p>
          <p className="mt-4 text-sm text-fog">
            <a className="focus-ring rounded-sm hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            {" · "}
            <a
              className="focus-ring rounded-sm hover:text-white"
              href={`https://t.me/${CONTACT_TG}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{CONTACT_TG}
            </a>
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Экосистема</p>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            {home.ecosystem.items.map((item) =>
              item.pending ? (
                <li key={item.title} className="text-fog">
                  {item.title} — {item.desc}
                </li>
              ) : (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="focus-ring rounded-sm transition-colors hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </a>
                  <span className="text-fog"> — {item.desc}</span>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Документы</p>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            <li>
              <Link href="/privacy-policy/" className="focus-ring rounded-sm hover:text-white">
                Политика обработки данных
              </Link>
            </li>
            <li>
              <Link href="/personal-data-consent/" className="focus-ring rounded-sm hover:text-white">
                Согласие на обработку данных
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="focus-ring rounded-sm hover:text-white">
                Обсудить выезд
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-steel px-5 pt-6 text-sm text-fog sm:px-8">
        © {year} · {footer.rights}
      </div>
    </footer>
  );
}
