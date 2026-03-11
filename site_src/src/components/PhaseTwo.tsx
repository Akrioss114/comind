import { FileText, Shield, BookOpen, CheckCircle2 } from "lucide-react";

export function PhaseTwo() {
  return (
    <section className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/15 bg-purple-500/[0.06] mb-5">
            <span className="text-[11px] text-purple-300/70 tracking-[0.06em] uppercase">Фаза 2</span>
          </div>
          <h3 className="text-3xl text-white/90 tracking-[-0.02em] mb-2">Шаблоны и стандарты</h3>
          <p className="text-white/30 text-base">Недели 2-3</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="p-6 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <div className="flex items-center gap-2.5 mb-5">
              <FileText className="w-5 h-5 text-purple-400/40" />
              <h4 className="text-[13px] text-purple-400/60 tracking-[0.02em]">Шаблоны артефактов</h4>
            </div>
            <ul className="space-y-2.5 text-[14px]">
              {["Карточка лида / клиента", "Коммерческое предложение", "Задача в трекере (AC, оценка, ссылки)", "Definition of Ready (чеклист)", "Release notes"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400/25 mt-0.5">·</span>
                  <span className="text-white/40">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
              <div className="flex items-center gap-2.5 mb-5">
                <Shield className="w-5 h-5 text-purple-400/40" />
                <h4 className="text-[13px] text-purple-400/60 tracking-[0.02em]">Quality Gates</h4>
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400/25 mt-0.5">·</span>
                  <span className="text-white/40"><span className="text-white/60">DoR</span> — что нужно для попадания в спринт</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400/25 mt-0.5">·</span>
                  <span className="text-white/40"><span className="text-white/60">DoD</span> — что нужно для «сделано»</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400/25 mt-0.5">·</span>
                  <span className="text-white/40"><span className="text-white/60">Release Gate</span> — что нужно для деплоя</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
              <div className="flex items-center gap-2.5 mb-4">
                <BookOpen className="w-5 h-5 text-purple-400/40" />
                <h4 className="text-[13px] text-purple-400/60 tracking-[0.02em]">Структура документации</h4>
              </div>
              <p className="text-[14px] text-white/40">Index, Requirements, ADR, Test Plan, Releases, Runbooks</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-purple-400/40 flex-shrink-0 mt-0.5" />
          <p className="text-[14px] text-white/40">
            <span className="text-purple-300/50">Результат:</span> набор шаблонов + правила качества для агента
          </p>
        </div>
      </div>
    </section>
  );
}
