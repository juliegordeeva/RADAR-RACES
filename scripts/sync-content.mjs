#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return readFileSync(path.join(ROOT, file), "utf8");
}

function write(file, data) {
  writeFileSync(path.join(ROOT, file), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function splitSections(markdown) {
  const parts = markdown.split(/\n(?=## )/);
  const map = new Map();
  for (const part of parts) {
    const match = part.match(/^## (.+?)(?:\n|$)/);
    if (!match) continue;
    map.set(match[1].trim(), part.slice(match[0].length).trim());
  }
  return map;
}

function sectionByPrefix(sections, prefix) {
  for (const [key, value] of sections) {
    if (key.startsWith(prefix)) return value;
  }
  return "";
}

function field(body, label) {
  const re = new RegExp(
    `\\*\\*${escapeRegExp(label)}:\\*\\*\\s*\\n?([\\s\\S]*?)(?=\\n\\*\\*|\\n### |\\n---|$)`,
    "i"
  );
  const match = body.match(re);
  if (!match) return "";
  return match[1].trim().replace(/\n{3,}/g, "\n\n");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function bulletList(body, label) {
  const block = field(body, label);
  if (!block) return [];
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function numberedList(body, label) {
  const block = field(body, label);
  if (!block) return [];
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s/.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, ""));
}

function splitSubsections(body) {
  const parts = body.split(/\n(?=### )/);
  const map = new Map();
  for (const part of parts) {
    const match = part.match(/^### (.+?)(?:\n|$)/);
    if (!match) continue;
    map.set(match[1].trim(), part.slice(match[0].length).trim());
  }
  return map;
}

function parseStats(body) {
  return bulletList(body, "Статистика").concat(bulletList(body, "Stats")).map((line) => {
    const [value, ...rest] = line.split("|");
    return {
      value: value.trim(),
      label: rest.join("|").trim(),
    };
  });
}

function parseRadar(body) {
  return bulletList(body, "Расшифровка РАДАР")
    .concat(bulletList(body, "RADAR breakdown"))
    .map((line) => {
      const [letter, ...rest] = line.split("—");
      if (rest.length === 0) {
        const [ltr, ...words] = line.split(" - ");
        return { letter: ltr.trim(), word: words.join(" - ").trim() };
      }
      return { letter: letter.trim(), word: rest.join("—").trim() };
    });
}

function parseFormatParts(body) {
  const subs = splitSubsections(field(body, "Части") || field(body, "Parts") || body);
  const parts = [];
  for (const [, partBody] of subs) {
    parts.push({
      tag: field(partBody, "Метка") || field(partBody, "Tag"),
      title: field(partBody, "Заголовок") || field(partBody, "Title"),
      desc: field(partBody, "Описание") || field(partBody, "Description"),
      bullets: bulletList(partBody, "Список").concat(bulletList(partBody, "List")),
    });
  }
  return parts;
}

function parseModules(body) {
  const subs = splitSubsections(field(body, "Модули") || field(body, "Modules") || body);
  const list = [];
  for (const [title, partBody] of subs) {
    const nMatch = title.match(/(\d{2})/);
    list.push({
      n: nMatch ? nMatch[1] : String(list.length + 1).padStart(2, "0"),
      title: field(partBody, "Название") || field(partBody, "Title") || title,
      desc: field(partBody, "Описание") || field(partBody, "Description"),
    });
  }
  return list;
}

function parseAudience(body) {
  const subs = splitSubsections(field(body, "Аудитория") || field(body, "Audience") || body);
  const list = [];
  for (const [, partBody] of subs) {
    list.push({
      title: field(partBody, "Заголовок") || field(partBody, "Title"),
      desc: field(partBody, "Описание") || field(partBody, "Description"),
    });
  }
  return list;
}

function parseSpeaker(body) {
  const experience = bulletList(body, "Опыт").concat(bulletList(body, "Experience"));
  const bio = experience.length
    ? experience
    : numberedList(body, "Биография").concat(numberedList(body, "Bio"));

  return {
    tag: field(body, "Метка секции") || field(body, "Section label"),
    title: field(body, "Заголовок") || field(body, "Title"),
    name: field(body, "Имя") || field(body, "Name"),
    role: field(body, "Роль") || field(body, "Role"),
    bio,
    mission: field(body, "Миссия") || field(body, "Mission"),
    producerName:
      field(body, "Главный партнер по скорости принятия решений и управлению реакциями") ||
      field(body, "Lead partner for decision speed and reaction management") ||
      field(body, "Продюсер") ||
      field(body, "Producer"),
    producerRole:
      field(body, "Роль партнера") ||
      field(body, "Partner role") ||
      field(body, "Роль продюсера") ||
      field(body, "Producer role"),
  };
}

function parsePersons(body) {
  const subs = splitSubsections(field(body, "Контакты") || field(body, "Contacts") || body);
  const persons = [];
  for (const [, partBody] of subs) {
    const name = field(partBody, "Имя") || field(partBody, "Name");
    if (!name) continue;
    const rawEmail = field(partBody, "Email");
    const email = rawEmail.replace(/\[([^\]]+)\]\([^)]+\)/, "$1").trim();
    const person = {
      name,
      role: field(partBody, "Роль") || field(partBody, "Role"),
      email,
    };
    const phone = field(partBody, "Телефон") || field(partBody, "Phone");
    const tg = field(partBody, "Telegram") || field(partBody, "Тg");
    if (phone) person.phone = phone;
    if (tg) person.tg = tg.replace(/^@/, "");
    persons.push(person);
  }
  return persons;
}

function parseRu(sections) {
  const seo = sections.get("SEO") || "";
  const nav = sections.get("Навигация") || "";
  const hero = sections.get("01. Hero") || "";
  const about = sections.get("02. О проекте") || "";
  const format = sections.get("03. Формат") || "";
  const modules = sectionByPrefix(sections, "04.");
  const audience = sectionByPrefix(sections, "05.");
  const speaker = sectionByPrefix(sections, "06.");
  const gallery = sections.get("07. Галерея") || "";
  const pricing = sections.get("08. Стоимость") || "";
  const contacts = sections.get("09. Контакты") || "";
  const footer = sections.get("10. Подвал") || "";

  return {
    meta: {
      title: field(seo, "Title"),
      description: field(seo, "Description"),
    },
    nav: {
      about: field(nav, "О проекте"),
      format: field(nav, "Формат"),
      modules: field(nav, "Программа"),
      audience: field(nav, "Кому подходит"),
      speaker: field(nav, "Спикер"),
      contacts: field(nav, "Контакты"),
      cta: field(nav, "Кнопка в шапке"),
    },
    hero: {
      badge: field(hero, "Бейдж"),
      title: field(hero, "Заголовок"),
      titleAccent: field(hero, "Акцент заголовка"),
      subtitle: field(hero, "Подзаголовок"),
      lead: field(hero, "Дополнительный текст"),
      ctaPrimary: field(hero, "Кнопка primary"),
      ctaSecondary: field(hero, "Кнопка secondary"),
      stats: parseStats(hero),
    },
    about: {
      tag: field(about, "Метка секции"),
      title: field(about, "Заголовок"),
      paragraphs: numberedList(about, "Абзацы"),
      radar: parseRadar(about),
    },
    format: {
      tag: field(format, "Метка секции"),
      title: field(format, "Заголовок"),
      intro: field(format, "Подзаголовок"),
      parts: parseFormatParts(format),
    },
    modules: {
      tag: field(modules, "Метка секции"),
      title: field(modules, "Заголовок"),
      intro: field(modules, "Подзаголовок"),
      list: parseModules(modules),
    },
    audience: {
      tag: field(audience, "Метка секции"),
      title: field(audience, "Заголовок"),
      intro: field(audience, "Подзаголовок"),
      list: parseAudience(audience),
    },
    speaker: parseSpeaker(speaker),
    gallery: {
      tag: field(gallery, "Метка секции"),
      title: field(gallery, "Заголовок"),
      subtitle: field(gallery, "Подзаголовок"),
    },
    pricing: {
      tag: field(pricing, "Метка секции"),
      title: field(pricing, "Заголовок"),
      intro: field(pricing, "Подзаголовок"),
      note: field(pricing, "Примечание"),
    },
    contacts: {
      tag: field(contacts, "Метка секции"),
      title: field(contacts, "Заголовок"),
      intro: field(contacts, "Подзаголовок"),
      persons: parsePersons(contacts),
      form: {
        name: field(contacts, "Поле имя"),
        phone: field(contacts, "Поле телефон"),
        email: field(contacts, "Поле email"),
        message: field(contacts, "Поле сообщение"),
        submit: field(contacts, "Кнопка отправки"),
        success: field(contacts, "Сообщение после отправки"),
      },
    },
    footer: {
      rights: field(footer, "Правообладатель"),
      tagline: field(footer, "Слоган"),
    },
  };
}

function parseEn(sections) {
  const seo = sections.get("SEO") || "";
  const nav = sections.get("Navigation") || "";
  const hero = sections.get("01. Hero") || "";
  const about = sections.get("02. About") || "";
  const format = sections.get("03. Format") || "";
  const modules = sectionByPrefix(sections, "04.");
  const audience = sectionByPrefix(sections, "05.");
  const speaker = sectionByPrefix(sections, "06.");
  const gallery = sections.get("07. Gallery") || "";
  const pricing = sections.get("08. Pricing") || "";
  const contacts = sections.get("09. Contacts") || "";
  const footer = sections.get("10. Footer") || "";

  return {
    meta: {
      title: field(seo, "Title"),
      description: field(seo, "Description"),
    },
    nav: {
      about: field(nav, "About"),
      format: field(nav, "Format"),
      modules: field(nav, "Program"),
      audience: field(nav, "Who it's for"),
      speaker: field(nav, "Speaker"),
      contacts: field(nav, "Contacts"),
      cta: field(nav, "Header button"),
    },
    hero: {
      badge: field(hero, "Badge"),
      title: field(hero, "Title"),
      titleAccent: field(hero, "Title accent"),
      subtitle: field(hero, "Subtitle"),
      lead: field(hero, "Additional text"),
      ctaPrimary: field(hero, "Button primary"),
      ctaSecondary: field(hero, "Button secondary"),
      stats: parseStats(hero),
    },
    about: {
      tag: field(about, "Section label"),
      title: field(about, "Title"),
      paragraphs: numberedList(about, "Paragraphs"),
      radar: parseRadar(about),
    },
    format: {
      tag: field(format, "Section label"),
      title: field(format, "Title"),
      intro: field(format, "Subtitle"),
      parts: parseFormatParts(format),
    },
    modules: {
      tag: field(modules, "Section label"),
      title: field(modules, "Title"),
      intro: field(modules, "Subtitle"),
      list: parseModules(modules),
    },
    audience: {
      tag: field(audience, "Section label"),
      title: field(audience, "Title"),
      intro: field(audience, "Subtitle"),
      list: parseAudience(audience),
    },
    speaker: parseSpeaker(speaker),
    gallery: {
      tag: field(gallery, "Section label"),
      title: field(gallery, "Title"),
      subtitle: field(gallery, "Subtitle"),
    },
    pricing: {
      tag: field(pricing, "Section label"),
      title: field(pricing, "Title"),
      intro: field(pricing, "Subtitle"),
      note: field(pricing, "Note"),
    },
    contacts: {
      tag: field(contacts, "Section label"),
      title: field(contacts, "Title"),
      intro: field(contacts, "Subtitle"),
      persons: parsePersons(contacts),
      form: {
        name: field(contacts, "Field name"),
        phone: field(contacts, "Field phone"),
        email: field(contacts, "Field email"),
        message: field(contacts, "Field message"),
        submit: field(contacts, "Submit button"),
        success: field(contacts, "Success message"),
      },
    },
    footer: {
      rights: field(footer, "Rights"),
      tagline: field(footer, "Tagline"),
    },
  };
}

const ru = parseRu(splitSections(read("SITE-COPY.md")));
const en = parseEn(splitSections(read("SITE-COPY.en.md")));

write("lib/content.ru.json", ru);
write("lib/content.en.json", en);

console.log("[content:sync] Updated lib/content.ru.json and lib/content.en.json from SITE-COPY files");
