import { CheckSquare, CheckCircle2 } from "lucide-react";

export function ReadinessChecklist() {
  const startChecklist = [
    "CEO лично поддерживает инициативу",
    "Выбраны 2-3 процесса для первой фазы",
    "Зафиксирован Source of Truth",
    "Есть человек для сборки и обкатки",
    "Команда готова к изменению способа работы"
  ];

  const scalingChecklist = [
    "Шаблоны и стандарты для артефактов",
    "Quality Gates (DoR, DoD, Release Gate)",
    "5+ skills для основных ролей",
    "5+ MCP-интеграций",
    "Метрики собираются и анализируются",
    "Цикл bootstrapping запущен"
  ];

  return (
    <section className="py-20 px-6 lg:px-12 relative section-divider">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-2.5 mb-10">
          <CheckSquare className="w-5 h-5 text-purple-400/40" />
          <h2 className="text-2xl text-white/80 tracking-[-0.02em]">Чеклист готовности</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-6 bg-white/[0.02] rounded-xl border border-white/[0.05]">
            <h3 className="text-[13px] text-purple-400/60 mb-5 tracking-[0.04em] uppercase">Минимум для старта</h3>
            <ul className="space-y-3">
              {startChecklist.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400/30 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] text-white/40 leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-6 bg-white/[0.02] rounded-xl border border-white/[0.05]">
            <h3 className="text-[13px] text-purple-400/60 mb-5 tracking-[0.04em] uppercase">Для масштабирования</h3>
            <ul className="space-y-3">
              {scalingChecklist.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400/30 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] text-white/40 leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
