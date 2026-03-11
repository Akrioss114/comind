import { ArrowRight } from "lucide-react";

export function FailureScenario() {
  const steps = [
    {
      number: "1",
      text: "Купили лицензии на ChatGPT / Copilot",
    },
    {
      number: "2",
      text: "Провели тренинг «как пользоваться ИИ»",
    },
    {
      number: "3",
      text: "Каждый сотрудник сам решает, когда и как применять",
    },
    {
      number: "4",
      text: "Через 3 месяца: «кто-то использует, но в целом ничего не изменилось»",
      highlight: true
    }
  ];

  return (
    <section className="relative px-[35px] py-[0px]">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="border-t border-white/[0.04] pt-16">
          <h2 className="text-3xl md:text-4xl text-white leading-[1.08] tracking-[-0.02em] mb-12">
            Типичный сценарий провала
          </h2>
          
          <div className="space-y-2 mb-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border transition-all duration-300 ${
                  step.highlight
                    ? 'bg-white/[0.03] border-white/[0.08]'
                    : 'bg-white/[0.015] border-white/[0.04] hover:border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[12px] font-mono w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                    step.highlight 
                      ? 'bg-purple-500/15 text-purple-300/80' 
                      : 'bg-white/[0.04] text-white/30'
                  }`}>
                    {step.number}
                  </span>
                  <p className={`text-[15px] leading-[1.5] ${step.highlight ? 'text-white/70' : 'text-white/50'}`}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-3 p-6 bg-white/[0.02] rounded-xl border border-white/[0.05]">
            <ArrowRight className="w-5 h-5 text-purple-400/50" />
            <p className="text-lg text-purple-300/60 tracking-[-0.01em]">
              Инструмент без процесса = игрушка
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
