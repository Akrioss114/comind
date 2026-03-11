import { Server, Wrench, TestTube, CheckCircle2 } from "lucide-react";

export function PhaseThree() {
  return (
    <section className="py-12 px-6 lg:px-12 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/15 bg-purple-500/[0.06] mb-5">
            <span className="text-[11px] text-purple-300/70 tracking-[0.06em] uppercase">Фаза 3</span>
          </div>
          <h3 className="text-3xl text-white/90 tracking-[-0.02em] mb-2">Первые Skills и MCP</h3>
          <p className="text-white/30 text-base">Недели 3-5</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <div className="flex items-center gap-2.5 mb-5">
              <Server className="w-5 h-5 text-purple-400/40" />
              <h4 className="text-[13px] text-purple-400/60 tracking-[0.02em]">MCP-серверы</h4>
            </div>
            <p className="text-[14px] text-white/40 leading-[1.6] mb-2">Подключить 2-3 MCP к рабочим системам</p>
            <p className="text-[13px] text-white/25">
              <span className="text-white/40">Начните с трекера и Wiki</span> — это ядро
            </p>
          </div>
          
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <div className="flex items-center gap-2.5 mb-5">
              <Wrench className="w-5 h-5 text-purple-400/40" />
              <h4 className="text-[13px] text-purple-400/60 tracking-[0.02em]">Первые skills</h4>
            </div>
            <ul className="space-y-2.5 text-[14px] mb-3">
              <li className="flex items-start gap-2">
                <span className="text-purple-400/25 mt-0.5">·</span>
                <span className="text-white/40"><span className="text-white/55">PM</span> — декомпозиция задач, проверка DoR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400/25 mt-0.5">·</span>
                <span className="text-white/40"><span className="text-white/55">Sales</span> — обработка лидов, генерация КП</span>
              </li>
            </ul>
            <p className="text-[12px] text-white/20">Самая частая рутина + самый быстрый ROI</p>
          </div>
          
          <div className="p-5 bg-white/[0.02] rounded-xl border border-white/[0.05] hover:border-white/[0.07] transition-all duration-500">
            <div className="flex items-center gap-2.5 mb-5">
              <TestTube className="w-5 h-5 text-purple-400/40" />
              <h4 className="text-[13px] text-purple-400/60 tracking-[0.02em]">Обкатка</h4>
            </div>
            <p className="text-[14px] text-white/40 leading-[1.6] mb-2">
              На <span className="text-white/55">реальных задачах</span>, не на тестовых данных
            </p>
            <p className="text-[14px] text-white/40 leading-[1.6]">
              На живом проекте, с <span className="text-white/55">живым клиентом</span>
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-purple-400/40 flex-shrink-0 mt-0.5" />
          <p className="text-[14px] text-white/40">
            <span className="text-purple-300/50">Результат:</span> работающая система с 2-3 ролями, подключённая к реальным системам
          </p>
        </div>
      </div>
    </section>
  );
}
