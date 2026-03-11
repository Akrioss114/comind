# AI Bot Setup

В проект добавлены:

- `backend/server.mjs` — серверный API для приёма ответов, отправки в Bitrix24 и письма клиенту.
- `backend/.env.example` — пример переменных окружения.
- `backend/.env` — локальная конфигурация, уже заполненная для `comind.space` и вашего Bitrix24.
- `site_src/public/ai-diagnostic-widget.js` — готовый виджет для встраивания в Tilda.
- `site_src/public/tilda-ai-bot-snippet.html` — минимальный код вставки.
- `site_src/public/tilda-ai-bot-inline.html` — готовый inline-код для блока `T123`, если не хотите отдельно хостить JS.

## 1. Запуск API

Скопируйте пример:

```powershell
Copy-Item backend/.env.example backend/.env
```

Для вашего проекта уже подготовлен `backend/.env`.

Сейчас в нём уже выставлены:

- `BITRIX_WEBHOOK_BASE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `PUBLIC_SITE_URL=https://comind.space/`
- `ALLOWED_ORIGINS=https://comind.space,https://www.comind.space`

При необходимости позже можно добавить:

- `BITRIX_ASSIGNED_BY_ID`
- custom field коды Bitrix24
- `RESEND_API_KEY`, если захотите уйти с SMTP на Resend

Запуск:

```powershell
$env:PORT=8787
Get-Content backend/.env | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  $name, $value = $_ -split '=', 2
  [Environment]::SetEnvironmentVariable($name, $value)
}
node backend/server.mjs
```

Проверка:

```powershell
Invoke-RestMethod http://localhost:8787/api/health
```

## 2. Публикация виджета

Виджет лежит в:

- `site_src/public/ai-diagnostic-widget.js`

Его можно:

- собрать через `vite`, тогда файл попадёт в `site_src/build/ai-diagnostic-widget.js`
- или разместить как статический файл на любом домене/CDN

Сборка:

```powershell
cd site_src
npm run build
```

## 3. Вставка в Tilda

В блок `T123` можно вставить один из двух вариантов:

- `site_src/public/tilda-ai-bot-inline.html`
- `site_src/public/tilda-ai-bot-snippet.html`

Разница:

- `tilda-ai-bot-inline.html` — всё встроено в один HTML, удобно для Tilda
- `tilda-ai-bot-snippet.html` — короткий loader, но нужен опубликованный `ai-diagnostic-widget.js`

Сейчас в snippet уже подставлены значения под `comind.space`.

Важно:

- в этих файлах стоит предположение, что backend будет доступен по `https://api.comind.space`
- если API будет на другом домене, замените только `apiBase`

## 4. Что приходит в Bitrix24

По умолчанию создаётся лид со стандартными полями:

- `TITLE`
- `NAME`
- `PHONE`
- `EMAIL`
- `COMMENTS`

Если укажете custom field коды в `.env`, бот дополнительно запишет:

- score
- level
- summary
- goal
- industry

## 5. Что получает клиент

На email уходит:

- итоговый процент готовности
- краткий вывод
- быстрые кейсы внедрения
- рекомендуемые следующие шаги

Если email или Bitrix не настроены, виджет всё равно покажет результат в чате.
