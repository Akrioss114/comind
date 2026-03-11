import { Lightbulb } from "lucide-react";

export function WorkingPrinciples() {
  const principles = [
    {
      title: "Customer-back",
      description: "Начинайте с боли клиента, не с «у нас есть GPT-4»",
    },
    {
      title: "Narrow & deep",
      description: "Один процесс полностью > десять частично",
    },
    {
      title: "Feedback loops",
      description: "Каждый цикл улучшает систему. Bootstrapping — архитектурный фундамент",
    },
    {
      title: "Люди + агенты",
      description: "Суждение — людям, исполнение по шаблонам — агентам",
    },
    {
      title: "Скорость > совершенство",
      description: "Работающий MVP за неделю лучше идеальной архитектуры через полгода",
    },
    {
      title: "Governance с дня 1",
      description: "Guardrails, мониторинг, аудит действий, ответственность",
    }
  ];

  return (
    <section id="principles" className="py-24 px-6 lg:px-12 relative section-divider">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="text-[11px] tracking-[0.12em] uppercase text-purple-400/50 mb-4 block">05</span>
          <div className="flex items-center gap-2.5">
            <Lightbulb className="w-5 h-5 text-purple-400/40" />
            <h2 className="text-2xl text-white/80 tracking-[-0.02em]">Принципы, которые работают</h2>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.07] transition-all duration-500 group"
            >
              <h3 className="text-[15px] text-white/60 mb-2 tracking-[-0.01em] group-hover:text-white/75 transition-colors duration-500">{principle.title}</h3>
              <p className="text-[14px] text-white/30 leading-[1.6]">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
