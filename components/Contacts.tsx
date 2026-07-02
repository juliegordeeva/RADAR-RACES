"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { asset } from "@/lib/assets";
import Reveal from "./Reveal";

export default function Contacts() {
  const { t } = useI18n();
  const [mailtoHintVisible, setMailtoHintVisible] = useState(false);
  const pageLinks = useMemo(
    () => ({
      consent: asset("/consent.html"),
      privacy: asset("/privacy-policy.html"),
    }),
    []
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const consentPD = data.get("consent-pd") === "on";
    const consentNews = data.get("consent-news") === "on";

    if (!consentPD) {
      alert("Пожалуйста, подтвердите согласие на обработку персональных данных.");
      return;
    }

    const subject = encodeURIComponent("Заявка с сайта radarexec.ru");
    const body = encodeURIComponent(
      "Имя: " +
        name +
        "\n" +
        "Телефон: " +
        phone +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Согласие на рассылку: " +
        (consentNews ? "да" : "нет") +
        "\n" +
        "Дата: " +
        new Date().toLocaleString("ru-RU")
    );

    window.location.href = `mailto:prof@jgordeeva.ru?subject=${subject}&body=${body}`;
    setMailtoHintVisible(true);
  }

  return (
    <section id="contacts" className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="tag-label mb-5">{t.contacts.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.contacts.title}
            </h2>
            {t.contacts.intro && (
              <p className="mt-6 text-lg text-mist">{t.contacts.intro}</p>
            )}

            <div className="mt-10 space-y-5">
              {t.contacts.persons.map((p, i) => (
                <div key={i} className="rounded-2xl border border-steel bg-carbon p-5">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="mt-0.5 text-sm text-fog">{p.role}</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-sm sm:flex-row sm:gap-6">
                    {p.phone && (
                      <a
                        href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}
                        className="text-mist transition-colors hover:text-racing"
                      >
                        {p.phone}
                      </a>
                    )}
                    {p.tg && (
                      <a
                        href={`https://t.me/${p.tg.replace(/^@/, "")}`}
                        className="text-mist transition-colors hover:text-racing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{p.tg.replace(/^@/, "")}
                      </a>
                    )}
                    <a href={`mailto:${p.email}`} className="text-mist transition-colors hover:text-racing">
                      {p.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-steel bg-carbon p-7 sm:p-8">
              <form id="leadForm" onSubmit={onSubmit} className="space-y-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ваше имя"
                  required
                  className="w-full rounded-2xl border border-steel bg-ink/40 px-4 py-3 text-mist placeholder:text-fog outline-none transition-colors focus:border-racing/60"
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Телефон"
                  required
                  className="w-full rounded-2xl border border-steel bg-ink/40 px-4 py-3 text-mist placeholder:text-fog outline-none transition-colors focus:border-racing/60"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-2xl border border-steel bg-ink/40 px-4 py-3 text-mist placeholder:text-fog outline-none transition-colors focus:border-racing/60"
                />

                <label className="flex gap-3 rounded-2xl border border-steel bg-ink/30 px-4 py-3 text-sm leading-relaxed text-mist">
                  <input
                    type="checkbox"
                    id="consent-pd"
                    name="consent-pd"
                    required
                    className="mt-1 h-4 w-4 flex-none accent-racing"
                  />
                  <span>
                    Даю согласие на обработку персональных данных в соответствии с{" "}
                    <a
                      href={pageLinks.consent}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mist underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                    >
                      Согласием на обработку персональных данных
                    </a>{" "}
                    и{" "}
                    <a
                      href={pageLinks.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mist underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                    >
                      Политикой обработки персональных данных
                    </a>
                  </span>
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-steel bg-ink/30 px-4 py-3 text-sm leading-relaxed text-mist">
                  <input
                    type="checkbox"
                    id="consent-news"
                    name="consent-news"
                    className="mt-1 h-4 w-4 flex-none accent-racing"
                  />
                  <span>Хочу получать новости и специальные предложения</span>
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-racing px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-racing-dark"
                >
                  Оставить заявку
                </button>

                <p
                  id="mailto-hint"
                  className={`text-sm text-fog ${mailtoHintVisible ? "block" : "hidden"}`}
                >
                  Сейчас откроется ваша почтовая программа с готовым письмом — нажмите «Отправить», чтобы мы получили
                  заявку.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
