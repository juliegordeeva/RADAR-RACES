"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Contacts() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("RADAR RACES — заявка с сайта");
    const body = encodeURIComponent(
      `Имя: ${form.name}\nТелефон: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:Prof@jgordeeva.ru?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-steel bg-ink px-4 py-3 text-white placeholder:text-fog outline-none transition-colors focus:border-racing";

  return (
    <section id="contacts" className="border-t border-steel bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="tag-label mb-5">{t.contacts.tag}</span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {t.contacts.title}
            </h2>
            <p className="mt-6 text-lg text-mist">{t.contacts.intro}</p>

            <div className="mt-10 space-y-5">
              {t.contacts.persons.map((p, i) => (
                <div key={i} className="rounded-2xl border border-steel bg-carbon p-5">
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="mt-0.5 text-sm text-fog">{p.role}</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-sm sm:flex-row sm:gap-6">
                    <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`} className="text-mist transition-colors hover:text-racing">
                      {p.phone}
                    </a>
                    <a href={`mailto:${p.email}`} className="text-mist transition-colors hover:text-racing">
                      {p.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-steel bg-carbon/70 p-7 sm:p-9"
            >
              <div className="space-y-4">
                <input
                  required
                  className={field}
                  placeholder={t.contacts.form.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    className={field}
                    placeholder={t.contacts.form.phone}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <input
                    type="email"
                    className={field}
                    placeholder={t.contacts.form.email}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <textarea
                  rows={4}
                  className={`${field} resize-none`}
                  placeholder={t.contacts.form.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-racing px-6 py-3.5 text-base font-semibold text-white shadow-glow transition-colors hover:bg-racing-dark"
                >
                  {t.contacts.form.submit}
                </button>
                {sent && (
                  <p className="text-center text-sm text-amber">{t.contacts.form.success}</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
