import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import SceneCanvas from '@/components/three/SceneCanvas';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import LiteModeToggle from '@/components/LiteModeToggle';
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
import { useSceneStore } from '@/stores/sceneStore';

const SECTION_IDS = ['home', 'fintech', 'projects', 'skills', 'experience', 'coding', 'architecture', 'contact'];

const Index = () => {
  const setActiveSection = useSceneStore((s) => s.setActiveSection);
  const setMouseXY = useSceneStore((s) => s.setMouseXY);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i); },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);

  useEffect(() => {
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 16) return;
      last = now;
      setMouseXY({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [setMouseXY]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SceneCanvas />
      <CustomCursor />
      <Navigation />
      <ScrollProgressIndicator />
      <LiteModeToggle />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <div id="fintech"><FintechProjects /></div>
        <div id="projects"><Projects /></div>
        <div id="skills"><Skills /></div>
        <div id="experience"><Timeline /></div>
        <div id="coding"><CodingProfiles /></div>
        <div id="architecture"><TechnicalArchitecture /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </div>

      <AIAssistant />
    </div>
  );
};

export default Index;
