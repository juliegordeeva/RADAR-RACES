# Миграция races.radarexec.ru → experience.radarexec.ru

## Что сделано в коде

- `public/CNAME` = `experience.radarexec.ru`
- Canonical / Open Graph / sitemap / robots указывают на новый домен
- Старые якоря Races больше не существуют как структура сайта

## Что нельзя сделать только кодом на GitHub Pages

Полноценные **HTTP 301** с сохранением path и UTM GitHub Pages не настраивает гибко.
Нужен DNS-доступ и, предпочтительно, Cloudflare (или аналог) перед Pages.

## DNS / хостинг — инструкция владельцу

1. Создать DNS-запись для `experience.radarexec.ru`:
   - тип `CNAME` → `juliegordeeva.github.io` (или A/AAAA по инструкции GitHub Pages).
2. В репозитории GitHub → Settings → Pages:
   - Source: **GitHub Actions**
   - Custom domain: `experience.radarexec.ru`
   - Enforce HTTPS: включить после проверки DNS.
3. Для старого `races.radarexec.ru`:
   - вариант A (рекомендуется): Cloudflare Page Rule / Redirect Rule  
     `races.radarexec.ru/*` → `https://experience.radarexec.ru/$1` (301), сохранить query string (UTM).
   - вариант B: оставить races на том же Pages и поставить временную HTML-страницу с meta-refresh (хуже для SEO).

## Таблица редиректов

| Старый URL | Новый URL | Статус в коде |
|---|---|---|
| `races.radarexec.ru/` | `experience.radarexec.ru/` | нужен DNS/CF 301 |
| `/#about` | `/about/` | нужен CF/edge или ручная карта |
| `/#format` | `/formats/` | то же |
| `/#modules` | `/formats/` | то же |
| `/#audience` | `/about/` | то же |
| `/#team` | `/about/` | то же |
| `/#pricing` | `/contact/` | то же |
| `/#contacts` | `/contact/` | то же |
| `/consent.html` | `/personal-data-consent/` | файл ещё лежит в `public/` (совместимость); React-страница — канон |
| `/privacy-policy.html` | `/privacy-policy/` | то же |
| `/radar-races-overview.pdf` | убрать из навигации; файл пока в `public/` | решить: удалить или заменить |

## После переключения

- Проверить HTTPS на новом домене
- Проверить, что races → experience отдаёт 301
- Обновить ссылки с Bureau / Gordeeva / других проектов RADAR
- Не удалять races DNS до проверки редиректов и аналитики
