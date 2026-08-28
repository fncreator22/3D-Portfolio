import { Hero } from "@/components/sections/Hero";
import { Identity } from "@/components/sections/Identity";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { SkillsDomain } from "@/components/sections/SkillsDomain";
import { HorizontalProjects } from "@/components/sections/HorizontalProjects";
import { ThinkingPhilosophy } from "@/components/sections/ThinkingPhilosophy";
import { Contact } from "@/components/sections/Contact";
import { ScrollSpine } from "@/components/ui/ScrollSpine";
import { Global3DBackground } from "@/components/ui/Global3DBackground";

export default function Home() {
  return (
    <>
      <Global3DBackground />
      <ScrollSpine />
      <div id="hero">
        <Hero />
      </div>
      <Identity />
      <JourneyTimeline />
      <SkillsDomain />
      <HorizontalProjects />
      <ThinkingPhilosophy />
      <Contact />
    </>
  );
}
