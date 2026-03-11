import { useState, useEffect } from "react";

const navItems = [
  { id: "audience", number: "01", label: "Аудитория" },
  { id: "paths", number: "02", label: "Пути развития" },
  { id: "roadmap", number: "03", label: "Дорожная карта" },
  { id: "mistakes", number: "04", label: "Ошибки" },
  { id: "principles", number: "05", label: "Принципы" },
  { id: "contact", number: "06", label: "Контакты" },
];

export function LeftSidebar({ onContactClick }: { onContactClick?: () => void }) {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile burger button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-[#0f0f1a]/95 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 lg:hidden sm:right-5 sm:top-5"
        aria-label="Toggle menu"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white/80 transition-all duration-300 origin-center ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white/80 transition-all duration-300 ${
              isMenuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white/80 transition-all duration-300 origin-center ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:w-[280px] xl:w-[300px] shrink-0 z-[95] lg:z-50
          w-[280px] bg-[#08080f] lg:bg-transparent
          transform transition-transform duration-300 ease-out lg:transform-none
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden relative hide-scrollbar">
          {/* Subtle border on the right */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

          <div className="flex flex-col h-full p-6 lg:p-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-12 lg:mb-16">
              <span className="text-[17px] tracking-[0.02em] text-white/90">coMind</span>
            </div>

            {/* Navigation items */}
            <nav className="flex flex-col gap-0.5 mb-auto">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleLinkClick}
                    className={`group flex items-baseline gap-3 py-2.5 px-3 -mx-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/[0.04] text-white"
                        : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span
                      className={`text-[11px] tabular-nums font-mono transition-colors duration-300 ${
                        isActive ? "text-purple-400" : "text-white/20 group-hover:text-white/30"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-[13px] tracking-[0.01em]">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Footer links */}
            <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/[0.04]">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onContactClick?.(); }}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-purple-500/10 text-purple-300/90 text-[12px] tracking-[0.02em] border border-purple-500/15 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-500/25 transition-all duration-300"
              >
                AI-диагностика
              </a>
              <a
                href="https://comind.space/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-white/25 hover:text-purple-400/70 transition-colors duration-300"
              >
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
