import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Download, RotateCcw, Send, X } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-1ff134d3`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

type QuestionType = "text" | "email" | "tel" | "options";

interface QuestionOption {
  label: string;
  value: string;
}

interface Question {
  key: string;
  text: string;
  type: QuestionType;
  stage: "diagnostic" | "contact";
  placeholder?: string;
  options?: QuestionOption[];
}

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: QuestionOption[];
  isTyping?: boolean;
}

interface BreakdownItem {
  category: string;
  score: number;
  max: number;
  comment: string;
}

interface BaseReport {
  companyName: string;
  industry: string;
  score: number;
  level: string;
  recommendation: string;
  breakdown: BreakdownItem[];
}

interface Report extends BaseReport {
  summary: string;
  quickWins: string[];
  risks: string[];
  nextSteps: string[];
  goalLabel: string;
  companySizeLabel: string;
  leadStatus: string;
  horizon: string;
  generatedAt: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface DeliveryState {
  status: "idle" | "sending" | "sent" | "failed";
  message: string;
}

const QUESTIONS: Question[] = [
  { key: "company_name", text: "Как называется ваша компания?", type: "text", stage: "diagnostic", placeholder: "Например, Acme Tech" },
  {
    key: "industry",
    text: "В какой отрасли вы работаете?",
    type: "options",
    stage: "diagnostic",
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
    stage: "diagnostic",
    options: [
      { label: "До 50", value: "small" },
      { label: "50-200", value: "medium" },
      { label: "200-1000", value: "large" },
      { label: "Более 1000", value: "enterprise" },
    ],
  },
  {
    key: "main_goal",
    text: "Какой эффект от ИИ для вас сейчас важнее всего?",
    type: "options",
    stage: "diagnostic",
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
    text: "Насколько у вас готовы данные и системы для внедрения ИИ?",
    type: "options",
    stage: "diagnostic",
    options: [
      { label: "Есть CRM/ERP/BI и структурированные данные", value: "structured" },
      { label: "Часть данных в системах, часть в таблицах", value: "partial" },
      { label: "Данные разрознены, единой среды нет", value: "none" },
    ],
  },
  {
    key: "team_readiness",
    text: "Как команда относится к ИИ и готова ли его использовать?",
    type: "options",
    stage: "diagnostic",
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
    stage: "diagnostic",
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
    stage: "diagnostic",
    options: [
      { label: "Полноценный проект с быстрым запуском", value: "high" },
      { label: "Пилот с понятным бюджетом и KPI", value: "medium" },
      { label: "Очень осторожный старт с минимальными вложениями", value: "low" },
    ],
  },
  { key: "contact_name", text: "Как к вам обращаться?", type: "text", stage: "contact", placeholder: "Ваше имя" },
  { key: "work_email", text: "Куда отправить мини-отчёт?", type: "email", stage: "contact", placeholder: "name@company.com" },
  { key: "contact_phone", text: "И телефон для короткой обратной связи, если отчёт заинтересует?", type: "tel", stage: "contact", placeholder: "+7 999 123-45-67" },
];

const QUICK_WINS: Record<string, string[]> = {
  sales: ["AI-квалификация лидов и подсказки менеджерам в CRM", "Саммари звонков и follow-up письма без рутины", "Ускорение первичного ответа и реактивация базы"],
  support: ["AI-ассистент первой линии для FAQ и triage", "Автосводки кейсов и рекомендации оператору", "База знаний с быстрым поиском по регламентам"],
  operations: ["Разбор заявок и документов без ручной сортировки", "Контроль SLA и обнаружение узких мест процесса", "Роботизация повторяющихся back-office операций"],
  analytics: ["AI-сводки по KPI и аномалиям", "Быстрые ответы на управленческие вопросы", "Прогнозирование спроса, воронки или загрузки команд"],
  knowledge: ["Корпоративный AI-ассистент по документам и регламентам", "Подготовка черновиков и ответов внутри команды", "Поиск знаний по внутренним источникам в одном окне"],
  product: ["Анализ обратной связи и гипотез", "Поддержка discovery и маркетинговых экспериментов", "Пилотные AI-функции внутри продукта"],
};

const INDUSTRY_LABELS: Record<string, string> = {
  it: "IT и технологии",
  finance: "Финансы и банкинг",
  retail: "Ритейл и e-commerce",
  manufacturing: "Производство",
  healthcare: "Здравоохранение",
  services: "Профессиональные услуги",
  other: "Другая отрасль",
};

const SIZE_LABELS: Record<string, string> = {
  small: "до 50 сотрудников",
  medium: "50-200 сотрудников",
  large: "200-1000 сотрудников",
  enterprise: "более 1000 сотрудников",
};

const DELIVERY_TEXT = {
  sending: "Формирую письмо и отправляю мини-отчёт на почту.",
  sent: "Мини-отчёт отправлен на указанный email.",
  failed: "Авто-отправка письма сейчас недоступна. Отчёт уже доступен в чате и его можно скачать.",
};

function findQuestion(key: string) {
  return QUESTIONS.find((question) => question.key === key);
}

function answerLabel(key: string, value?: string) {
  if (!value) {
    return "";
  }

  return findQuestion(key)?.options?.find((option) => option.value === value)?.label || value;
}

function localReport(answers: Record<string, string>): BaseReport {
  const breakdown: BreakdownItem[] = [
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

function enrichReport(base: BaseReport, answers: Record<string, string>): Report {
  const risks: string[] = [];

  if (answers.data_infrastructure === "none") risks.push("Данные пока разрознены: нужен единый контур хотя бы для первого пилота.");
  if (answers.team_readiness === "no_experience") risks.push("Команде понадобится короткое обучение и сопровождение запуска.");
  if (answers.process_maturity === "chaotic") risks.push("Без описанного процесса сложнее доказать ROI и масштабировать внедрение.");
  if (answers.budget === "low") risks.push("При осторожном бюджете важно стартовать только с одного кейса.");
  if (!risks.length) risks.push("Критических блокеров не видно: можно быстро переходить к пилоту.");

  const nextSteps =
    base.score >= 80
      ? ["Провести короткий аудит данных, ограничений и безопасности.", "Выбрать 1-2 приоритетных кейса с владельцами и KPI.", "Запустить пилот и сразу подготовить сценарий масштабирования."]
      : base.score >= 55
        ? ["Сузить первый кейс до одного процесса с явным бизнес-эффектом.", "Подготовить данные и регламенты только под этот сценарий.", "Запустить тест на 4-6 недель и оценить ROI."]
        : ["Выбрать один самый дорогой ручной процесс.", "Собрать данные, роли и правила работы перед запуском.", "Начать с маленького кейса и короткого обучения команды."];

  const horizon = base.score >= 80 ? "Первые измеримые результаты возможны через 4-8 недель." : base.score >= 55 ? "Реалистичный горизонт первых результатов: 6-10 недель." : "Сначала нужен подготовительный цикл, затем пилот на узком кейсе.";

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

function validate(question: Question, value: string) {
  const text = value.trim();
  if (!text) return "Нужен ответ, чтобы двигаться дальше.";
  if (question.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return "Похоже, email введён не полностью.";
  if (question.type === "tel" && text.replace(/\D/g, "").length < 10) return "Для связи нужен телефон минимум из 10 цифр.";
  return "";
}

function normalizeEmailError(message: string) {
  const text = message.toLowerCase();
  if (text.includes("domain is not verified")) return "Почтовый домен на сервере пока не подтверждён. Отчёт уже можно скачать из чата.";
  if (text.includes("email service not configured")) return "На сервере пока не подключён почтовый сервис. Отчёт уже можно скачать из чата.";
  return DELIVERY_TEXT.failed;
}

function textFile(report: Report) {
  return [
    "Мини-отчёт по AI-диагностике",
    "",
    `Компания: ${report.companyName}`,
    `Отрасль: ${INDUSTRY_LABELS[report.industry] || report.industry}`,
    `Размер: ${report.companySizeLabel}`,
    `Оценка: ${report.score}%`,
    `Статус: ${report.level}`,
    `Фокус: ${report.goalLabel}`,
    `Контакт: ${report.contact.name}`,
    `Email: ${report.contact.email}`,
    `Телефон: ${report.contact.phone}`,
    "",
    "Краткий вывод",
    report.summary,
    "",
    "Оценка по блокам",
    ...report.breakdown.map((item) => `- ${item.category}: ${item.score}/${item.max}. ${item.comment}`),
    "",
    "Быстрые кейсы",
    ...report.quickWins.map((item) => `- ${item}`),
    "",
    "Риски",
    ...report.risks.map((item) => `- ${item}`),
    "",
    "Следующие шаги",
    ...report.nextSteps.map((item) => `- ${item}`),
    "",
    "Рекомендация",
    report.recommendation,
  ].join("\n");
}

export function ChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(-1);
  const [delivery, setDelivery] = useState<DeliveryState>({ status: "idle", message: "" });
  const [inputError, setInputError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, []);

  const addBotMessage = useCallback(
    (text: string, options?: QuestionOption[]) => {
      const id = crypto.randomUUID();
      setMessages((prev) => [...prev, { id, type: "bot", text: "", options, isTyping: true }]);
      scrollToBottom();

      setTimeout(() => {
        setMessages((prev) => prev.map((item) => (item.id === id ? { ...item, isTyping: false, text } : item)));
        scrollToBottom();
      }, 450 + Math.random() * 250);
    },
    [scrollToBottom],
  );

  const resetChat = useCallback(() => {
    setAnswers({});
    setCurrentStep(-1);
    setDelivery({ status: "idle", message: "" });
    setInputError("");
    setInputValue("");
    setIsLoading(false);
    setMessages([]);
    setReport(null);
    setSessionId(null);
  }, []);

  const saveAnswer = useCallback(async (activeSessionId: string, questionKey: string, answer: string) => {
    try {
      await fetch(`${API_BASE}/chat-answer`, {
        method: "POST",
        headers,
        body: JSON.stringify({ sessionId: activeSessionId, questionKey, answer }),
      });
    } catch (error) {
      console.error("Failed to save answer:", error);
    }
  }, []);

  const sendEmail = useCallback(
    async (activeSessionId: string, email: string) => {
      setDelivery({ status: "sending", message: DELIVERY_TEXT.sending });

      try {
        const response = await fetch(`${API_BASE}/chat-send-email`, {
          method: "POST",
          headers,
          body: JSON.stringify({ sessionId: activeSessionId, email }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || DELIVERY_TEXT.failed);
        }

        setDelivery({ status: "sent", message: DELIVERY_TEXT.sent });
        addBotMessage(DELIVERY_TEXT.sent);
      } catch (error) {
        const message = normalizeEmailError(error instanceof Error ? error.message : DELIVERY_TEXT.failed);
        setDelivery({ status: "failed", message });
        addBotMessage(message);
      }
    },
    [addBotMessage],
  );

  const finishDiagnostic = useCallback(
    async (activeSessionId: string, nextAnswers: Record<string, string>) => {
      setIsLoading(true);
      addBotMessage("Анализирую ответы и собираю мини-отчёт.");

      let base: BaseReport;
      try {
        const response = await fetch(`${API_BASE}/chat-complete`, {
          method: "POST",
          headers,
          body: JSON.stringify({ sessionId: activeSessionId }),
        });
        const data = await response.json();

        if (!response.ok || !data?.report) {
          throw new Error(data?.error || "Report generation failed");
        }

        base = data.report;
      } catch (error) {
        console.error("Using local report fallback:", error);
        base = localReport(nextAnswers);
      }

      const finalReport = enrichReport(base, nextAnswers);
      setReport(finalReport);
      addBotMessage("Готово. Ниже уже есть ваш мини-отчёт с быстрыми кейсами и ближайшими шагами.");

      if (nextAnswers.work_email) {
        await sendEmail(activeSessionId, nextAnswers.work_email);
      }

      setIsLoading(false);
    },
    [addBotMessage, sendEmail],
  );

  useEffect(() => {
    if (!isOpen || sessionId) {
      return;
    }

    const init = async () => {
      try {
        const response = await fetch(`${API_BASE}/chat-session`, { method: "POST", headers });
        const data = await response.json();

        if (!data?.sessionId) {
          throw new Error("Session init failed");
        }

        setSessionId(data.sessionId);
        setCurrentStep(0);

        const welcomeId = crypto.randomUUID();
        setMessages([{ id: welcomeId, type: "bot", text: "", isTyping: true }]);

        setTimeout(() => {
          setMessages((prev) =>
            prev.map((item) =>
              item.id === welcomeId
                ? {
                    ...item,
                    isTyping: false,
                    text: "Проведу короткую AI-диагностику за 1-2 минуты. В конце попрошу контакты и подготовлю мини-отчёт.",
                  }
                : item,
            ),
          );

          setTimeout(() => addBotMessage(QUESTIONS[0].text, QUESTIONS[0].options), 650);
        }, 500);
      } catch (error) {
        console.error("Failed to create chat session:", error);
        addBotMessage("Не удалось подключить диагностику. Попробуйте открыть форму ещё раз.");
      }
    };

    init();
  }, [addBotMessage, isOpen, sessionId]);

  useEffect(() => {
    const question = QUESTIONS[currentStep];
    if (!isOpen || !question || question.type === "options") {
      return;
    }

    setTimeout(() => inputRef.current?.focus(), 700);
  }, [currentStep, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, [isOpen]);

  const handleAnswer = useCallback(
    async (answer: string, displayText?: string) => {
      const question = QUESTIONS[currentStep];
      if (!question || !sessionId || isLoading) {
        return;
      }

      const nextAnswers = { ...answers, [question.key]: answer };
      setAnswers(nextAnswers);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), type: "user", text: displayText || answer }]);
      setInputValue("");
      setInputError("");
      scrollToBottom();

      setIsLoading(true);
      await saveAnswer(sessionId, question.key, answer);

      const nextStep = currentStep + 1;
      const nextQuestion = QUESTIONS[nextStep];

      if (!nextQuestion) {
        setCurrentStep(QUESTIONS.length);
        await finishDiagnostic(sessionId, nextAnswers);
        return;
      }

      setCurrentStep(nextStep);
      const contactSwitch = question.stage === "diagnostic" && nextQuestion.stage === "contact";

      setTimeout(() => {
        if (contactSwitch) {
          addBotMessage("Диагностика почти готова. Остался последний шаг: контакты для отправки мини-отчёта.");
          setTimeout(() => {
            addBotMessage(nextQuestion.text, nextQuestion.options);
            setIsLoading(false);
          }, 520);
          return;
        }

        addBotMessage(nextQuestion.text, nextQuestion.options);
        setIsLoading(false);
      }, 260);
    },
    [addBotMessage, answers, currentStep, finishDiagnostic, isLoading, saveAnswer, scrollToBottom, sessionId],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const question = QUESTIONS[currentStep];
    if (!question || isLoading) {
      return;
    }

    const error = validate(question, inputValue);
    if (error) {
      setInputError(error);
      return;
    }

    handleAnswer(inputValue.trim());
  };

  const downloadReport = () => {
    if (!report) {
      return;
    }

    const blob = new Blob([textFile(report)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ai-report-${report.companyName.replace(/\s+/g, "-").toLowerCase() || "company"}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const currentQuestion = currentStep >= 0 && currentStep < QUESTIONS.length ? QUESTIONS[currentStep] : null;
  const showInput = Boolean(currentQuestion && currentQuestion.type !== "options" && !isLoading);

  const scoreColor = (score: number) => (score >= 80 ? "text-emerald-400" : score >= 55 ? "text-amber-400" : "text-red-400");
  const scoreBarColor = (score: number, max: number) => {
    const percent = (score / max) * 100;
    return percent >= 80 ? "from-emerald-500/40 to-emerald-400/20" : percent >= 55 ? "from-amber-500/40 to-amber-400/20" : "from-red-500/40 to-red-400/20";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <div className="fixed inset-0 z-[201] flex items-stretch justify-stretch sm:items-end sm:justify-end sm:p-5">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-[#0c0c16]/98 shadow-2xl shadow-purple-900/20 backdrop-blur-xl sm:h-[min(720px,calc(100dvh-2.5rem))] sm:max-h-[calc(100dvh-2.5rem)] sm:w-[460px] sm:rounded-[24px] sm:border sm:border-white/[0.08] sm:bg-[#0c0c16]/95"
            onWheelCapture={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                <div>
                  <p className="text-[14px] font-medium text-white/90">AI-диагностика CoMind</p>
                  <p className="text-[11px] text-white/30">мини-отчёт и рекомендации</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(messages.length > 1 || report) && (
                  <button onClick={resetChat} className="rounded-lg p-2 transition-colors hover:bg-white/[0.05]" title="Начать заново">
                    <RotateCcw className="h-4 w-4 text-white/40" />
                  </button>
                )}
                <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-white/[0.05]">
                  <X className="h-4 w-4 text-white/40" />
                </button>
              </div>
            </div>

            <div
              ref={scrollAreaRef}
              className="hide-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5"
              style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              {messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed sm:max-w-[85%] ${message.type === "user" ? "border border-purple-500/20 bg-purple-500/15 text-white/90" : "border border-white/[0.06] bg-white/[0.03] text-white/70"}`}>
                    {message.isTyping ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <>
                        <p>{message.text}</p>
                        {message.options && (
                          <div className="mt-3 flex flex-col gap-2">
                            {message.options.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleAnswer(option.value, option.label)}
                                disabled={isLoading || !currentQuestion?.options?.some((currentOption) => currentOption.value === option.value)}
                                className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 text-left text-[12px] text-white/60 transition-all duration-200 hover:border-purple-500/20 hover:bg-purple-500/10 hover:text-white/85 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {delivery.status === "sending" && <div className="rounded-2xl border border-purple-500/15 bg-purple-500/[0.05] px-4 py-3 text-[12px] text-purple-100/75">{delivery.message}</div>}

              {report && (
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                  <div className="space-y-2 text-center">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-purple-400/60">Мини-отчёт по AI-диагностике</p>
                    <p className="text-[14px] text-white/50">{report.companyName}</p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative h-28 w-28">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke={report.score >= 80 ? "rgba(52,211,153,0.5)" : report.score >= 55 ? "rgba(251,191,36,0.5)" : "rgba(248,113,113,0.5)"} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(report.score / 100) * 264} 264`} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`font-mono text-2xl ${scoreColor(report.score)}`}>{report.score}%</span>
                        <span className="mt-0.5 text-[10px] text-white/30">готовность</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-purple-400/50">Короткий вывод</p>
                    <p className="text-[13px] leading-relaxed text-white/70">{report.summary}</p>
                    <div className="mt-3 grid gap-2 text-[12px] text-white/45 sm:grid-cols-2">
                      <div>Отрасль: {INDUSTRY_LABELS[report.industry] || report.industry}</div>
                      <div>Размер: {report.companySizeLabel}</div>
                      <div>Фокус: {report.goalLabel}</div>
                      <div>Статус: {report.leadStatus}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {report.breakdown.map((item, index) => (
                      <div key={`${item.category}-${index}`} className="space-y-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-white/55">{item.category}</span>
                          <span className="font-mono text-[12px] text-white/30">{item.score}/{item.max}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(item.score / item.max) * 100}%` }} transition={{ duration: 0.65, delay: 0.08 + index * 0.08 }} className={`h-full rounded-full bg-gradient-to-r ${scoreBarColor(item.score, item.max)}`} />
                        </div>
                        <p className="text-[11px] leading-relaxed text-white/28">{item.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-purple-400/50">Быстрые кейсы</p>
                      <ul className="space-y-2 text-[12px] leading-relaxed text-white/60">{report.quickWins.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-purple-400/50">Риски</p>
                      <ul className="space-y-2 text-[12px] leading-relaxed text-white/60">{report.risks.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-purple-500/10 bg-purple-500/[0.05] p-4">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-purple-400/50">Следующие шаги</p>
                    <ul className="space-y-2 text-[12px] leading-relaxed text-white/68">{report.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
                    <p className="mt-3 text-[12px] leading-relaxed text-white/52">{report.recommendation}</p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4 text-[12px] leading-relaxed text-white/52">
                    <div>Контакт: {report.contact.name}</div>
                    <div>Email: {report.contact.email}</div>
                    <div>Телефон: {report.contact.phone}</div>
                    {delivery.message && <div className={`mt-3 rounded-xl border px-3 py-2 ${delivery.status === "sent" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200/80" : delivery.status === "failed" ? "border-amber-500/20 bg-amber-500/10 text-amber-100/80" : "border-white/[0.06] bg-white/[0.04] text-white/60"}`}>{delivery.message}</div>}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button type="button" onClick={downloadReport} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[13px] text-white/80 transition-all duration-300 hover:bg-white/[0.08] sm:flex-1">
                      <Download className="h-4 w-4" />
                      Скачать мини-отчёт
                    </button>
                    <a href="https://t.me/Ctrain2042" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/15 px-4 py-3 text-[13px] text-purple-200/90 transition-all duration-300 hover:bg-purple-500/25 sm:flex-1">
                      Обсудить с экспертом
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {showInput && (
              <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/[0.06] px-4 py-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type={currentQuestion?.type === "email" ? "email" : currentQuestion?.type === "tel" ? "tel" : "text"}
                    value={inputValue}
                    onChange={(event) => {
                      setInputValue(event.target.value);
                      if (inputError) setInputError("");
                    }}
                    placeholder={currentQuestion?.placeholder || "Введите ответ..."}
                    className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[13px] text-white/80 outline-none transition-colors placeholder:text-white/20 focus:border-purple-500/30"
                  />
                  <button type="submit" disabled={!inputValue.trim()} className="rounded-xl border border-purple-500/20 bg-purple-500/15 p-3 text-purple-300 transition-all hover:bg-purple-500/25 disabled:cursor-not-allowed disabled:opacity-30">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {inputError && <p className="mt-2 text-[11px] text-amber-300/80">{inputError}</p>}
              </form>
            )}

            {currentStep >= 0 && currentStep < QUESTIONS.length && (
              <div className="shrink-0 px-4 pb-3 sm:px-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] text-white/20">{currentQuestion?.stage === "contact" ? "Контакты" : "Диагностика"}</span>
                  <span className="font-mono text-[10px] text-white/20">{currentStep + 1}/{QUESTIONS.length}</span>
                </div>
                <div className="h-0.5 overflow-hidden rounded-full bg-white/[0.04]">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-purple-500/40 to-violet-400/30" initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }} transition={{ duration: 0.25 }} />
                </div>
              </div>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
