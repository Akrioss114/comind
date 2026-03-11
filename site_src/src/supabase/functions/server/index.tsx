import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1ff134d3/health", (c) => {
  return c.json({ status: "ok" });
});

// Create a new chat session
app.post("/make-server-1ff134d3/chat-session", async (c) => {
  try {
    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      answers: {},
      completed: false,
    };
    await kv.set(`chat_session:${sessionId}`, session);
    console.log(`Created chat session: ${sessionId}`);
    return c.json({ sessionId });
  } catch (error) {
    console.log(`Error creating chat session: ${error}`);
    return c.json({ error: `Failed to create chat session: ${error}` }, 500);
  }
});

// Save an answer for a chat session
app.post("/make-server-1ff134d3/chat-answer", async (c) => {
  try {
    const { sessionId, questionKey, answer } = await c.req.json();
    if (!sessionId || !questionKey) {
      return c.json({ error: "Missing sessionId or questionKey" }, 400);
    }
    const session = await kv.get(`chat_session:${sessionId}`);
    if (!session) {
      return c.json({ error: "Session not found" }, 404);
    }
    session.answers[questionKey] = answer;
    await kv.set(`chat_session:${sessionId}`, session);
    console.log(`Saved answer for session ${sessionId}, question: ${questionKey}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving chat answer: ${error}`);
    return c.json({ error: `Failed to save answer: ${error}` }, 500);
  }
});

// Complete session and generate report
app.post("/make-server-1ff134d3/chat-complete", async (c) => {
  try {
    const { sessionId } = await c.req.json();
    if (!sessionId) {
      return c.json({ error: "Missing sessionId" }, 400);
    }
    const session = await kv.get(`chat_session:${sessionId}`);
    if (!session) {
      return c.json({ error: "Session not found" }, 404);
    }

    const answers = session.answers;
    
    // Calculate readiness score based on answers
    let score = 0;
    let maxScore = 0;
    const breakdown: { category: string; score: number; max: number; comment: string }[] = [];

    // 1. Data infrastructure
    maxScore += 25;
    const dataScore = answers.data_infrastructure === "structured" ? 25 
      : answers.data_infrastructure === "partial" ? 15 
      : answers.data_infrastructure === "none" ? 5 : 10;
    score += dataScore;
    breakdown.push({ 
      category: "Данные и инфраструктура", 
      score: dataScore, 
      max: 25,
      comment: dataScore >= 20 ? "Отличная база для внедрения AI" : dataScore >= 15 ? "Требуется доработка структуры данных" : "Необходимо выстроить data-pipeline с нуля"
    });

    // 2. Team readiness
    maxScore += 25;
    const teamScore = answers.team_readiness === "ready" ? 25 
      : answers.team_readiness === "learning" ? 15 
      : answers.team_readiness === "no_experience" ? 5 : 10;
    score += teamScore;
    breakdown.push({ 
      category: "Готовность команды", 
      score: teamScore, 
      max: 25,
      comment: teamScore >= 20 ? "Команда готова к AI-трансформации" : teamScore >= 15 ? "Нужно обучение и менторинг" : "Рекомендуем начать с AI-грамотности"
    });

    // 3. Process maturity
    maxScore += 25;
    const processScore = answers.process_maturity === "automated" ? 25 
      : answers.process_maturity === "documented" ? 18 
      : answers.process_maturity === "chaotic" ? 5 : 10;
    score += processScore;
    breakdown.push({ 
      category: "Зрелость процессов", 
      score: processScore, 
      max: 25,
      comment: processScore >= 20 ? "Процессы готовы к AI-оптимизации" : processScore >= 15 ? "Нужна стандартизация перед внедрением AI" : "Сначала необходимо выстроить базовые процессы"
    });

    // 4. Budget & timeline
    maxScore += 25;
    const budgetScore = answers.budget === "high" ? 25 
      : answers.budget === "medium" ? 18 
      : answers.budget === "low" ? 8 : 12;
    score += budgetScore;
    breakdown.push({ 
      category: "Бюджет и сроки", 
      score: budgetScore, 
      max: 25,
      comment: budgetScore >= 20 ? "Достаточные ресурсы для полноценного внедрения" : budgetScore >= 15 ? "Возможен поэтапный подход" : "Рекомендуем начать с пилотного проекта"
    });

    const percentage = Math.round((score / maxScore) * 100);
    
    let level: string;
    let recommendation: string;
    if (percentage >= 80) {
      level = "Высокая готовность";
      recommendation = "Ваша компания готова к полноценному внедрению AI-Native подхода. Рекомендуем начать с комплексного аудита и разработки стратегии трансформации.";
    } else if (percentage >= 55) {
      level = "Средняя готовность";
      recommendation = "У вас хорошая база, но есть области для улучшения. Рекомендуем начать с пилотного проекта и параллельно усиливать слабые стороны.";
    } else {
      level = "Начальная стадия";
      recommendation = "Рекомендуем начать с подготовительного этапа: структурирование данных, обучение команды и стандартизация процессов. Мы поможем составить пошаговый план.";
    }

    const report = {
      sessionId,
      companyName: answers.company_name || "Не указано",
      industry: answers.industry || "Не указано",
      score: percentage,
      level,
      recommendation,
      breakdown,
      generatedAt: new Date().toISOString(),
    };

    session.completed = true;
    session.report = report;
    await kv.set(`chat_session:${sessionId}`, session);

    console.log(`Generated report for session ${sessionId}: score=${percentage}%`);
    return c.json({ report });
  } catch (error) {
    console.log(`Error generating report: ${error}`);
    return c.json({ error: `Failed to generate report: ${error}` }, 500);
  }
});

// Get report by session ID
app.get("/make-server-1ff134d3/chat-report/:sessionId", async (c) => {
  try {
    const sessionId = c.req.param("sessionId");
    const session = await kv.get(`chat_session:${sessionId}`);
    if (!session || !session.report) {
      return c.json({ error: "Report not found" }, 404);
    }
    return c.json({ report: session.report });
  } catch (error) {
    console.log(`Error fetching report: ${error}`);
    return c.json({ error: `Failed to fetch report: ${error}` }, 500);
  }
});

// Send report via email using Resend
app.post("/make-server-1ff134d3/chat-send-email", async (c) => {
  try {
    const { sessionId, email } = await c.req.json();
    if (!sessionId || !email) {
      return c.json({ error: "Missing sessionId or email" }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    const session = await kv.get(`chat_session:${sessionId}`);
    if (!session || !session.report) {
      return c.json({ error: "Report not found for this session" }, 404);
    }

    const report = session.report;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured");
      return c.json({ error: "Email service not configured" }, 500);
    }

    const scoreColor = report.score >= 80 ? "#34d399" : report.score >= 55 ? "#fbbf24" : "#f87171";
    const scoreBg = report.score >= 80 ? "#065f46" : report.score >= 55 ? "#78350f" : "#7f1d1d";

    const breakdownHtml = report.breakdown.map((item: any) => {
      const pct = Math.round((item.score / item.max) * 100);
      const barColor = pct >= 80 ? "#34d399" : pct >= 55 ? "#fbbf24" : "#f87171";
      return `
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #1e1e2e;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #a0a0b8; font-size: 14px;">${item.category}</span>
              <span style="color: #6b6b80; font-size: 14px; font-family: monospace;">${item.score}/${item.max}</span>
            </div>
            <div style="height: 6px; background: #1a1a2e; border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
              <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 3px;"></div>
            </div>
            <div style="color: #6b6b80; font-size: 12px;">${item.comment}</div>
          </td>
        </tr>`;
    }).join("");

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #08080f; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #08080f;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width: 560px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <span style="color: rgba(255,255,255,0.9); font-size: 18px; letter-spacing: 0.5px;">coMind</span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f0f1a 0%, #12121f 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 40px 32px;">
              
              <!-- Title -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: rgba(168,85,247,0.6); margin-bottom: 12px;">Отчёт готовности к AI</div>
                <div style="font-size: 16px; color: rgba(255,255,255,0.5);">${report.companyName}</div>
              </div>

              <!-- Score -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: #0a0a14; border: 3px solid ${scoreColor}; line-height: 114px; text-align: center;">
                  <span style="font-size: 36px; font-family: monospace; color: ${scoreColor}; font-weight: 600;">${report.score}%</span>
                </div>
                <div style="margin-top: 16px;">
                  <span style="display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 12px; color: ${scoreColor}; background: ${scoreBg}20; border: 1px solid ${scoreColor}30;">${report.level}</span>
                </div>
              </div>

              <!-- Breakdown -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${breakdownHtml}
              </table>

              <!-- Recommendation -->
              <div style="margin-top: 24px; padding: 20px; background: rgba(168,85,247,0.05); border: 1px solid rgba(168,85,247,0.1); border-radius: 12px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: rgba(168,85,247,0.5); margin-bottom: 10px;">Рекомендация</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6;">${report.recommendation}</div>
              </div>

              <!-- CTA -->
              <div style="text-align: center; margin-top: 32px;">
                <a href="https://t.me/Ctrain2042" style="display: inline-block; padding: 14px 32px; background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.25); border-radius: 12px; color: rgba(196,148,255,0.9); font-size: 14px; text-decoration: none; letter-spacing: 0.3px;">
                  Обсудить результаты с экспертом →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <div style="color: rgba(255,255,255,0.2); font-size: 12px; margin-bottom: 8px;">
                © coMind ${new Date().getFullYear()}
              </div>
              <a href="https://comind.space" style="color: rgba(168,85,247,0.4); font-size: 12px; text-decoration: none;">comind.space</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "coMind AI Report <noreply@comind.space>",
        to: [email],
        subject: `Отчёт AI-готовности: ${report.companyName} — ${report.score}%`,
        html: htmlContent,
      }),
    });

    const resendData = await resendResponse.json();
    
    if (!resendResponse.ok) {
      console.log(`Resend API error: ${JSON.stringify(resendData)}`);
      return c.json({ error: `Email sending failed: ${resendData.message || JSON.stringify(resendData)}` }, 500);
    }

    // Save email to session
    session.emailSentTo = email;
    session.emailSentAt = new Date().toISOString();
    await kv.set(`chat_session:${sessionId}`, session);

    console.log(`Report email sent to ${email} for session ${sessionId}, resend id: ${resendData.id}`);
    return c.json({ success: true, emailId: resendData.id });
  } catch (error) {
    console.log(`Error sending report email: ${error}`);
    return c.json({ error: `Failed to send email: ${error}` }, 500);
  }
});

Deno.serve(app.fetch);