import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

loadDotEnv(path.join(process.cwd(), ".env"));
loadDotEnv(path.join(process.cwd(), "backend", ".env"));

const PORT = Number(process.env.PORT || 8787);
const ALLOWED_ORIGINS = parseOrigins(process.env.ALLOWED_ORIGINS || "*");
const BRAND_NAME = process.env.BRAND_NAME || "CoMind";
const BOOKING_URL = process.env.BOOKING_URL || "";
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || "";

const QUESTIONS = [
  { key: "company_name", type: "text" },
  { key: "industry", type: "options" },
  { key: "company_size", type: "options" },
  { key: "main_goal", type: "options" },
  { key: "data_infrastructure", type: "options" },
  { key: "team_readiness", type: "options" },
  { key: "process_maturity", type: "options" },
  { key: "budget", type: "options" },
  { key: "contact_name", type: "text" },
  { key: "work_email", type: "email" },
  { key: "contact_phone", type: "tel" },
];

const QUICK_WINS = {
  sales: [
    "AI-квалификация лидов и подсказки менеджерам прямо в CRM.",
    "Саммари звонков и follow-up письма без ручной рутины.",
    "Быстрый первичный ответ и реактивация старой базы.",
  ],
  support: [
    "AI-ассистент первой линии для FAQ и triage.",
    "Автосводки обращений и рекомендации оператору.",
    "Единая база знаний с быстрым поиском по регламентам.",
  ],
  operations: [
    "Разбор заявок и документов без ручной сортировки.",
    "Контроль SLA и обнаружение узких мест процесса.",
    "Автоматизация повторяющихся back-office операций.",
  ],
  analytics: [
    "AI-сводки по KPI и аномалиям.",
    "Ответы на управленческие вопросы по данным компании.",
    "Прогнозирование спроса, воронки или загрузки команд.",
  ],
  knowledge: [
    "Корпоративный AI-ассистент по документам и регламентам.",
    "Подготовка черновиков и ответов внутри команды.",
    "Поиск знаний по внутренним источникам в одном окне.",
  ],
  product: [
    "Анализ обратной связи и product discovery.",
    "Поддержка гипотез, экспериментов и UX-исследований.",
    "Пилотные AI-функции внутри продукта.",
  ],
};

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  var lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (var i = 0; i < lines.length; i += 1) {
    var line = lines[i].trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    var separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    var key = line.slice(0, separatorIndex).trim();
    var value = line.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const INDUSTRY_LABELS = {
  it: "IT и технологии",
  finance: "Финансы и банкинг",
  retail: "Ритейл и e-commerce",
  manufacturing: "Производство",
  healthcare: "Здравоохранение",
  services: "Профессиональные услуги",
  other: "Другая отрасль",
};

const SIZE_LABELS = {
  small: "до 50 сотрудников",
  medium: "50-200 сотрудников",
  large: "200-1000 сотрудников",
  enterprise: "более 1000 сотрудников",
};

function parseOrigins(value) {
  if (!value || value === "*") {
    return "*";
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveOrigin(origin) {
  if (ALLOWED_ORIGINS === "*") {
    return origin || "*";
  }

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }

  return ALLOWED_ORIGINS[0] || "null";
}

function setCorsHeaders(response, origin) {
  response.setHeader("Access-Control-Allow-Origin", resolveOrigin(origin));
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Pinggy-No-Screen");
  response.setHeader("Vary", "Origin");
}

function sendJson(response, statusCode, payload, origin) {
  setCorsHeaders(response, origin);
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}

function answerLabel(key, value) {
  const lookup = {
    industry: INDUSTRY_LABELS,
    company_size: SIZE_LABELS,
    main_goal: {
      sales: "Рост продаж и работа с лидами",
      support: "Поддержка клиентов и сервис",
      operations: "Автоматизация операций",
      analytics: "Аналитика и управленческие решения",
      knowledge: "Ускорение команды и поиск знаний",
      product: "Развитие продукта",
    },
    data_infrastructure: {
      structured: "Есть CRM/ERP/BI и структурированные данные",
      partial: "Часть данных в системах, часть в таблицах",
      none: "Данные разрознены, единой среды нет",
    },
    team_readiness: {
      ready: "Есть инициативная команда и опыт",
      learning: "Интерес высокий, но нужен менторинг",
      no_experience: "Опыта почти нет, хотим идти аккуратно",
    },
    process_maturity: {
      automated: "Процессы описаны, есть метрики и владельцы",
      documented: "Часть процессов описана и автоматизирована",
      chaotic: "Много ручной работы и хаотичных сценариев",
    },
    budget: {
      high: "Полноценный проект с быстрым запуском",
      medium: "Пилот с понятным бюджетом и KPI",
      low: "Очень осторожный старт с минимальными вложениями",
    },
  };

  return lookup[key]?.[value] || value || "";
}

function validateAnswers(answers) {
  const errors = [];

  for (const question of QUESTIONS) {
    if (!String(answers?.[question.key] || "").trim()) {
      errors.push(`Поле ${question.key} обязательно.`);
    }
  }

  if (answers?.work_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(answers.work_email).trim())) {
    errors.push("Email заполнен некорректно.");
  }

  if (answers?.contact_phone && String(answers.contact_phone).replace(/\D/g, "").length < 10) {
    errors.push("Телефон должен содержать минимум 10 цифр.");
  }

  return errors;
}

function localReport(answers) {
  const breakdown = [
    {
      category: "Данные и системы",
      score: answers.data_infrastructure === "structured" ? 25 : answers.data_infrastructure === "partial" ? 16 : 7,
      max: 25,
      comment:
        answers.data_infrastructure === "structured"
          ? "Есть база для быстрого пилота."
          : answers.data_infrastructure === "partial"
            ? "Нужны точечные интеграции и очистка источников."
            : "Лучше начать с наведения порядка в данных.",
    },
    {
      category: "Команда и adoption",
      score: answers.team_readiness === "ready" ? 22 : answers.team_readiness === "learning" ? 15 : 8,
      max: 22,
      comment:
        answers.team_readiness === "ready"
          ? "Команда быстро подхватит пилот."
          : answers.team_readiness === "learning"
            ? "Нужно сопровождение и обучение."
            : "Старт лучше делать через очень простой кейс.",
    },
    {
      category: "Процессы и управляемость",
      score: answers.process_maturity === "automated" ? 21 : answers.process_maturity === "documented" ? 15 : 8,
      max: 21,
      comment:
        answers.process_maturity === "automated"
          ? "Есть хороший фундамент для измеримого результата."
          : answers.process_maturity === "documented"
            ? "Перед пилотом важно уточнить владельцев и KPI."
            : "Сначала стоит описать текущий процесс.",
    },
    {
      category: "Потенциал эффекта",
      score: answers.main_goal === "sales" || answers.main_goal === "operations" ? 16 : 13,
      max: 16,
      comment: "Эта цель подходит для короткого пилота с заметным эффектом.",
    },
    {
      category: "Ресурсы на запуск",
      score: answers.budget === "high" ? 16 : answers.budget === "medium" ? 12 : 8,
      max: 16,
      comment: answers.budget === "low" ? "Лучше идти через очень узкий кейс." : "Есть пространство для пилота с контролируемым риском.",
    },
  ];

  const total = breakdown.reduce((sum, item) => sum + item.score, 0);
  const max = breakdown.reduce((sum, item) => sum + item.max, 0);
  const score = Math.round((total / max) * 100);

  if (score >= 80) {
    return {
      companyName: answers.company_name || "Не указано",
      industry: answers.industry || "other",
      score,
      level: "Высокая готовность",
      recommendation: "Компания выглядит готовой к быстрому пилоту и дальнейшему масштабированию AI-подхода.",
      breakdown,
    };
  }

  if (score >= 55) {
    return {
      companyName: answers.company_name || "Не указано",
      industry: answers.industry || "other",
      score,
      level: "Средняя готовность",
      recommendation: "Лучший путь сейчас — узкий пилот с KPI и параллельным усилением слабых мест.",
      breakdown,
    };
  }

  return {
    companyName: answers.company_name || "Не указано",
    industry: answers.industry || "other",
    score,
    level: "Начальная стадия",
    recommendation: "Сначала стоит выбрать один процесс, подготовить данные и только потом запускать пилот.",
    breakdown,
  };
}

function enrichReport(base, answers) {
  const risks = [];

  if (answers.data_infrastructure === "none") risks.push("Данные пока разрознены: нужен единый контур хотя бы для первого пилота.");
  if (answers.team_readiness === "no_experience") risks.push("Команде понадобится короткое обучение и сопровождение запуска.");
  if (answers.process_maturity === "chaotic") risks.push("Без описанного процесса сложнее доказать ROI и масштабировать внедрение.");
  if (answers.budget === "low") risks.push("При осторожном бюджете важно стартовать только с одного кейса.");
  if (!risks.length) risks.push("Критических блокеров не видно: можно быстро переходить к пилоту.");

  const nextSteps =
    base.score >= 80
      ? [
          "Провести короткий аудит данных, ограничений и безопасности.",
          "Выбрать 1-2 приоритетных кейса с владельцами и KPI.",
          "Запустить пилот и сразу подготовить сценарий масштабирования.",
        ]
      : base.score >= 55
        ? [
            "Сузить первый кейс до одного процесса с явным бизнес-эффектом.",
            "Подготовить данные и регламенты только под этот сценарий.",
            "Запустить тест на 4-6 недель и оценить ROI.",
          ]
        : [
            "Выбрать один самый дорогой ручной процесс.",
            "Собрать данные, роли и правила работы перед запуском.",
            "Начать с маленького кейса и короткого обучения команды.",
          ];

  const horizon =
    base.score >= 80
      ? "Первые измеримые результаты возможны через 4-8 недель."
      : base.score >= 55
        ? "Реалистичный горизонт первых результатов: 6-10 недель."
        : "Сначала нужен подготовительный цикл, затем пилот на узком кейсе.";

  return {
    ...base,
    summary: `${base.companyName} сейчас находится на уровне "${base.level}". Лучший старт для компании масштаба ${SIZE_LABELS[answers.company_size] || "без уточнённого размера"} — ${answerLabel("main_goal", answers.main_goal).toLowerCase()}. ${horizon}`,
    quickWins: (QUICK_WINS[answers.main_goal] || QUICK_WINS.operations).slice(0, 3),
    risks,
    nextSteps,
    goalLabel: answerLabel("main_goal", answers.main_goal),
    companySizeLabel: SIZE_LABELS[answers.company_size] || "размер не указан",
    leadStatus: base.score >= 80 ? "Готовы к пилоту" : base.score >= 55 ? "Хороший потенциал" : "Нужен подготовительный этап",
    horizon,
    generatedAt: new Date().toISOString(),
    contact: {
      name: answers.contact_name || "Не указано",
      email: answers.work_email || "Не указан",
      phone: answers.contact_phone || "Не указан",
    },
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(report) {
  const scoreColor = report.score >= 80 ? "#34d399" : report.score >= 55 ? "#fbbf24" : "#f87171";
  const cta = BOOKING_URL
    ? `<a href="${escapeHtml(BOOKING_URL)}" style="display:inline-block;padding:14px 24px;border-radius:12px;background:${scoreColor}20;border:1px solid ${scoreColor}55;color:${scoreColor};text-decoration:none;font-size:14px;">Обсудить результаты</a>`
    : "";

  const renderList = (items) => items.map((item) => `<li style="margin:0 0 8px 0;">${escapeHtml(item)}</li>`).join("");

  return `<!doctype html>
<html lang="ru">
  <body style="margin:0;padding:24px;background:#0a0b14;color:#f4f5fb;font-family:Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#111322;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;">
      <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#bca8ff;margin-bottom:12px;">${escapeHtml(BRAND_NAME)}</div>
      <h1 style="margin:0 0 12px;font-size:30px;line-height:1.1;">Мини-диагностика готовности к внедрению AI</h1>
      <p style="margin:0 0 24px;color:#cdd2eb;line-height:1.65;">${escapeHtml(report.summary)}</p>

      <div style="display:inline-block;padding:10px 16px;border-radius:999px;background:${scoreColor}18;color:${scoreColor};font-weight:700;margin-bottom:20px;">
        ${escapeHtml(report.level)}: ${report.score}%
      </div>

      <div style="margin-bottom:20px;padding:18px;border-radius:16px;background:#0c0d18;border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#8e96c7;margin-bottom:10px;">Быстрые возможности</div>
        <ul style="margin:0;padding-left:18px;color:#d7daf1;line-height:1.6;">${renderList(report.quickWins)}</ul>
      </div>

      <div style="margin-bottom:20px;padding:18px;border-radius:16px;background:#0c0d18;border:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#8e96c7;margin-bottom:10px;">Следующие шаги</div>
        <ul style="margin:0;padding-left:18px;color:#d7daf1;line-height:1.6;">${renderList(report.nextSteps)}</ul>
      </div>

      <p style="margin:0 0 24px;color:#cdd2eb;line-height:1.65;">${escapeHtml(report.recommendation)}</p>
      ${cta}
      <div style="margin-top:24px;font-size:12px;color:#8c92b0;">${escapeHtml(BRAND_NAME)}${PUBLIC_SITE_URL ? ` • ${escapeHtml(PUBLIC_SITE_URL)}` : ""}</div>
    </div>
  </body>
</html>`;
}

function buildBitrixComments(report, answers, metadata = {}) {
  const lines = [
    `AI-диагностика (${BRAND_NAME})`,
    `Компания: ${answers.company_name || ""}`,
    `Имя: ${answers.contact_name || ""}`,
    `Email: ${answers.work_email || ""}`,
    `Телефон: ${answers.contact_phone || ""}`,
    `Отрасль: ${answerLabel("industry", answers.industry)}`,
    `Размер компании: ${answerLabel("company_size", answers.company_size)}`,
    `Главный запрос: ${answerLabel("main_goal", answers.main_goal)}`,
    `Оценка готовности: ${report.score}% (${report.level})`,
    "",
    "Короткий вывод:",
    report.summary,
    "",
    "Быстрые кейсы:",
    ...report.quickWins.map((item) => `- ${item}`),
    "",
    "Риски:",
    ...report.risks.map((item) => `- ${item}`),
    "",
    "Следующие шаги:",
    ...report.nextSteps.map((item) => `- ${item}`),
  ];

  if (metadata.pageUrl) lines.push("", `Страница: ${metadata.pageUrl}`);
  if (metadata.referrer) lines.push(`Реферер: ${metadata.referrer}`);

  return lines.join("\n");
}

function appendFormValue(form, key, value) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => appendFormValue(form, `${key}[${index}]`, item));
    return;
  }

  if (typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      appendFormValue(form, `${key}[${childKey}]`, childValue);
    }
    return;
  }

  form.append(key, String(value));
}

async function pushToBitrix(report, answers, metadata) {
  const webhookBase = process.env.BITRIX_WEBHOOK_BASE;
  if (!webhookBase) {
    return { status: "skipped", message: "Bitrix webhook не настроен." };
  }

  const fields = {
    TITLE: `${BRAND_NAME}: AI-диагностика - ${answers.company_name}`,
    NAME: answers.contact_name,
    PHONE: [{ VALUE: answers.contact_phone, VALUE_TYPE: "WORK" }],
    EMAIL: [{ VALUE: answers.work_email, VALUE_TYPE: "WORK" }],
    COMMENTS: buildBitrixComments(report, answers, metadata),
    SOURCE_DESCRIPTION: `${BRAND_NAME} AI bot`,
    OPENED: "Y",
  };

  if (process.env.BITRIX_ASSIGNED_BY_ID) {
    fields.ASSIGNED_BY_ID = process.env.BITRIX_ASSIGNED_BY_ID;
  }

  if (process.env.BITRIX_FIELD_SCORE) {
    fields[process.env.BITRIX_FIELD_SCORE] = String(report.score);
  }
  if (process.env.BITRIX_FIELD_LEVEL) {
    fields[process.env.BITRIX_FIELD_LEVEL] = report.level;
  }
  if (process.env.BITRIX_FIELD_SUMMARY) {
    fields[process.env.BITRIX_FIELD_SUMMARY] = report.summary;
  }
  if (process.env.BITRIX_FIELD_GOAL) {
    fields[process.env.BITRIX_FIELD_GOAL] = report.goalLabel;
  }
  if (process.env.BITRIX_FIELD_INDUSTRY) {
    fields[process.env.BITRIX_FIELD_INDUSTRY] = INDUSTRY_LABELS[report.industry] || report.industry;
  }

  const body = new URLSearchParams();
  appendFormValue(body, "fields", fields);

  try {
    const response = await fetch(`${webhookBase.replace(/\/$/, "")}/crm.lead.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.error) {
      return {
        status: "failed",
        message: data.error_description || data.error || `Bitrix HTTP ${response.status}`,
      };
    }

    return {
      status: "sent",
      message: `Лид создан в Bitrix24 (#${data.result}).`,
      id: data.result,
    };
  } catch (error) {
    return {
      status: "failed",
      message: error instanceof Error ? error.message : "Не удалось отправить данные в Bitrix24.",
    };
  }
}

async function sendClientEmail(report, answers) {
  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  const payload = {
    from: emailFrom,
    to: [answers.work_email],
    subject: `Результат AI-диагностики: ${report.companyName} - ${report.score}%`,
    html: buildEmailHtml(report),
  };

  if (apiKey && emailFrom) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          status: "failed",
          message: data.message || `Resend HTTP ${response.status}`,
        };
      }

      return {
        status: "sent",
        message: `Отчёт отправлен на ${answers.work_email}.`,
        id: data.id,
      };
    } catch (error) {
      return {
        status: "failed",
        message: error instanceof Error ? error.message : "Не удалось отправить email через Resend.",
      };
    }
  }

  if (smtpUser && smtpPassword) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.yandex.ru",
        port: Number(process.env.SMTP_PORT || 465),
        secure: String(process.env.SMTP_SECURE || "true") !== "false",
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

      const info = await transporter.sendMail({
        from: emailFrom || smtpUser,
        to: answers.work_email,
        subject: payload.subject,
        html: payload.html,
      });

      return {
        status: "sent",
        message: `Отчёт отправлен на ${answers.work_email}.`,
        id: info.messageId,
      };
    } catch (error) {
      return {
        status: "failed",
        message: error instanceof Error ? error.message : "Не удалось отправить email через SMTP.",
      };
    }
  }

  return { status: "skipped", message: "Почтовый сервис не настроен." };
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;

  if (request.method === "OPTIONS") {
    setCorsHeaders(response, origin);
    response.writeHead(204);
    response.end();
    return;
  }

  const url = new URL(request.url || "/", `http://${request.headers.host || `localhost:${PORT}`}`);

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, service: "ai-diagnostic-bot" }, origin);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/diagnostic/complete") {
    try {
      const payload = await readJson(request);
      const answers = payload.answers || {};
      const metadata = payload.metadata || {};
      const validationErrors = validateAnswers(answers);

      if (validationErrors.length) {
        sendJson(response, 400, { error: "validation_error", details: validationErrors }, origin);
        return;
      }

      const report = enrichReport(localReport(answers), answers);
      const [bitrix, email] = await Promise.all([pushToBitrix(report, answers, metadata), sendClientEmail(report, answers)]);

      sendJson(
        response,
        200,
        {
          ok: true,
          report,
          delivery: { bitrix, email },
          sessionId: payload.sessionId || crypto.randomUUID(),
        },
        origin,
      );
      return;
    } catch (error) {
      sendJson(
        response,
        500,
        {
          error: "internal_error",
          message: error instanceof Error ? error.message : "Неизвестная ошибка сервера.",
        },
        origin,
      );
      return;
    }
  }

  sendJson(response, 404, { error: "not_found" }, origin);
});

server.listen(PORT, () => {
  console.log(`[ai-bot] listening on http://localhost:${PORT}`);
});
