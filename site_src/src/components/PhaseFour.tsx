import { CheckCircle2 } from "lucide-react";

export function PhaseFour() {
  return (
    <section className="py-12 px-6 lg:px-12 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/15 bg-purple-500/[0.06] mb-5">
            <span className="text-[11px] text-purple-300/70 tracking-[0.06em] uppercase">Фаза 4</span>
          </div>
          <h3 className="text-3xl text-white/90 tracking-[-0.02em] mb-2">Масштабирование</h3>
          <p className="text-white/30 text-base">Недели 5-12</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          {[
            { num: "1", title: "Новые skills по необходимости", text: "По одному, когда появляется реальная потребность. Skills «на будущее» приходится переделывать." },
            { num: "2", title: "Подключение новых MCP", text: "CRM, мессенджер, календарь, ресурсное планирование" },
            { num: "3", title: "Обучение команды", text: "Не «как пользоваться ChatGPT», а как работать в паре с агентом" },
            { num: "4", title: "Цикл bootstrapping", text: "Метрики → шаблоны → skills. Система, которая не улучшается — дегредирует." }
          ].map((item, index) => (
            <div key={index} className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] font-mono w-6 h-6 rounded-md bg-white/[0.04] text-white/30 flex items-center justify-center flex-shrink-0">
                  {item.num}
                </span>
                <h4 className="text-[15px] text-white/70">{item.title}</h4>
              </div>
              <p className="text-[14px] text-white/35 leading-[1.6] pl-9">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-purple-400/40 flex-shrink-0 mt-0.5" />
          <p className="text-[14px] text-white/40">
            <span className="text-purple-300/50">Результат:</span> AI-Native операционная модель, покрывающая основные процессы
          </p>
        </div>
      </div>
    </section>
  );
}
