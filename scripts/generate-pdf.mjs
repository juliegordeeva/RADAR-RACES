/**
 * Corporate PDF overview of RADAR RACES (RU) for offline / blocked-network sharing.
 * Visual language matches the racing site (ink + racing red), not the bureau cream theme.
 *
 * Usage: npm run pdf
 */
import { existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public");
const OUT_PDF = path.join(OUT_DIR, "radar-races-overview.pdf");
const OUT_HTML = path.join(OUT_DIR, "radar-races-overview.html");

const CONTACT_EMAIL = "prof@jgordeeva.ru";
const SITE_URL = "https://races.radarexec.ru";
const TELEGRAM = "@Prof_jouls";

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const content = {
  brand: "RADAR RACES",
  tagline: "Управленческие интенсивы нового формата · программа уровня Executive",
  hero: {
    headline: "РазГОНИ свой управленческий радар",
    subheadline:
      "Уникальные управленческие сессии: экстремальный опыт автогонок на профессиональной трассе и глубокий анализ лидерских компетенций.",
    body: "1–2–3-дневные интенсивы и стратегические сессии для руководителей и топ-команд. Формат Experiential Learning — обучение через новый опыт.",
  },
  stats: [
    { value: "500+", label: "часов тренингов для топ-команд за год" },
    { value: "5", label: "управленческих траекторий в каждом заезде" },
    { value: "3", label: "трассы: Москва · НН · Дубай" },
  ],
  about: {
    label: "01 / О проекте",
    headline: "Обучение через опыт, который меняет мышление",
    paragraphs: [
      "RADAR RACES соединяет экстремальный опыт автогонок с глубоким анализом управленческих компетенций.",
      "Формат Experiential Learning позволяет выйти за рамки привычного, переосмыслить управленческий стиль и обрести инсайты для роста в роли лидера.",
      "Гоночная трасса — метафора бизнеса: скорость, риски и решения в неопределённости, которые можно прожить, осознать и натренировать.",
    ],
    radar: [
      { letter: "Р", word: "Решения в условиях скорости и риска" },
      { letter: "А", word: "Адаптивность и гибкость мышления" },
      { letter: "Д", word: "Действие на основе осознанности" },
      { letter: "А", word: "Анализ реакций и поведенческих паттернов" },
      { letter: "Р", word: "Рост личного и управленческого потенциала" },
    ],
  },
  format: {
    label: "02 / Формат",
    headline: "Две части одного интенсива",
    intro:
      "Сначала — заезды на профессиональной трассе, затем — разбор реакций и работа над лидерскими компетенциями.",
    parts: [
      {
        number: "01",
        tag: "Часть 1 · Трасса",
        title: "Гоночные заезды и разбор реакций",
        desc: "Участие в заездах на профессиональной трассе с разбором осознанных и неосознанных реакций.",
        bullets: [
          "Быстрые решения в стрессовых ситуациях",
          "Управление рисками в реальном времени",
          "Понимание реакций и поведенческих паттернов",
          "Осознание ограничений и потенциала роста",
          "Командное взаимодействие в нестандартной обстановке",
        ],
      },
      {
        number: "02",
        tag: "Часть 2 · Сессия",
        title: "Осознанное управление собой как лидером",
        desc: "Сессия по осознанному управлению личными и профессиональными навыками, талантами и энергией.",
        bullets: [
          "Сильные стороны и зоны развития как лидера",
          "Инструменты личной и профессиональной эффективности",
          "Стратегии управления энергией и ресурсным состоянием",
          "Осознанное лидерство и эмоциональный интеллект",
          "План развития ключевых управленческих компетенций",
        ],
      },
    ],
  },
  modules: {
    label: "03 / RADAR Международная программа",
    headline: "6 управленческих модулей уровня Executive",
    intro:
      "Каждый модуль — 3–4 дня; после обучения — поддержка и менторинг. При прохождении всех модулей — диплом государственного образца.",
    items: [
      {
        number: "01",
        title: "Раскрытие управленческого потенциала",
        desc: "Тренировки на трассе (партнёр Kamensky Racing School) и сессия по осознанному управлению эффективностью лидера.",
      },
      {
        number: "02",
        title: "Управленческое бизнес-моделирование",
        desc: "Лидерская бизнес-модель управленца и новая бизнес-модель компании. Антикризисные преобразования.",
      },
      {
        number: "03",
        title: "Искусственный интеллект в управлении",
        desc: "Практика внедрения ИИ в процесс принятия и проверки управленческих решений.",
      },
      {
        number: "04",
        title: "Автоматизация и аналитика",
        desc: "Система аналитики и системного управления бизнес-процессами.",
      },
      {
        number: "05",
        title: "Управление продуктом",
        desc: "Продукт и клиентский опыт, точки роста, гипотезы, CJM, продуктовые процессы.",
      },
      {
        number: "06",
        title: "Собственный управленческий проект",
        desc: "Переупаковка продукта и бизнеса. Защита проекта, возможность двойного диплома.",
      },
    ],
  },
  audience: {
    label: "04 / Кому подходит",
    headline: "Для тех, кто принимает стратегические решения",
    intro: "Программа создана для лидеров, отвечающих за развитие и будущее бизнеса.",
    items: [
      {
        number: "01",
        title: "Высший менеджмент",
        desc: "Руководители, отвечающие за стратегические решения и их внедрение.",
      },
      {
        number: "02",
        title: "Собственники бизнеса",
        desc: "Развитие бизнеса, поиск новых возможностей и рынков.",
      },
      {
        number: "03",
        title: "Советники собственников",
        desc: "Инновации, операционная эффективность, антикризис.",
      },
      {
        number: "04",
        title: "Директора по развитию",
        desc: "Разработка, принятие и реализация стратегических решений.",
      },
    ],
  },
  team: {
    label: "05 / Команда",
    headline: "Кто ведёт программу",
    mission:
      "Наша задача — передать супер-способности 3D-видения бизнес-ситуации целиком: от модели через лидерскую команду, экономику решений и человеческую сложность изменений к устойчивой управленческой системе.",
    members: [
      {
        initials: "ГЮ",
        name: "Гордеева Юлия Владимировна",
        role: "Международный консультант, идейный вдохновитель RADAR RACES",
        points: [
          "2010–2022 — руководитель международных корпоративных программ обучения IBS Plekhanov",
          "2022 — н/в — руководитель консалтинговых и обучающих практик для среднего и крупного бизнеса",
          "За 2025–2026 лично провела более 250 часов корпоративных тренингов и стратегических сессий",
          "Спикер и руководитель MBA-программ; эксперт площадок МБМ, ЦДП, Агентства инноваций Москвы",
        ],
      },
      {
        initials: "КИ",
        name: "Илья Каменский",
        role: "Владелец Kamensky Racing School · партнёр по скорости решений и управлению реакциями",
        points: [
          "Профессиональная гоночная школа и инфраструктура трассы",
          "Среда давления, в которой управленческие реакции становятся видимыми",
          "Сопровождение заездов как живой модели поведения топ-команды",
        ],
      },
    ],
  },
  offer: {
    label: "06 / Организация",
    headline: "Гонки РАДАР — инвестиция в управленческий рост",
    intro:
      "Организуем управленческое мероприятие в стиле Experiential Learning — обучение руководителей через новый опыт.",
    asset: "Ключевой актив: заезды на гоночных трассах и управленческая сессия — разбор.",
    partnersTitle: "Ключевые партнёры и форматы опыта",
    partners: [
      "яхтенные клубы и яхт-регаты",
      "экстремальный речной рафтинг",
      "каньонинг на Камчатке",
      "вождение суперкаров по льду на Байкале",
      "полёты на легкомоторных самолётах (MENA, CIS)",
    ],
    included:
      "Организация любого заезда включает выездное мероприятие, двух экспертов, сопровождение после модуля, договоры и сертификаты.",
    note: "Точная стоимость зависит от формата, состава группы и локации. Рассчитаем под ваш запрос.",
  },
  contact: {
    headline: "Оставьте заявку",
    body: "Напишите в свободной форме — ответим и предложим формат под вашу команду и задачу.",
    email: CONTACT_EMAIL,
    telegram: TELEGRAM,
    site: SITE_URL,
  },
};

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function findChrome() {
  for (const candidate of CHROME_PATHS) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(
    "Google Chrome not found. Install Chrome or set CHROME_PATH to the browser executable."
  );
}

function buildHtml(c) {
  const stats = c.stats
    .map(
      (s) => `
      <div class="stat">
        <div class="stat-value">${esc(s.value)}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`
    )
    .join("");

  const radarRows = c.about.radar
    .map(
      (r) => `
      <tr>
        <td class="num letter">${esc(r.letter)}</td>
        <td>${esc(r.word)}</td>
      </tr>`
    )
    .join("");

  const aboutParas = c.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");

  const formatCards = c.format.parts
    .map(
      (p) => `
      <div class="card">
        <div class="card-tag">${esc(p.tag)}</div>
        <div class="card-title">${esc(p.number)}. ${esc(p.title)}</div>
        <p>${esc(p.desc)}</p>
        <ul>
          ${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");

  const moduleRows = c.modules.items
    .map(
      (m) => `
      <tr>
        <td class="num">${esc(m.number)}</td>
        <td><strong>${esc(m.title)}.</strong> ${esc(m.desc)}</td>
      </tr>`
    )
    .join("");

  const audienceCards = c.audience.items
    .map(
      (a) => `
      <div class="audience-card">
        <div class="num">${esc(a.number)}</div>
        <div class="card-title">${esc(a.title)}</div>
        <p>${esc(a.desc)}</p>
      </div>`
    )
    .join("");

  const teamBlocks = c.team.members
    .map(
      (m) => `
      <div class="expert">
        <div class="expert-top">
          <div class="avatar">${esc(m.initials)}</div>
          <div>
            <div class="expert-name">${esc(m.name)}</div>
            <div class="role">${esc(m.role)}</div>
          </div>
        </div>
        <ul>
          ${m.points.map((p) => `<li>${esc(p)}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");

  const partnerRows = c.offer.partners
    .map(
      (p, i) => `
      <tr>
        <td class="num">${String(i + 1).padStart(2, "0")}</td>
        <td>${esc(p)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<title>${esc(c.brand)} — корпоративный обзор</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: #0a0b0d; color: #c7ccd4;
    font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 9.4pt; line-height: 1.45;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  h1, h2, .card-title, .expert-name, .stat-value, .brand-word {
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.01em;
    color: #fff; margin: 0;
  }
  h1 { font-size: 28pt; line-height: 1.05; }
  h2 { font-size: 16pt; line-height: 1.15; margin: 0 0 6px; }
  p { margin: 0 0 6px; }
  strong { font-weight: 600; color: #f4f6f9; }
  ul { margin: 4px 0 0; padding-left: 14px; }
  li { margin: 0 0 2px; }

  .sheet {
    width: 210mm;
    height: 297mm;
    padding: 15mm 15mm 13mm;
    overflow: hidden;
    page-break-after: always;
    position: relative;
    background:
      radial-gradient(ellipse at 12% 0%, rgba(225,6,0,0.18), transparent 42%),
      radial-gradient(ellipse at 100% 100%, rgba(225,6,0,0.08), transparent 40%),
      #0a0b0d;
  }
  .sheet:last-child { page-break-after: auto; }
  .sheet-inner { width: 180mm; position: relative; z-index: 1; }

  .track {
    position: absolute; left: 0; right: 0; bottom: 18mm; height: 3px;
    background-image: repeating-linear-gradient(
      90deg, #e10600 0, #e10600 14px, transparent 14px, transparent 28px
    );
    opacity: 0.55;
  }

  .sheet.cover {
    padding: 20mm 15mm 16mm;
  }
  .sheet.cover .sheet-inner {
    height: 261mm;
    display: flex;
    flex-direction: column;
  }
  .sheet.cover h1 { margin: 0 0 8mm; }
  .sheet.cover h1 .accent { color: #e10600; }
  .sheet.cover p { color: #c7ccd4; margin: 0 0 3.5mm; }
  .cover-bottom { margin-top: auto; }

  .brand {
    display: flex; align-items: center; gap: 10px;
    margin: 0 0 16mm;
  }
  .brand-mark {
    width: 28px; height: 28px; border-radius: 4px;
    background: #e10600; color: #fff;
    display: grid; place-items: center;
  }
  .brand-word {
    font-size: 14pt; letter-spacing: 0.04em;
  }
  .brand-word span { color: #e10600; }

  .eyebrow {
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 8pt; letter-spacing: 0.22em; text-transform: uppercase;
    color: #e10600; margin: 0 0 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .eyebrow::before {
    content: ""; width: 18px; height: 2px; background: #e10600;
  }
  .lead { color: #8b9099; margin: 0 0 8px; }

  .stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
    margin: 10mm 0 0;
  }
  .stat {
    border: 1px solid #24272e;
    background: rgba(22,24,29,0.85);
    padding: 10px 12px;
  }
  .stat-value { font-size: 20pt; color: #fff; line-height: 1; margin-bottom: 4px; }
  .stat-label { font-size: 7.5pt; color: #8b9099; line-height: 1.35; }

  .cover-meta {
    margin-top: 12mm;
    font-size: 8pt; line-height: 1.7; color: #8b9099;
  }
  .note {
    margin-top: 8mm;
    border: 1px solid rgba(225,6,0,0.45);
    background: rgba(225,6,0,0.08);
    padding: 8px 10px; color: #c7ccd4; font-size: 8.3pt; line-height: 1.45;
  }

  .block { margin: 0 0 8mm; }
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

  table.list { width: 100%; border-collapse: collapse; margin: 2px 0 0; }
  table.list td {
    vertical-align: top; padding: 7px 0;
    border-bottom: 1px solid #24272e;
  }
  table.list tr:last-child td { border-bottom: none; }
  td.num {
    width: 12mm; padding-right: 3mm;
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 10pt; letter-spacing: 0.04em; color: #e10600; white-space: nowrap;
  }
  td.letter { font-size: 14pt; width: 10mm; }

  .card {
    border: 1px solid #24272e;
    background: #16181d;
    padding: 10px 12px; margin: 0 0 6px;
  }
  .card-tag {
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 7.5pt; letter-spacing: 0.16em; text-transform: uppercase;
    color: #e10600; margin: 0 0 4px;
  }
  .card-title { font-size: 11.5pt; margin: 0 0 4px; }
  .card p { color: #c7ccd4; }
  .card li { color: #8b9099; font-size: 8.5pt; }

  .audience-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px;
  }
  .audience-card {
    border: 1px solid #24272e; background: #16181d; padding: 10px 12px;
  }
  .audience-card .num {
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 16pt; color: #e10600; letter-spacing: 0.02em;
  }
  .audience-card .card-title { font-size: 11pt; margin: 4px 0; }
  .audience-card p { color: #8b9099; margin: 0; font-size: 8.5pt; }

  .expert {
    border: 1px solid #24272e; background: #16181d;
    padding: 10px 12px; margin: 0 0 6px;
  }
  .expert-top { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 4px; }
  .avatar {
    width: 36px; height: 36px; border-radius: 8px; flex: none;
    background: linear-gradient(135deg, #e10600, #b00500);
    color: #fff; display: grid; place-items: center;
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 11pt; font-weight: 700;
  }
  .expert-name { font-size: 12pt; margin: 0 0 2px; }
  .role { color: #8b9099; font-size: 8.5pt; margin: 0; }
  .expert li { color: #c7ccd4; font-size: 8.3pt; }

  .mission {
    border-left: 3px solid #e10600;
    padding: 6px 0 6px 10px;
    color: #c7ccd4; margin: 0 0 8px;
  }

  .contact-box {
    background: linear-gradient(180deg, #16181d, #111317);
    border: 1px solid #24272e;
    border-top: 2px solid #e10600;
    padding: 12px 14px; margin-top: 6mm;
  }
  .contact-box h2 { margin-bottom: 6px; }
  .contact-box p { color: #8b9099; }
  .contact-box a { color: #e10600; text-decoration: none; }
  .contact-row {
    font-family: "Oswald", "Arial Narrow", sans-serif;
    font-size: 9pt; letter-spacing: 0.04em; text-transform: uppercase;
    color: #f4f6f9; margin: 5px 0 0 !important;
  }
  .footer-line {
    margin-top: 7mm; padding-top: 6px;
    border-top: 1px solid #24272e;
    font-size: 7.5pt; color: #8b9099;
  }
</style>
</head>
<body>

<section class="sheet cover">
  <div class="sheet-inner">
    <div class="brand">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 12 L18 8" stroke-linecap="round"></path>
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"></circle>
        </svg>
      </span>
      <span class="brand-word">RADAR<span> RACES</span></span>
    </div>
    <h1>РазГОНИ свой<br/><span class="accent">управленческий радар</span></h1>
    <p>${esc(c.hero.subheadline)}</p>
    <p>${esc(c.hero.body)}</p>
    <div class="stats">${stats}</div>
    <div class="cover-bottom">
      <div class="cover-meta">
        ${esc(c.tagline)}<br/>
        Сайт: ${esc(c.contact.site)}<br/>
        Почта: ${esc(c.contact.email)} · Telegram: ${esc(c.contact.telegram)}
      </div>
      <div class="note">
        Документ для корпоративной рассылки. Полная информация с сайта races.radarexec.ru —
        для случаев, когда сеть ограничивает доступ к сайту.
      </div>
    </div>
  </div>
  <div class="track"></div>
</section>

<section class="sheet">
  <div class="sheet-inner">
    <div class="block">
      <div class="eyebrow">${esc(c.about.label)}</div>
      <h2>${esc(c.about.headline)}</h2>
      ${aboutParas}
    </div>
    <div class="block">
      <div class="eyebrow">Расшифровка РАДАР</div>
      <h2>Пять осей управленческого заезда</h2>
      <table class="list">${radarRows}</table>
    </div>
    <div class="block">
      <div class="eyebrow">${esc(c.audience.label)}</div>
      <h2>${esc(c.audience.headline)}</h2>
      <p class="lead">${esc(c.audience.intro)}</p>
      <div class="audience-grid">${audienceCards}</div>
    </div>
  </div>
</section>

<section class="sheet">
  <div class="sheet-inner">
    <div class="eyebrow">${esc(c.format.label)}</div>
    <h2>${esc(c.format.headline)}</h2>
    <p class="lead">${esc(c.format.intro)}</p>
    <div class="split">${formatCards}</div>
  </div>
</section>

<section class="sheet">
  <div class="sheet-inner">
    <div class="eyebrow">${esc(c.modules.label)}</div>
    <h2>${esc(c.modules.headline)}</h2>
    <p class="lead">${esc(c.modules.intro)}</p>
    <table class="list">${moduleRows}</table>
  </div>
</section>

<section class="sheet">
  <div class="sheet-inner">
    <div class="block">
      <div class="eyebrow">${esc(c.team.label)}</div>
      <h2>${esc(c.team.headline)}</h2>
      <p class="mission">${esc(c.team.mission)}</p>
      ${teamBlocks}
    </div>
  </div>
</section>

<section class="sheet">
  <div class="sheet-inner">
    <div class="eyebrow">${esc(c.offer.label)}</div>
    <h2>${esc(c.offer.headline)}</h2>
    <p class="lead">${esc(c.offer.intro)}</p>
    <div class="card" style="margin-bottom:8px;">
      <div class="card-tag">Ключевой актив</div>
      <p style="margin:0;color:#f4f6f9;">${esc(c.offer.asset)}</p>
    </div>
    <div class="block">
      <div class="eyebrow">${esc(c.offer.partnersTitle)}</div>
      <table class="list">${partnerRows}</table>
    </div>
    <p>${esc(c.offer.included)}</p>
    <p class="lead">${esc(c.offer.note)}</p>

    <div class="contact-box">
      <h2>${esc(c.contact.headline)}</h2>
      <p>${esc(c.contact.body)}</p>
      <p class="contact-row">Email: <a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a></p>
      <p class="contact-row">Telegram: ${esc(c.contact.telegram)}</p>
      <p class="contact-row">Сайт: ${esc(c.contact.site)}</p>
    </div>
    <p class="footer-line">
      ${esc(c.brand)} · Experiential Learning для руководителей и топ-команд ·
      Документ для офлайн-рассылки · © Kamensky Racing School
    </p>
  </div>
  <div class="track"></div>
</section>

</body>
</html>`;
}

async function main() {
  const html = buildHtml(content);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_HTML, html, "utf8");

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: findChrome(),
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=medium"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(OUT_HTML).href, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.pdf({
      path: OUT_PDF,
      width: "210mm",
      height: "297mm",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
  } finally {
    await browser.close();
  }

  const stats = statSync(OUT_PDF);
  console.log(`[pdf] Ready: ${OUT_PDF} (${Math.round(stats.size / 1024)} KB)`);
  console.log(`[pdf] HTML preview: ${OUT_HTML}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
