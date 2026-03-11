import { AlertCircle } from "lucide-react";

export function TypicalMistakes() {
  const mistakesPart1 = [
    {
      title: "Прикрутить, а не пересобрать",
      description: "ChatGPT-виджет поверх legacy CRM. Нет контекста, нет правил, нет Source of Truth. Эффект — близок к нулю.",
    },
    {
      title: "50 пилотов вместо трёх ставок",
      description: "Каждый отдел делает свой пилот. Ни один не получает ресурсов. Через полгода — коллекция демо и ноль production-систем.",
    },
    {
      title: "Агент решает сам",
      description: "Мы сами попались: агент генерировал КП и отправлял без проверки. Теперь правило: агент готовит — человек утверждает.",
    },
    {
      title: "Один промпт на все случаи",
      description: "«Ты — помощник. Делай всё». Контекст размывается. 20 специализированных skills на порядок лучше одного «универсального».",
    }
  ];

  const mistakesPart2 = [
    {
      title: "Внедрение без обучения",
      description: "Дали доступ, но не научили работать в паре. Сотрудники используют 10% возможностей.",
      note: "Обучение — про образ мышления, не про кнопки"
    },
    {
      title: "Интеграции без Source of Truth",
      description: "Подключили 5 систем, но данные дублируются и противоречат.",
      note: "Фиксируйте SoT до подключения первого MCP"
    },
    {
      title: "Нет метрик эффекта",
      description: "«Кажется, стало быстрее» — не считается.",
      note: "Throughput, cycle time, DoR pass rate — с первого дня"
    }
  ];

  return (
    <section className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Part 1 */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <AlertCircle className="w-5 h-5 text-white/20" />
            <h3 className="text-xl text-white/70 tracking-[-0.01em]">Типичные ошибки (1/2)</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            {mistakesPart1.map((mistake, index) => (
              <div
                key={index}
                className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500"
              >
                <h4 className="text-[15px] text-white/60 mb-2 tracking-[-0.01em]">{mistake.title}</h4>
                <p className="text-[14px] text-white/30 leading-[1.6]">{mistake.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2 */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <AlertCircle className="w-5 h-5 text-white/20" />
            <h3 className="text-xl text-white/70 tracking-[-0.01em]">Типичные ошибки (2/2)</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {mistakesPart2.map((mistake, index) => (
              <div
                key={index}
                className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500"
              >
                <h4 className="text-[15px] text-white/60 mb-2 tracking-[-0.01em]">{mistake.title}</h4>
                <p className="text-[14px] text-white/30 leading-[1.6] mb-2">{mistake.description}</p>
                <p className="text-[12px] text-white/20 italic">{mistake.note}</p>
              </div>
            ))}
          </div>
          
          <div className="p-5 border-l border-white/[0.06] bg-white/[0.01] rounded-r-xl">
            <p className="text-[14px] italic text-white/25 leading-[1.7]">
              Без метрик через квартал вы не сможете доказать ROI ни себе, ни руководству
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
