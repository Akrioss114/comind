import { Mail, Phone } from "lucide-react";
import profilePhoto from "figma:asset/310b81a156ec643e2bf4731530590e1a00c6100f.png";

export function ContactSection({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <section id="contact" className="section-divider relative overflow-hidden px-5 py-20 sm:px-6 lg:px-12 lg:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.05] rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-[11px] tracking-[0.12em] uppercase text-purple-400/50 mb-4 block">06</span>
        
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-12">
          <div>
            <div className="mb-6">
              <span className="text-[17px] text-white/90 tracking-[0.02em]">coMind</span>
            </div>
            
            <h2 className="mb-4 text-3xl tracking-[-0.02em] text-white/90">Короткая AI-диагностика</h2>
            <p className="mb-8 max-w-xl text-sm leading-7 text-white/45 sm:text-[15px]">
              Откройте диалог, ответьте на несколько вопросов о компании и оставьте контакты. После этого бот подготовит мини-отчёт по готовности к внедрению ИИ и попробует отправить его на почту.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-lg text-white/60 mb-1">Александр Макаров</p>
                <p className="text-[14px] text-white/25 mb-5">Генеральный директор CoMind</p>
                
                <div className="space-y-3">
                  <a href="tel:+79104542963" className="flex items-center gap-3 text-[14px] text-purple-300/50 hover:text-purple-300/70 transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                    <span>+7 910 454 2963</span>
                  </a>
                  <a href="mailto:am@comind.space" className="flex items-center gap-3 text-[14px] text-purple-300/50 hover:text-purple-300/70 transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                    <span>am@comind.space</span>
                  </a>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/[0.04]">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); onContactClick?.(); }}
                  className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white/[0.06] text-white rounded-xl hover:bg-white/[0.1] transition-all duration-300 text-[14px] tracking-[0.01em] border border-white/[0.08] hover:border-white/[0.12]"
                >
                  Получить мини-отчёт
                  <svg className="w-4 h-4 text-white/30 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
              <div className="w-56 h-56 mx-auto overflow-hidden rounded-2xl border border-white/[0.06]">
                <img 
                  src={profilePhoto} 
                  alt="Александр Макаров" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center mt-5 text-[15px] text-white/50">Александр Макаров</p>
              <p className="text-center mt-1 text-[12px] text-white/25">Генеральный директор CoMind</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
