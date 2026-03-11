export function Roadmap() {
  return (
    <section id="roadmap" className="relative section-divider px-[48px] py-[45px]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-[11px] tracking-[0.12em] uppercase text-purple-400/50 mb-4 block">03</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.03em] mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300/80 to-violet-400/80">Пошаговый план</span>
        </h2>
        <p className="text-lg text-white/35 leading-relaxed">
          4 фазы от текущего состояния до AI-Native
        </p>
      </div>
    </section>
  );
}
