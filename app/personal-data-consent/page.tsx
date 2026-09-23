import type { Metadata } from "next";
import { PageShell, PageHero, Section } from "@/components/experience/ui";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/experience-content";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description: "Согласие на обработку персональных данных RADAR Experience",
  alternates: { canonical: `${SITE_URL}/personal-data-consent/` },
};

export default function ConsentPage() {
  return (
    <PageShell>
      <PageHero tag="Документы" title="Согласие на обработку персональных данных" />
      <Section className="border-t-0 pt-0">
        <article className="max-w-3xl space-y-5 text-mist">
          <p>
            Я, субъект персональных данных, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
            данных» даю согласие Индивидуальному предпринимателю Гордеевой Юлии Владимировне (ИНН 501304589898, ОГРНИП
            319774600004492) на обработку моих персональных данных на следующих условиях:
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">1. Перечень данных</h2>
          <p>
            Имя, компания, должность или роль, номер телефона и/или адрес электронной почты, сведения о составе команды,
            желаемых датах, географии, уровне программы и краткой задаче.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">2. Цели обработки</h2>
          <p>
            Обработка заявки, поступившей через сайт {SITE_URL}, связь со мной для уточнения деталей и оказания услуг;
            направление рассылок — при отдельном согласии.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">3. Способ обработки</h2>
          <p>
            Данные передаются мной через форму заявки на Сайте на обработчик Оператора либо напрямую на электронную
            почту Оператора ({CONTACT_EMAIL}). Согласие считается предоставленным в момент отправки заполненной формы.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">4. Срок действия</h2>
          <p>Согласие действует до его отзыва мной или до достижения цели обработки.</p>

          <h2 className="font-display text-2xl font-semibold text-white">5. Порядок отзыва</h2>
          <p>Согласие может быть отозвано в любой момент путём направления письма на адрес {CONTACT_EMAIL}.</p>
        </article>
      </Section>
    </PageShell>
  );
}
