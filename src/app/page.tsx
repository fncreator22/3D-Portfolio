import { Hero } from "@/components/sections/Hero";
import { LetterPortalTransition } from "@/components/effects/LetterPortalTransition";
import { Identity } from "@/components/sections/Identity";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { SkillsDomain } from "@/components/sections/SkillsDomain";
import { HorizontalProjects } from "@/components/sections/HorizontalProjects";
import { ThinkingPhilosophy } from "@/components/sections/ThinkingPhilosophy";
import { Contact } from "@/components/sections/Contact";
import { Global3DBackground } from "@/components/ui/Global3DBackground";

export default function Home() {
  return (
    <>
      <Global3DBackground />
      <div id="main-content" className="w-full max-w-full overflow-x-clip">
        <div id="hero">
          <Hero />
        </div>
        <LetterPortalTransition>
          <Identity />
        </LetterPortalTransition>
        <JourneyTimeline />
        <SkillsDomain />
        <HorizontalProjects />
        <ThinkingPhilosophy />
        <Contact />
      </div>
    </>
  );
}
