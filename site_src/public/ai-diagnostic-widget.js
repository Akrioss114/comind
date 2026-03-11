(function () {
  if (window.AIDiagnosticWidgetLoaded) {
    return;
  }
  window.AIDiagnosticWidgetLoaded = true;

  var DEFAULT_CONFIG = {
    apiBase: "",
    brandName: "CoMind",
    title: "AI-диагностика",
    subtitle: "Соберём запрос и пришлём мини-отчёт",
    accent: "#7c3aed",
    position: "right",
    bookingUrl: "",
  };

  var QUESTIONS = [
    { key: "company_name", text: "Как называется ваша компания?", type: "text", placeholder: "Например, Acme Tech" },
    {
      key: "industry",
      text: "В какой отрасли вы работаете?",
      type: "options",
      options: [
        { label: "IT и технологии", value: "it" },
        { label: "Финансы и банкинг", value: "finance" },
        { label: "Ритейл и e-commerce", value: "retail" },
        { label: "Производство", value: "manufacturing" },
        { label: "Здравоохранение", value: "healthcare" },
        { label: "Профессиональные услуги", value: "services" },
        { label: "Другое", value: "other" },
      ],
    },
    {
      key: "company_size",
      text: "Сколько сотрудников в компании?",
      type: "options",
      options: [
        { label: "До 50", value: "small" },
        { label: "50-200", value: "medium" },
        { label: "200-1000", value: "large" },
        { label: "Более 1000", value: "enterprise" },
      ],
    },
    {
      key: "main_goal",
      text: "Какой эффект от AI для вас сейчас важнее всего?",
      type: "options",
      options: [
        { label: "Рост продаж и работа с лидами", value: "sales" },
        { label: "Поддержка клиентов и сервис", value: "support" },
        { label: "Автоматизация операций", value: "operations" },
        { label: "Аналитика и управленческие решения", value: "analytics" },
        { label: "Ускорение команды и поиск знаний", value: "knowledge" },
        { label: "Развитие продукта", value: "product" },
      ],
    },
    {
      key: "data_infrastructure",
      text: "Насколько у вас готовы данные и системы для внедрения AI?",
      type: "options",
      options: [
        { label: "Есть CRM/ERP/BI и структурированные данные", value: "structured" },
        { label: "Часть данных в системах, часть в таблицах", value: "partial" },
        { label: "Данные разрознены, единой среды нет", value: "none" },
      ],
    },
    {
      key: "team_readiness",
      text: "Как команда относится к AI и готова ли его использовать?",
      type: "options",
      options: [
        { label: "Есть инициативная команда и опыт", value: "ready" },
        { label: "Интерес высокий, но нужен менторинг", value: "learning" },
        { label: "Опыта почти нет, хотим идти аккуратно", value: "no_experience" },
      ],
    },
    {
      key: "process_maturity",
      text: "Насколько процессы уже формализованы?",
      type: "options",
      options: [
        { label: "Процессы описаны, есть метрики и владельцы", value: "automated" },
        { label: "Часть процессов описана и автоматизирована", value: "documented" },
        { label: "Много ручной работы и хаотичных сценариев", value: "chaotic" },
      ],
    },
    {
      key: "budget",
      text: "Какой формат старта вам ближе?",
      type: "options",
      options: [
        { label: "Полноценный проект с быстрым запуском", value: "high" },
        { label: "Пилот с понятным бюджетом и KPI", value: "medium" },
        { label: "Очень осторожный старт с минимальными вложениями", value: "low" },
      ],
    },
    { key: "contact_name", text: "Как к вам обращаться?", type: "text", placeholder: "Ваше имя" },
    { key: "work_email", text: "Куда отправить мини-отчёт?", type: "email", placeholder: "name@company.com" },
    { key: "contact_phone", text: "Оставьте телефон для обратной связи", type: "tel", placeholder: "+7 999 123-45-67" },
  ];

  var QUICK_WINS = {
    sales: [
      "AI-квалификация лидов и подсказки менеджерам в CRM.",
      "Саммари звонков и follow-up письма без рутины.",
      "Ускорение первичного ответа и реактивация базы.",
    ],
    support: [
      "AI-ассистент первой линии для FAQ и triage.",
      "Автосводки кейсов и рекомендации оператору.",
      "База знаний с быстрым поиском по регламентам.",
    ],
    operations: [
      "Разбор заявок и документов без ручной сортировки.",
      "Контроль SLA и обнаружение узких мест процесса.",
      "Автоматизация повторяющихся back-office операций.",
    ],
    analytics: [
      "AI-сводки по KPI и аномалиям.",
      "Быстрые ответы на управленческие вопросы.",
      "Прогнозирование спроса, воронки или загрузки команд.",
    ],
    knowledge: [
      "Корпоративный AI-ассистент по документам и регламентам.",
      "Подготовка черновиков и ответов внутри команды.",
      "Поиск знаний по внутренним источникам в одном окне.",
    ],
    product: [
      "Анализ обратной связи и product discovery.",
      "Поддержка гипотез и маркетинговых экспериментов.",
      "Пилотные AI-функции внутри продукта.",
    ],
  };

  var INDUSTRY_LABELS = {
    it: "IT и технологии",
    finance: "Финансы и банкинг",
    retail: "Ритейл и e-commerce",
    manufacturing: "Производство",
    healthcare: "Здравоохранение",
    services: "Профессиональные услуги",
    other: "Другая отрасль",
  };

  var SIZE_LABELS = {
    small: "до 50 сотрудников",
    medium: "50-200 сотрудников",
    large: "200-1000 сотрудников",
    enterprise: "более 1000 сотрудников",
  };

  function normalizeBase(value) {
    return String(value || "").replace(/\/$/, "");
  }

  function getConfig() {
    var userConfig = window.AIDiagnosticWidgetConfig || {};
    return Object.assign({}, DEFAULT_CONFIG, userConfig, { apiBase: normalizeBase(userConfig.apiBase || DEFAULT_CONFIG.apiBase) });
  }

  function answerLabel(key, value) {
    var lookup = {
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
    };

    return (lookup[key] && lookup[key][value]) || value || "";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function localReport(answers) {
    var breakdown = [
      {
        category: "Данные и системы",
        score: answers.data_infrastructure === "structured" ? 25 : answers.data_infrastructure === "partial" ? 16 : 7,
        max: 25,
        comment: answers.data_infrastructure === "structured" ? "Есть база для быстрого пилота." : answers.data_infrastructure === "partial" ? "Нужны точечные интеграции и очистка источников." : "Лучше начать с наведения порядка в данных.",
      },
      {
        category: "Команда и adoption",
        score: answers.team_readiness === "ready" ? 22 : answers.team_readiness === "learning" ? 15 : 8,
        max: 22,
        comment: answers.team_readiness === "ready" ? "Команда быстро подхватит пилот." : answers.team_readiness === "learning" ? "Нужно сопровождение и обучение." : "Старт лучше делать через очень простой кейс.",
      },
      {
        category: "Процессы и управляемость",
        score: answers.process_maturity === "automated" ? 21 : answers.process_maturity === "documented" ? 15 : 8,
        max: 21,
        comment: answers.process_maturity === "automated" ? "Есть хороший фундамент для измеримого результата." : answers.process_maturity === "documented" ? "Перед пилотом важно уточнить владельцев и KPI." : "Сначала стоит описать текущий процесс.",
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

    var total = breakdown.reduce(function (sum, item) { return sum + item.score; }, 0);
    var max = breakdown.reduce(function (sum, item) { return sum + item.max; }, 0);
    var score = Math.round((total / max) * 100);

    if (score >= 80) {
      return {
        companyName: answers.company_name || "Не указано",
        industry: answers.industry || "other",
        score: score,
        level: "Высокая готовность",
        recommendation: "Компания выглядит готовой к быстрому пилоту и дальнейшему масштабированию AI-подхода.",
        breakdown: breakdown,
      };
    }

    if (score >= 55) {
      return {
        companyName: answers.company_name || "Не указано",
        industry: answers.industry || "other",
        score: score,
        level: "Средняя готовность",
        recommendation: "Лучший путь сейчас — узкий пилот с KPI и параллельным усилением слабых мест.",
        breakdown: breakdown,
      };
    }

    return {
      companyName: answers.company_name || "Не указано",
      industry: answers.industry || "other",
      score: score,
      level: "Начальная стадия",
      recommendation: "Сначала стоит выбрать один процесс, подготовить данные и только потом запускать пилот.",
      breakdown: breakdown,
    };
  }

  function enrichReport(base, answers) {
    var risks = [];
    if (answers.data_infrastructure === "none") risks.push("Данные пока разрознены: нужен единый контур хотя бы для первого пилота.");
    if (answers.team_readiness === "no_experience") risks.push("Команде понадобится короткое обучение и сопровождение запуска.");
    if (answers.process_maturity === "chaotic") risks.push("Без описанного процесса сложнее доказать ROI и масштабировать внедрение.");
    if (answers.budget === "low") risks.push("При осторожном бюджете важно стартовать только с одного кейса.");
    if (!risks.length) risks.push("Критических блокеров не видно: можно быстро переходить к пилоту.");

    var nextSteps = base.score >= 80
      ? ["Провести короткий аудит данных, ограничений и безопасности.", "Выбрать 1-2 приоритетных кейса с владельцами и KPI.", "Запустить пилот и сразу подготовить сценарий масштабирования."]
      : base.score >= 55
        ? ["Сузить первый кейс до одного процесса с явным бизнес-эффектом.", "Подготовить данные и регламенты только под этот сценарий.", "Запустить тест на 4-6 недель и оценить ROI."]
        : ["Выбрать один самый дорогой ручной процесс.", "Собрать данные, роли и правила работы перед запуском.", "Начать с маленького кейса и короткого обучения команды."];

    var horizon = base.score >= 80
      ? "Первые измеримые результаты возможны через 4-8 недель."
      : base.score >= 55
        ? "Реалистичный горизонт первых результатов: 6-10 недель."
        : "Сначала нужен подготовительный цикл, затем пилот на узком кейсе.";

    return Object.assign({}, base, {
      summary: base.companyName + ' сейчас находится на уровне "' + base.level + '". Лучший старт для компании масштаба ' + (SIZE_LABELS[answers.company_size] || "без уточнённого размера") + " — " + answerLabel("main_goal", answers.main_goal).toLowerCase() + ". " + horizon,
      quickWins: (QUICK_WINS[answers.main_goal] || QUICK_WINS.operations).slice(0, 3),
      risks: risks,
      nextSteps: nextSteps,
      goalLabel: answerLabel("main_goal", answers.main_goal),
      companySizeLabel: SIZE_LABELS[answers.company_size] || "размер не указан",
      leadStatus: base.score >= 80 ? "Готовы к пилоту" : base.score >= 55 ? "Хороший потенциал" : "Нужен подготовительный этап",
      horizon: horizon,
      generatedAt: new Date().toISOString(),
      contact: {
        name: answers.contact_name || "Не указано",
        email: answers.work_email || "Не указан",
        phone: answers.contact_phone || "Не указан",
      },
    });
  }

  function createStyles(config) {
    return '\n      .aiw-root{position:fixed;z-index:99999;bottom:24px;' + (config.position === "left" ? "left:24px;" : "right:24px;") + 'font-family:Inter,Arial,sans-serif;color:#fff}\n      .aiw-launcher{display:flex;align-items:center;gap:12px;border:none;border-radius:999px;background:linear-gradient(135deg,' + config.accent + ',#151a2f);padding:14px 18px;box-shadow:0 18px 48px rgba(12,16,33,.34);cursor:pointer;color:#fff}\n      .aiw-launcher__dot{width:10px;height:10px;border-radius:50%;background:#8ef1b7;box-shadow:0 0 0 6px rgba(142,241,183,.12)}\n      .aiw-launcher__title{font-size:14px;font-weight:700;line-height:1.1}\n      .aiw-launcher__text{font-size:12px;color:rgba(255,255,255,.72);line-height:1.2}\n      .aiw-panel{position:fixed;bottom:24px;' + (config.position === "left" ? "left:24px;" : "right:24px;") + 'width:min(420px,calc(100vw - 20px));height:min(760px,calc(100vh - 40px));display:flex;flex-direction:column;background:#0d1220;border:1px solid rgba(255,255,255,.08);border-radius:28px;box-shadow:0 30px 90px rgba(7,9,18,.55);overflow:hidden;transform:translateY(18px) scale(.98);opacity:0;pointer-events:none;transition:.28s ease}\n      .aiw-panel--open{transform:none;opacity:1;pointer-events:auto}\n      .aiw-header{display:flex;align-items:flex-start;justify-content:space-between;padding:18px 18px 14px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,0));border-bottom:1px solid rgba(255,255,255,.06)}\n      .aiw-brand{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(198,177,255,.78);margin-bottom:6px}\n      .aiw-title{font-size:16px;font-weight:700;line-height:1.2;margin:0 0 4px}\n      .aiw-subtitle{font-size:12px;color:rgba(255,255,255,.56);line-height:1.45;margin:0}\n      .aiw-close{width:40px;height:40px;border:none;border-radius:12px;background:rgba(255,255,255,.04);color:#fff;cursor:pointer;font-size:18px}\n      .aiw-body{flex:1;overflow:auto;padding:18px;background:radial-gradient(circle at top right,rgba(124,58,237,.16),transparent 34%),#0d1220}\n      .aiw-message{max-width:88%;padding:14px 16px;border-radius:18px;margin-bottom:12px;font-size:13px;line-height:1.6;white-space:pre-wrap}\n      .aiw-message--bot{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.82)}\n      .aiw-message--user{margin-left:auto;background:rgba(124,58,237,.18);border:1px solid rgba(124,58,237,.26);color:#fff}\n      .aiw-delivery{margin:0 0 12px;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.04);font-size:12px;color:rgba(255,255,255,.72)}\n      .aiw-footer{padding:14px 18px 18px;border-top:1px solid rgba(255,255,255,.06);background:#0a0f1b}\n      .aiw-options{display:grid;gap:8px}\n      .aiw-option{width:100%;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#fff;border-radius:14px;padding:12px 14px;text-align:left;font-size:13px;line-height:1.4;cursor:pointer;transition:.18s ease}\n      .aiw-option:hover{border-color:' + config.accent + ';background:rgba(124,58,237,.12)}\n      .aiw-form{display:flex;gap:10px}\n      .aiw-input{flex:1;padding:14px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#fff;font-size:13px;outline:none}\n      .aiw-submit{min-width:52px;border:none;border-radius:14px;background:' + config.accent + ';color:#fff;font-size:18px;cursor:pointer}\n      .aiw-error{margin-top:8px;font-size:12px;color:#ffb86b}\n      .aiw-progress{margin-top:12px;height:4px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden}\n      .aiw-progress > span{display:block;height:100%;background:linear-gradient(90deg,' + config.accent + ',#9f7aea)}\n      .aiw-report{padding:16px;border-radius:22px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06)}\n      .aiw-score{display:flex;align-items:center;justify-content:center;width:96px;height:96px;border-radius:50%;margin:0 auto 14px;background:#0a0f1b;border:4px solid ' + config.accent + ';font-size:28px;font-weight:800}\n      .aiw-report__level{text-align:center;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:rgba(198,177,255,.78);margin-bottom:14px}\n      .aiw-report h4{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.48);margin:0 0 10px}\n      .aiw-report p{margin:0 0 14px;font-size:13px;line-height:1.6;color:rgba(255,255,255,.8)}\n      .aiw-report ul{margin:0 0 14px;padding-left:18px;color:rgba(255,255,255,.78);font-size:13px;line-height:1.6}\n      .aiw-breakdown{display:grid;gap:10px;margin:14px 0}\n      .aiw-breakdown__item{padding:12px 14px;border-radius:16px;background:rgba(0,0,0,.16);border:1px solid rgba(255,255,255,.05)}\n      .aiw-breakdown__row{display:flex;justify-content:space-between;gap:12px;font-size:12px;margin-bottom:8px;color:rgba(255,255,255,.76)}\n      .aiw-breakdown__bar{height:6px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:6px}\n      .aiw-breakdown__bar span{display:block;height:100%;background:linear-gradient(90deg,' + config.accent + ',#9f7aea)}\n      .aiw-cta{display:inline-flex;align-items:center;justify-content:center;width:100%;padding:14px 16px;border-radius:14px;background:' + config.accent + ';color:#fff;text-decoration:none;font-weight:700;margin-top:6px}\n      .aiw-meta{font-size:12px;color:rgba(255,255,255,.5);display:grid;gap:4px;margin-bottom:12px}\n      @media (max-width: 640px){.aiw-root{right:10px;left:10px;bottom:10px}.aiw-panel{right:10px;left:10px;bottom:10px;width:auto;height:min(85vh,760px)}.aiw-launcher{width:100%;justify-content:center}}\n    ';
  }

  function Widget(config) {
    this.config = config;
    this.answers = {};
    this.messages = [];
    this.currentStep = -1;
    this.opened = false;
    this.loading = false;
    this.error = "";
    this.report = null;
    this.delivery = "";
  }

  Widget.prototype.mount = function () {
    var style = document.createElement("style");
    style.textContent = createStyles(this.config);
    document.head.appendChild(style);

    this.root = document.createElement("div");
    this.root.className = "aiw-root";
    document.body.appendChild(this.root);
    this.render();
  };

  Widget.prototype.start = function () {
    if (this.currentStep >= 0) {
      return;
    }

    this.currentStep = 0;
    this.messages = [
      { role: "bot", text: "Проведу короткую AI-диагностику за 1-2 минуты. В конце попрошу контакты и подготовлю мини-отчёт." },
      { role: "bot", text: QUESTIONS[0].text },
    ];
    this.render();
  };

  Widget.prototype.toggle = function () {
    this.opened = !this.opened;
    if (this.opened) {
      this.start();
    }
    this.render();
  };

  Widget.prototype.reset = function () {
    this.answers = {};
    this.messages = [];
    this.currentStep = -1;
    this.loading = false;
    this.error = "";
    this.report = null;
    this.delivery = "";
    this.start();
  };

  Widget.prototype.currentQuestion = function () {
    if (this.currentStep < 0 || this.currentStep >= QUESTIONS.length) {
      return null;
    }
    return QUESTIONS[this.currentStep];
  };

  Widget.prototype.validate = function (question, value) {
    var text = String(value || "").trim();
    if (!text) return "Нужен ответ, чтобы двигаться дальше.";
    if (question.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return "Похоже, email введён не полностью.";
    if (question.type === "tel" && text.replace(/\D/g, "").length < 10) return "Телефон должен содержать минимум 10 цифр.";
    return "";
  };

  Widget.prototype.submitAnswer = function (value, label) {
    var question = this.currentQuestion();
    if (!question || this.loading) {
      return;
    }

    var error = this.validate(question, value);
    if (error) {
      this.error = error;
      this.render();
      return;
    }

    this.error = "";
    this.answers[question.key] = String(value).trim();
    this.messages.push({ role: "user", text: label || String(value).trim() });

    this.currentStep += 1;
    if (this.currentStep >= QUESTIONS.length) {
      this.finish();
      return;
    }

    if (question.key === "budget") {
      this.messages.push({ role: "bot", text: "Диагностика почти готова. Остался последний шаг: контакты для отправки мини-отчёта." });
    }

    this.messages.push({ role: "bot", text: QUESTIONS[this.currentStep].text });
    this.render();
  };

  Widget.prototype.finish = async function () {
    this.loading = true;
    this.messages.push({ role: "bot", text: "Анализирую ответы и собираю мини-отчёт." });
    this.render();

    var fallbackReport = enrichReport(localReport(this.answers), this.answers);

    try {
      var response = await fetch((this.config.apiBase || "") + "/api/diagnostic/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Pinggy-No-Screen": "1" },
        body: JSON.stringify({
          answers: this.answers,
          metadata: {
            source: "tilda-widget",
            pageUrl: window.location.href,
            referrer: document.referrer,
          },
        }),
      });

      var data = await response.json();
      if (!response.ok || !data.report) {
        throw new Error(data && data.message ? data.message : "Server error");
      }

      this.report = data.report;
      if (data.delivery && data.delivery.email && data.delivery.email.message) {
        this.delivery = data.delivery.email.message;
      }
      this.messages.push({ role: "bot", text: "Готово. Ниже уже есть ваш мини-отчёт с рекомендациями." });
    } catch (error) {
      this.report = fallbackReport;
      this.delivery = "Сервер недоступен: отчёт показан в чате, но письмо и CRM не отправлены.";
      this.messages.push({ role: "bot", text: this.delivery });
    }

    this.loading = false;
    this.render();
  };

  Widget.prototype.renderMessages = function () {
    return this.messages
      .map(function (message) {
        return '<div class="aiw-message aiw-message--' + message.role + '">' + escapeHtml(message.text) + "</div>";
      })
      .join("");
  };

  Widget.prototype.renderReport = function () {
    if (!this.report) {
      return "";
    }

    var breakdown = this.report.breakdown
      .map(function (item) {
        var percent = Math.round((item.score / item.max) * 100);
        return (
          '<div class="aiw-breakdown__item">' +
          '<div class="aiw-breakdown__row"><strong>' + escapeHtml(item.category) + "</strong><span>" + item.score + "/" + item.max + "</span></div>" +
          '<div class="aiw-breakdown__bar"><span style="width:' + percent + '%"></span></div>' +
          '<div style="font-size:12px;color:rgba(255,255,255,.55);line-height:1.45;">' + escapeHtml(item.comment) + "</div>" +
          "</div>"
        );
      })
      .join("");

    var cta = this.config.bookingUrl
      ? '<a class="aiw-cta" href="' + escapeHtml(this.config.bookingUrl) + '" target="_blank" rel="noopener noreferrer">Обсудить результаты</a>'
      : "";

    return (
      '<div class="aiw-report">' +
      '<div class="aiw-score">' + this.report.score + "%</div>" +
      '<div class="aiw-report__level">' + escapeHtml(this.report.level) + "</div>" +
      '<p>' + escapeHtml(this.report.summary) + "</p>" +
      '<div class="aiw-meta">' +
      "<div>Отрасль: " + escapeHtml(INDUSTRY_LABELS[this.report.industry] || this.report.industry) + "</div>" +
      "<div>Размер: " + escapeHtml(this.report.companySizeLabel) + "</div>" +
      "<div>Фокус: " + escapeHtml(this.report.goalLabel) + "</div>" +
      "<div>Статус: " + escapeHtml(this.report.leadStatus) + "</div>" +
      "</div>" +
      '<div class="aiw-breakdown">' + breakdown + "</div>" +
      "<h4>Быстрые кейсы</h4>" +
      "<ul>" + this.report.quickWins.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul>" +
      "<h4>Следующие шаги</h4>" +
      "<ul>" + this.report.nextSteps.map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + "</ul>" +
      "<p>" + escapeHtml(this.report.recommendation) + "</p>" +
      cta +
      "</div>"
    );
  };

  Widget.prototype.renderFooter = function () {
    if (this.report) {
      return '<button class="aiw-option" data-reset="1">Пройти диагностику заново</button>';
    }

    var question = this.currentQuestion();
    if (!question) {
      return "";
    }

    var progress = Math.round(((this.currentStep + 1) / QUESTIONS.length) * 100);
    var html = "";

    if (question.type === "options") {
      html += '<div class="aiw-options">';
      html += question.options
        .map(function (option) {
          return '<button class="aiw-option" data-option="' + escapeHtml(option.value) + '" data-label="' + escapeHtml(option.label) + '">' + escapeHtml(option.label) + "</button>";
        })
        .join("");
      html += "</div>";
    } else {
      html += '<form class="aiw-form" data-form="1">';
      html += '<input class="aiw-input" name="value" type="' + (question.type === "email" ? "email" : question.type === "tel" ? "tel" : "text") + '" placeholder="' + escapeHtml(question.placeholder || "Введите ответ") + '">';
      html += '<button class="aiw-submit" type="submit">&#10148;</button>';
      html += "</form>";
    }

    if (this.error) {
      html += '<div class="aiw-error">' + escapeHtml(this.error) + "</div>";
    }

    html += '<div class="aiw-progress"><span style="width:' + progress + '%"></span></div>';
    return html;
  };

  Widget.prototype.render = function () {
    var launcher = '' +
      '<button class="aiw-launcher" data-toggle="1" type="button">' +
      '<span class="aiw-launcher__dot"></span>' +
      '<span>' +
      '<span class="aiw-launcher__title">' + escapeHtml(this.config.title) + '</span>' +
      '<span class="aiw-launcher__text">' + escapeHtml(this.config.subtitle) + '</span>' +
      "</span>" +
      "</button>";

    var panel = '' +
      '<div class="aiw-panel ' + (this.opened ? "aiw-panel--open" : "") + '">' +
      '<div class="aiw-header">' +
      "<div>" +
      '<div class="aiw-brand">' + escapeHtml(this.config.brandName) + "</div>" +
      '<h3 class="aiw-title">' + escapeHtml(this.config.title) + "</h3>" +
      '<p class="aiw-subtitle">' + escapeHtml(this.config.subtitle) + "</p>" +
      "</div>" +
      '<button class="aiw-close" type="button" data-toggle="1">×</button>' +
      "</div>" +
      '<div class="aiw-body">' +
      this.renderMessages() +
      (this.delivery ? '<div class="aiw-delivery">' + escapeHtml(this.delivery) + "</div>" : "") +
      this.renderReport() +
      "</div>" +
      '<div class="aiw-footer">' + this.renderFooter() + "</div>" +
      "</div>";

    this.root.innerHTML = launcher + panel;

    var toggleButtons = this.root.querySelectorAll("[data-toggle='1']");
    for (var i = 0; i < toggleButtons.length; i += 1) {
      toggleButtons[i].addEventListener("click", this.toggle.bind(this));
    }

    var optionButtons = this.root.querySelectorAll("[data-option]");
    for (var j = 0; j < optionButtons.length; j += 1) {
      optionButtons[j].addEventListener("click", this.handleOptionClick.bind(this));
    }

    var form = this.root.querySelector("[data-form='1']");
    if (form) {
      form.addEventListener("submit", this.handleSubmit.bind(this));
      var input = form.querySelector("input");
      if (input) {
        setTimeout(function () { input.focus(); }, 60);
      }
    }

    var resetButton = this.root.querySelector("[data-reset='1']");
    if (resetButton) {
      resetButton.addEventListener("click", this.reset.bind(this));
    }

    var body = this.root.querySelector(".aiw-body");
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  };

  Widget.prototype.handleOptionClick = function (event) {
    var button = event.currentTarget;
    this.submitAnswer(button.getAttribute("data-option"), button.getAttribute("data-label"));
  };

  Widget.prototype.handleSubmit = function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var input = form.querySelector("input");
    this.submitAnswer(input ? input.value : "");
  };

  function boot() {
    var widget = new Widget(getConfig());
    widget.mount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
