import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FintechProjects from '@/components/FintechProjects';
import Projects from '@/components/Projects';
import TechnicalArchitecture from '@/components/TechnicalArchitecture';
import Skills from '@/components/Skills';
import CodingProfiles from '@/components/CodingProfiles';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import AIAssistant from '@/components/AIAssistant';

import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      <Hero />
      <FintechProjects />
      <div id="projects">
        <Projects />
      </div>
      <Skills />
      <div id="experience">
        <Timeline />
      </div>
      <CodingProfiles />
      <TechnicalArchitecture />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
