import { RefreshCcw, Users, AlertTriangle } from "lucide-react";

export function TargetAudience() {
  const audiences = [
    {
      icon: RefreshCcw,
      title: "Рынок меняется — ИИ стал операционной необходимостью",
    },
    {
      icon: Users,
      title: "Вы уже пробовали «внедрить ИИ» — лицензии, пилоты, обучение",
    },
    {
      icon: AlertTriangle,
      title: "Результат — разочаровывающий",
    }
  ];

  return (
    <section id="audience" className="py-24 px-6 lg:px-12 relative section-divider">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-[11px] tracking-[0.12em] uppercase text-purple-400/50 mb-4 block">01</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white leading-[1.08] tracking-[-0.02em] mb-4">
            Для кого этот гайд
          </h2>
          <p className="text-white/35 text-lg leading-relaxed">
            Вы — <span className="text-purple-400/80">CEO, CTO или руководитель</span>, который видит:
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3">
          {audiences.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 group"
            >
              <item.icon className="w-5 h-5 text-purple-400/50 mb-5 group-hover:text-purple-400/70 transition-colors duration-500" />
              <p className="text-[15px] text-white/70 leading-[1.6]">{item.title}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 border-l border-purple-500/20 bg-white/[0.01] rounded-r-xl">
          <p className="text-[15px] text-white/35 leading-[1.7] italic">
            Мы покажем, как вы можете пройти путь к AI-Native. С учётом ошибок, которые мы видим у клиентов и совершали сами.
          </p>
        </div>
      </div>
    </section>
  );
}
