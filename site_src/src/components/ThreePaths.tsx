export function ThreePaths() {
  return (
    <section id="paths" className="relative section-divider px-[7px] pt-[45px] pb-[20px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-[11px] tracking-[0.12em] uppercase text-purple-400/50 mb-4 block">02</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.03em] mb-4">
          Три пути к{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300/80 to-violet-400/80">AI-Native</span>
        </h2>
        <p className="text-lg text-white/35 leading-relaxed">
          Путь зависит от стартовой позиции
        </p>
      </div>
    </section>
  );
}