# RADAR RACES

Лендинг управленческого интенсива **«РазГОНИ свой управленческий радар»** — развитие лидерских навыков топ-менеджеров через опыт автогонок и стратегические сессии (программа уровня Executive MBA, Московская Бизнес Академия).

## Технологии

- [Next.js 16](https://nextjs.org/) (App Router, статический экспорт)
- React 19 + TypeScript
- Tailwind CSS v4
- Двуязычный интерфейс (RU / EN)

## Как изменить текст сайта

Весь текст правится в удобных markdown-файлах — как в соседнем проекте RADAR EXEC:

| Файл | Язык |
|------|------|
| **`SITE-COPY.md`** | Русский |
| **`SITE-COPY.en.md`** | Английский |

Откройте файл, измените текст в нужной секции (`## 01. Hero`, `## 02. О проекте` и т.д.) и сохраните.

После правок запустите `npm run dev` или `npm run build` — текст подтянется автоматически.  
Или вручную: `npm run content:sync`.

> Не меняйте заголовки секций вида `## 01. Hero` — они нужны для загрузки на сайт.

## Локальная разработка

```bash
npm install
npm run dev      # http://localhost:3000
```

## Сборка

```bash
npm run build    # статический экспорт в папку out/
```

## Скриншоты перед выкладкой (Google Chrome)

Перед публикацией на GitHub можно снять превью всех секций сайта через установленный **Google Chrome**:

```bash
npm run screenshots        # сборка + скриншоты RU/EN в screenshots/
npm run screenshots:fast     # только скриншоты, если out/ уже собран
```

Скрипт:
1. Собирает статический сайт (`out/`)
2. Поднимает локальный сервер с тем же `basePath`, что и на GitHub Pages (`/RADAR-RACES/`)
3. Открывает сайт в Google Chrome (headless) и сохраняет PNG:
   - `screenshots/ru/` и `screenshots/en/` — hero, about, format, modules, audience, speaker, pricing, contacts
   - `00-full-page.png` — полная страница

Если Chrome установлен не в стандартное место, укажите путь:

```bash
CHROME_PATH="/path/to/Google Chrome" npm run screenshots
```

Перед ручным деплоем можно запустить `npm run predeploy` — это то же самое, что `npm run screenshots`.

## Деплой

Сайт автоматически публикуется на **GitHub Pages** при push в ветку `main`
через GitHub Actions (`.github/workflows/deploy.yml`).

Адрес: https://juliegordeeva.github.io/RADAR-RACES/

## Структура

- `app/` — корневой layout и страница
- `components/` — секции лендинга (Hero, About, Format, Modules, Audience, Speaker, Gallery, Pricing, Contacts, Footer)
- `SITE-COPY.md` / `SITE-COPY.en.md` — весь текст сайта для правки
- `lib/content.ru.json` / `lib/content.en.json` — генерируются из SITE-COPY (не редактировать вручную)
- `lib/` — типы, провайдер i18n, хелпер путей
- `public/media/` — фото и видео
