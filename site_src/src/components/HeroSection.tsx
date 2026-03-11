export function HeroSection({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-18 sm:px-6 lg:px-12 lg:pb-24 lg:pt-24">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[-200px] w-[800px] h-[800px] bg-purple-600/[0.07] rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-[-300px] w-[600px] h-[600px] bg-violet-600/[0.05] rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Intro header — centered layout */}
        <div className="relative mx-auto mb-16 flex max-w-3xl flex-col items-center text-center sm:mb-20 lg:mb-24">
          {/* Glow effect behind heading */}
          <div className="pointer-events-none absolute left-1/2 top-8 h-[200px] w-[320px] -translate-x-1/2 bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-transparent blur-[80px] sm:w-[400px]"></div>
          
          <h1 className="relative z-10 mb-6 text-4xl leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl xl:text-8xl">
            Путь к{' '}
            <span 
              className="text-transparent bg-clip-text bg-[length:200%_200%]" 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #a78bfa, #8b5cf6, #7c3aed, #a78bfa)',
                animation: 'gradient-shift 4s ease infinite'
              }}
            >
              AI-Native
            </span>
          </h1>
          <p className="relative z-10 mb-10 max-w-2xl text-sm leading-[1.7] tracking-[0.01em] text-white/40 sm:text-base md:text-lg lg:mb-12">
            Практический гайд для компаний. Трансформируйте бизнес с помощью искусственного интеллекта без лишних рисков. Этот гайд описывает проверенный подход: от аудита процессов до масштабирования AI-Native операционной модели.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onContactClick?.(); }}
            className="group relative z-10 inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.06] px-6 py-4 text-[14px] tracking-[0.01em] text-white transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.1] sm:px-8"
          >
            Пройти AI-диагностику
            <svg className="w-4 h-4 text-white/40 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Bento metric cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Accuracy card */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-500 group">
            <div className="text-[10px] text-white/25 uppercase tracking-[0.12em] mb-6">Accuracy</div>
            <div>
              <div className="text-4xl text-white font-mono tracking-[-0.02em]">98.7<span className="text-emerald-400/50 text-base ml-0.5">%</span></div>
              <div className="mt-4 h-px bg-white/[0.04] overflow-hidden rounded-full">
                <div className="h-full w-[98%] bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Latency card */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-500 group">
            <div className="text-[10px] text-white/25 uppercase tracking-[0.12em] mb-6">Latency</div>
            <div>
              <div className="text-4xl text-white font-mono tracking-[-0.02em]">12<span className="text-purple-400/50 text-base ml-0.5">ms</span></div>
              <div className="mt-4 h-px bg-white/[0.04] overflow-hidden rounded-full">
                <div className="h-full w-[12%] bg-gradient-to-r from-purple-500/30 to-violet-400/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* ROI card */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-500 group">
            <div className="text-[10px] text-white/25 uppercase tracking-[0.12em] mb-6">ROI</div>
            <div>
              <div className="text-4xl text-white font-mono tracking-[-0.02em]">10<span className="text-amber-400/50 text-base ml-0.5">x</span></div>
              <div className="mt-4 h-px bg-white/[0.04] overflow-hidden rounded-full">
                <div className="h-full w-[85%] bg-gradient-to-r from-amber-500/30 to-orange-400/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Neural network card */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 overflow-hidden relative hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-500 group">
            <div className="text-[10px] text-white/25 uppercase tracking-[0.12em] mb-4">Network</div>
            <svg className="w-full h-16" viewBox="0 0 160 60" fill="none">
              <line x1="20" y1="15" x2="60" y2="10" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />
              <line x1="20" y1="15" x2="60" y2="30" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5" />
              <line x1="20" y1="15" x2="60" y2="50" stroke="rgba(168,85,247,0.06)" strokeWidth="0.5" />
              <line x1="20" y1="45" x2="60" y2="10" stroke="rgba(168,85,247,0.06)" strokeWidth="0.5" />
              <line x1="20" y1="45" x2="60" y2="30" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5" />
              <line x1="20" y1="45" x2="60" y2="50" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />
              <line x1="60" y1="10" x2="100" y2="20" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
              <line x1="60" y1="30" x2="100" y2="20" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5" />
              <line x1="60" y1="30" x2="100" y2="40" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5" />
              <line x1="60" y1="50" x2="100" y2="40" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
              <line x1="100" y1="20" x2="140" y2="30" stroke="rgba(52,211,153,0.12)" strokeWidth="0.5" />
              <line x1="100" y1="40" x2="140" y2="30" stroke="rgba(52,211,153,0.12)" strokeWidth="0.5" />
              <circle cx="20" cy="15" r="2.5" fill="rgba(168,85,247,0.25)" className="animate-pulse" style={{ animationDuration: '3s' }} />
              <circle cx="20" cy="45" r="2.5" fill="rgba(168,85,247,0.25)" className="animate-pulse" style={{ animationDuration: '4s' }} />
              <circle cx="60" cy="10" r="2" fill="rgba(139,92,246,0.2)" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
              <circle cx="60" cy="30" r="2" fill="rgba(139,92,246,0.2)" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
              <circle cx="60" cy="50" r="2" fill="rgba(139,92,246,0.2)" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
              <circle cx="100" cy="20" r="2" fill="rgba(99,102,241,0.2)" className="animate-pulse" style={{ animationDuration: '3s' }} />
              <circle cx="100" cy="40" r="2" fill="rgba(99,102,241,0.2)" className="animate-pulse" style={{ animationDuration: '3.8s' }} />
              <circle cx="140" cy="30" r="3" fill="rgba(52,211,153,0.25)" className="animate-pulse" style={{ animationDuration: '2s' }} />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#08080f] to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
