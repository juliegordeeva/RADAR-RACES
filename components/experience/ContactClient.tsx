"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LeadForm from "@/components/experience/LeadForm";
import { CONTACT_EMAIL, CONTACT_TG } from "@/lib/experience-content";

function ContactFormWithParams() {
  const params = useSearchParams();
  const level = params.get("level") || undefined;
  return <LeadForm defaultLevel={level} />;
}

export default function ContactClient() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-steel bg-carbon p-6">
        <p className="font-display text-xl font-semibold text-white">Прямой контакт</p>
        <p className="mt-4 text-sm text-mist">
          Email:{" "}
          <a className="text-accent underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="mt-2 text-sm text-mist">
          Telegram:{" "}
          <a
            className="text-accent underline underline-offset-4"
            href={`https://t.me/${CONTACT_TG}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{CONTACT_TG}
          </a>
        </p>
        <p className="mt-6 text-sm text-fog">
          В первой форме не собираем медицинские данные, паспортные сведения и персональные данные всех участников.
        </p>
      </div>
      <Suspense fallback={<div className="rounded-3xl border border-steel bg-carbon p-8 text-fog">Загрузка формы…</div>}>
        <ContactFormWithParams />
      </Suspense>
    </div>
  );
}
