"use client";

import { FormEvent, useMemo, useState } from "react";
import { contact } from "@/lib/experience-content";

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

function readUtms() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) out[key] = value;
  }
  out.landing_path = window.location.pathname + window.location.search;
  return out;
}

export default function LeadForm({ defaultLevel }: { defaultLevel?: string }) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() || "";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const utms = useMemo(() => readUtms(), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const consent = data.get("consent") === "on";
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }

    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    const payload = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      role: String(data.get("role") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
      team_size: String(data.get("team_size") || "").trim(),
      dates: String(data.get("dates") || "").trim(),
      geography: String(data.get("geography") || "").trim(),
      level: String(data.get("level") || "").trim(),
      task: String(data.get("task") || "").trim(),
      ...utms,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Не удалось отправить заявку. Попробуйте ещё раз или напишите на почту.");
    }
  }

  const field =
    "w-full rounded-2xl border border-steel bg-ink/40 px-4 py-3 text-mist placeholder:text-fog outline-none transition-colors focus:border-accent/60";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-accent/40 bg-accent/15 p-8 text-mist">
        <p className="font-display text-2xl font-semibold text-white">Спасибо</p>
        <p className="mt-3">{contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-steel bg-carbon p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-fog">Имя</span>
          <input className={field} name="name" required autoComplete="name" />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-fog">Компания</span>
          <input className={field} name="company" required autoComplete="organization" />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-fog">Должность или роль</span>
          <input className={field} name="role" required />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-fog">Рабочий телефон или email</span>
          <input className={field} name="contact" required autoComplete="email" />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-fog">Предполагаемый состав команды</span>
          <input className={field} name="team_size" placeholder="например, 12 человек" />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-fog">Желаемые даты или период</span>
          <input className={field} name="dates" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-2 block text-fog">Рассматриваемая география</span>
        <input className={field} name="geography" />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm text-fog">Интересующий уровень</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {contact.levels.map((level) => (
            <label
              key={level.value}
              className="flex cursor-pointer items-center gap-2 rounded-2xl border border-steel bg-ink/30 px-3 py-3 text-sm text-mist"
            >
              <input
                type="radio"
                name="level"
                value={level.value}
                defaultChecked={(defaultLevel || "unknown") === level.value}
                className="accent-accent"
              />
              {level.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm">
        <span className="mb-2 block text-fog">Краткая задача</span>
        <textarea className={`${field} min-h-28`} name="task" required />
      </label>

      <label className="flex gap-3 rounded-2xl border border-steel bg-ink/30 px-4 py-3 text-sm leading-relaxed text-mist">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 flex-none accent-accent" />
        <span>
          Даю согласие на обработку персональных данных в соответствии с{" "}
          <a href="/personal-data-consent/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
            Согласием
          </a>{" "}
          и{" "}
          <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
            Политикой
          </a>
          .
        </span>
      </label>

      {error && <p className="text-sm text-accent">{error}</p>}
      {status === "unconfigured" && (
        <p className="text-sm text-accent">
          Обработчик заявок ещё не подключён. Напишите на{" "}
          <a className="underline" href="mailto:prof@jgordeeva.ru">
            prof@jgordeeva.ru
          </a>{" "}
          или задайте `NEXT_PUBLIC_FORM_ENDPOINT` перед публикацией.
        </p>
      )}
      {status === "error" && error && <p className="sr-only">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}
