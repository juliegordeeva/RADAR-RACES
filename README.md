# RADAR RACES

Лендинг управленческого интенсива **«РазГОНИ свой управленческий радар»** — развитие лидерских навыков топ-менеджеров через опыт автогонок и стратегические сессии (программа уровня Executive MBA, Московская Бизнес Академия).

## Технологии

- [Next.js 16](https://nextjs.org/) (App Router, статический экспорт)
- React 19 + TypeScript
- Tailwind CSS v4
- Двуязычный интерфейс (RU / EN)

## Локальная разработка

```bash
npm install
npm run dev      # http://localhost:3000
```

## Сборка

```bash
npm run build    # статический экспорт в папку out/
```

## Деплой

Сайт автоматически публикуется на **GitHub Pages** при push в ветку `main`
через GitHub Actions (`.github/workflows/deploy.yml`).

Адрес: https://juliegordeeva.github.io/RADAR-RACES/

## Структура

- `app/` — корневой layout и страница
- `components/` — секции лендинга (Hero, About, Format, Modules, Audience, Speaker, Gallery, Pricing, Contacts, Footer)
- `lib/` — контент (RU/EN), провайдер i18n, хелпер путей
- `public/media/` — фото и видео
