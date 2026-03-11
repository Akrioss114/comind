import { CheckCircle2 } from "lucide-react";

export function RoadmapPhase() {
  return (
    <section className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/15 bg-purple-500/[0.06] mb-5">
            <span className="text-[11px] text-purple-300/70 tracking-[0.06em] uppercase">Фаза 1</span>
          </div>
          <h3 className="text-3xl text-white/90 tracking-[-0.02em] mb-2">Аудит и Source of Truth</h3>
          <p className="text-white/30 text-base">Недели 1-2</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <h4 className="text-[13px] text-purple-400/60 mb-3 tracking-[0.02em]">1. Картирование</h4>
            <p className="text-[14px] text-white/40 leading-[1.6]">
              Все процессы компании: кто делает, сколько времени, где данные
            </p>
          </div>
          
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <h4 className="text-[13px] text-purple-400/60 mb-3 tracking-[0.02em]">2. Классификация</h4>
            <ul className="space-y-2 text-[14px]">
              <li className="flex items-start gap-2">
                <span className="text-purple-400/30 mt-0.5">·</span>
                <span className="text-white/40"><span className="text-purple-300/50">Delegate</span> — рутина с чёткими правилами</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400/30 mt-0.5">·</span>
                <span className="text-white/40"><span className="text-purple-300/50">Review</span> — агент готовит, человек утверждает</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400/30 mt-0.5">·</span>
                <span className="text-white/40"><span className="text-purple-300/50">Own</span> — стратегия, отношения, творчество</span>
              </li>
            </ul>
          </div>
          
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <h4 className="text-[13px] text-purple-400/60 mb-3 tracking-[0.02em]">3. Source of Truth</h4>
            <p className="text-[14px] text-white/40 leading-[1.6] mb-2">
              Один и только один источник правды для каждого типа данных
            </p>
            <p className="text-[12px] text-white/20">
              CRM, Трекер, Git, Wiki, Мессенджер
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-purple-400/40 flex-shrink-0 mt-0.5" />
          <p className="text-[14px] text-white/40">
            <span className="text-purple-300/50">Результат:</span> карта процессов Delegate/Review/Own + зафиксированный Source of Truth
          </p>
        </div>
      </div>
    </section>
  );
}
