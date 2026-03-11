import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { LeftSidebar } from "./components/LeftSidebar";
import { TargetAudience } from "./components/TargetAudience";
import { WhyFails } from "./components/WhyFails";
import { FailureScenario } from "./components/FailureScenario";
import { ThreePaths } from "./components/ThreePaths";
import { PathCards } from "./components/PathCards";
import { Roadmap } from "./components/Roadmap";
import { RoadmapPhase } from "./components/RoadmapPhase";
import { PhaseTwo } from "./components/PhaseTwo";
import { PhaseThree } from "./components/PhaseThree";
import { PhaseFour } from "./components/PhaseFour";
import { MistakesAndPrinciples } from "./components/MistakesAndPrinciples";
import { TypicalMistakes } from "./components/TypicalMistakes";
import { ReadinessChecklist } from "./components/ReadinessChecklist";
import { WorkingPrinciples } from "./components/WorkingPrinciples";
import { ContactSection } from "./components/ContactSection";
import { ChatBot } from "./components/ChatBot";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#08080f] font-sans antialiased text-white lg:flex-row">
      <LeftSidebar onContactClick={openChat} />
      <main className="flex-1 min-w-0">
        <HeroSection onContactClick={openChat} />
        <TargetAudience />
        <WhyFails />
        <FailureScenario />
        <ThreePaths />
        <PathCards />
        <Roadmap />
        <RoadmapPhase />
        <PhaseTwo />
        <PhaseThree />
        <PhaseFour />
        <MistakesAndPrinciples />
        <TypicalMistakes />
        <ReadinessChecklist />
        <WorkingPrinciples />
        <ContactSection onContactClick={openChat} />
      </main>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
