import { RefreshCcw, GitBranch, Sprout, Clock, Key } from "lucide-react";

export function PathCards() {
  const paths = [
    {
      icon: RefreshCcw,
      number: "1",
      title: "Трансформация",
      subtitle: "Для среднего и крупного бизнеса с работающими процессами",
      essence: {
        title: "Суть",
        description: "Не автоматизировать старые процессы, а пересобрать их с ИИ в ядре",
        detail: "Вы меняете двигатель на самолёте в полёте"
      },
      timeline: {
        title: "Сроки",
        period: "6-18 месяцев",
        note: "до первых значимых результатов"
      },
      keyCondition: {
        icon: Key,
        text: "решение CEO. Не CTO, не IT-директора, не инновационной лаборатории. CEO лично."
      }
    },
    {
      icon: GitBranch,
      number: "2",
      title: "AI-Native спиноф",
      subtitle: "Для корпораций с уникальными данными, но тяжёлым legacy",
      essence: {
        title: "Суть",
        description: "Отдельная команда строит с нуля — без legacy-ограничений, но с доступом к корпоративным ресурсам",
        detail: ""
      },
      timeline: {
        title: "Сроки",
        period: "3-12 месяцев",
        note: "Внешние клиенты с первого дня"
      },
      keyCondition: {
        icon: Key,
        text: "настоящая независимость. Предприниматель во главе. Если спиноф отчитывается через три уровня согласований — это ещё один отдел."
      }
    },
    {
      icon: Sprout,
      number: "3",
      title: "AI-Native с нуля",
      subtitle: "Для основателей с глубокой доменной экспертизой",
      essence: {
        title: "Суть",
        description: "ИИ — ядро операционной модели с первого дня. Концептуально самый простой путь.",
        detail: "Главный риск — product-market fit, не технология"
      },
      timeline: {
        title: "Сроки",
        period: "3-9 месяцев",
        note: "до первого продукта"
      },
      keyCondition: {
        icon: Key,
        text: "начать с боли клиента. «Мы используем GPT-4» — не ценностное предложение. «Мы сокращаем ваш цикл на 60%» — ценностное предложение."
      }
    }
  ];

  return (
    <section className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto space-y-4 relative z-10">
        {paths.map((path, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.07] transition-all duration-500"
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <path.icon className="w-5 h-5 text-purple-400/60" />
              </div>
              <div>
                <h3 className="text-2xl text-white/90 tracking-[-0.02em] mb-1">Путь {path.number}: {path.title}</h3>
                <p className="text-[14px] text-white/30">{path.subtitle}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCcw className="w-4 h-4 text-purple-400/40" />
                  <h4 className="text-[12px] text-purple-400/60 tracking-[0.06em] uppercase">{path.essence.title}</h4>
                </div>
                <p className="text-[14px] text-white/50 leading-[1.6] mb-1">{path.essence.description}</p>
                {path.essence.detail && (
                  <p className="text-[13px] text-white/25 italic">{path.essence.detail}</p>
                )}
              </div>
              
              <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-purple-400/40" />
                  <h4 className="text-[12px] text-purple-400/60 tracking-[0.06em] uppercase">{path.timeline.title}</h4>
                </div>
                <p className="text-2xl text-white/70 mb-1 font-mono tracking-[-0.02em]">{path.timeline.period}</p>
                <p className="text-[13px] text-white/25">{path.timeline.note}</p>
              </div>
            </div>
            
            <div className="p-4 bg-white/[0.015] border border-white/[0.04] rounded-xl">
              <div className="flex items-start gap-3">
                <path.keyCondition.icon className="w-4 h-4 text-purple-400/40 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-purple-400/50 mb-1 tracking-[0.06em] uppercase">Ключевое условие</p>
                  <p className="text-[14px] text-white/40 leading-[1.6]">{path.keyCondition.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
