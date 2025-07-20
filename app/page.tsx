import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { BuyResumeSection } from '@/components/sections/BuyResumeSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <BuyResumeSection />
    </main>
  );
}