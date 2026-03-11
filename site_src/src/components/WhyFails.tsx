export function WhyFails() {
  return (
    <section className="py-24 px-6 lg:px-12 relative section-divider">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white leading-[1.08] tracking-[-0.02em]">
            Почему внедрения ИИ проваливаются
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative">
            <div className="relative bg-white/[0.02] p-10 rounded-2xl border border-white/[0.05] text-center">
              <div className="text-7xl md:text-8xl mb-3 font-mono tracking-[-0.04em] bg-gradient-to-b from-purple-300/80 to-purple-500/60 bg-clip-text text-transparent">
                ~11%
              </div>
              <p className="text-[15px] text-white/40 leading-[1.6] mb-3">
                компаний масштабировали<br />хотя бы один юзкейс GenAI
              </p>
              <p className="text-[11px] text-white/20 tracking-[0.04em]">
                McKinsey, State of AI 2024
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl text-white/80 mb-4 tracking-[-0.01em]">Причина одна:</h3>
              <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                <p className="text-xl md:text-2xl text-purple-300/70 leading-[1.4] tracking-[-0.01em]">
                  ИИ прикручивают поверх старых процессов,{' '}
                  <span className="text-white/60">а не делают ядром новых</span>
                </p>
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.015] border border-white/[0.04] rounded-xl">
              <p className="text-[14px] italic text-white/30 leading-[1.7]">
                «Это как раздать калькуляторы и ждать, что бухгалтерия сама перестроится. Инструмент без процесса — просто игрушка.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
