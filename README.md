# RADAR Experience

Корпоративные приключения и экстремальные выезды под ключ.  
Премиальный уровень — с управленческим наблюдением и разбором.

## Стек

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4
- GitHub Pages + Actions

## Локально

```bash
npm install
npm run dev
```

## Контент (RU)

Основной текст новой версии: `lib/experience-content.ts`.

Флаг публикации Алтая: `SHOW_ALTAI` (по умолчанию `false`).

Старые `SITE-COPY.md` / EN пока сохранены как архив Races — не являются источником Experience.

## Форма заявок

Задайте endpoint:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxx
```

Без endpoint форма покажет сообщение о необходимости конфигурации (mailto не используется как основной канал).

## Домен

Публичный домен: `experience.radarexec.ru` (`public/CNAME`).

Это отдельный репозиторий от `RADAR-RACES` / `races.radarexec.ru` — без переноса и без редиректов.

Инструкция по DNS: `docs/MIGRATION.md`.  
Открытые вопросы владельцу: `docs/OWNER-QUESTIONS.md`.

## Деплой

Push в `main` → GitHub Actions → Pages.

Settings → Pages:

| Параметр | Значение |
|----------|----------|
| Source | GitHub Actions |
| Custom domain | experience.radarexec.ru |
| Enforce HTTPS | включено |
