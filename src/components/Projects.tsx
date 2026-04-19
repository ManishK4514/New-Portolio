import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/usePortfolioData';
import socialCircle from '@/assets/social-circle.png';
import socializespot from '@/assets/socializespot.png';
import filmfliker from '@/assets/filmfliker.png';
import noteapp from '@/assets/noteapp.png';
import portfolio from '@/assets/portfolio.png';
import disneyClone from '@/assets/disney-clone.png';

interface Project {
  id: number | string;
  title: string;
  points: string[];
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const defaultProjects: Project[] = [
  {
    id: 1, title: 'SocialCircle – Social Media Platform',
    points: ['Full-stack MERN social platform with real-time features serving 100+ active users', 'RESTful APIs with optimized MongoDB schema for complex social relationships', 'Dynamic user search, profiles, and news feed with seamless UX'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Redis', 'AWS S3', 'Socket.io'],
    image: socialCircle, liveUrl: 'https://socialcircle.vercel.app/', githubUrl: 'https://github.com/ManishK4514/SocialCircle',
  },
  {
    id: 2, title: 'Socializespot – Blog Website',
    points: ['Complete blogging platform with authentication, CRUD, and category management', 'Rich text editor with image uploads and advanced search functionality', 'Social features including likes, shares, follows, and real-time comments'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
    image: socializespot, liveUrl: 'https://socializespot.vercel.app/', githubUrl: 'https://github.com/ManishK4514/Socializespot',
  },
  {
    id: 3, title: 'FilmFliker – Movie Catalog',
    points: ['Modern movie browser with advanced search and filtering', 'Third-party API integration for movie data and reviews', 'Clean, responsive design for all devices'],
    tech: ['React.js', 'JavaScript', 'CSS', 'REST API'],
    image: filmfliker, liveUrl: 'https://film-fliker.vercel.app/', githubUrl: 'https://github.com/ManishK4514/FilmFliker',
  },
  {
    id: 4, title: 'NoteApp – Note Taking App',
    points: ['Efficient note-taking with local storage persistence', 'Create, edit, delete, and organize notes seamlessly', 'Responsive design with smooth performance'],
    tech: ['React.js', 'JavaScript', 'Local Storage', 'CSS'],
    image: noteapp, liveUrl: 'https://noteapp-manishk.vercel.app/', githubUrl: 'https://github.com/ManishK4514/NoteApp',
  },
  {
    id: 5, title: 'Portfolio Website',
    points: ['Personal portfolio showcasing professional work and skills', 'Glassmorphism effects with smooth animations', 'Optimized performance and full responsiveness'],
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: portfolio, liveUrl: 'https://manishk4514.vercel.app/', githubUrl: 'https://github.com/ManishK4514/My_Portfolio',
  },
  {
    id: 6, title: 'Disney+ Hotstar Clone',
    points: ['Pixel-perfect streaming platform UI clone', 'Responsive catalog with horizontal scrolling', 'Modern UI/UX replicating premium experience'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: disneyClone, liveUrl: 'https://manishk4514.github.io/Disney-Hotstar-Clone/', githubUrl: 'https://github.com/ManishK4514/Disney-Hotstar-Clone',
  },
];

const getTransform = (offset: number) => {
  const abs = Math.abs(offset);
  if (abs === 0) return { x: 0, z: 0, rotY: 0, scale: 1, opacity: 1, blur: 0 };
  if (abs === 1) return { x: offset * 280, z: -120, rotY: offset < 0 ? 25 : -25, scale: 0.88, opacity: 0.6, blur: 2 };
  return { x: offset * 480, z: -240, rotY: offset < 0 ? 40 : -40, scale: 0.72, opacity: 0.3, blur: 6 };
};

const CoverCard = ({ project, offset, onClick }: { project: Project; offset: number; onClick: () => void }) => {
  const [flipped, setFlipped] = useState(false);
  const t = getTransform(offset);
  const isActive = offset === 0;

  useEffect(() => { if (!isActive) setFlipped(false); }, [isActive]);

  return (
    <motion.div
      onClick={!isActive ? onClick : undefined}
      onHoverStart={() => { if (isActive) setFlipped(true); }}
      onHoverEnd={() => { if (isActive) setFlipped(false); }}
      animate={{ x: t.x, z: t.z, rotateY: t.rotY, scale: t.scale, opacity: t.opacity }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'absolute',
        width: 320,
        height: 420,
        transformStyle: 'preserve-3d',
        cursor: isActive ? 'default' : 'pointer',
        filter: `blur(${t.blur}px)`,
        zIndex: isActive ? 10 : 5 - Math.abs(offset),
      }}
    >
      <motion.div
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
          className="rounded-2xl overflow-hidden border border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl"
        >
          <div className="relative h-56 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = portfolio; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-bold text-foreground leading-tight">{project.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full border border-primary/20">{t}</span>
              ))}
            </div>
            {isActive && (
              <p className="text-xs text-muted-foreground mt-1">Hover to see details →</p>
            )}
          </div>
          {isActive && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: '0 0 0 1px #00D4FF44, 0 0 40px 0 #00D4FF22' }}
            />
          )}
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="rounded-2xl overflow-hidden border border-primary/30 bg-card/95 backdrop-blur-xl p-5 flex flex-col gap-4"
        >
          <h3 className="text-base font-bold text-primary">{project.title}</h3>
          <ul className="flex-1 space-y-2">
            {project.points.map((pt, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">▸</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-[10px] bg-white/5 text-muted-foreground rounded-full border border-white/10">{t}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full h-8 text-xs"><ExternalLink className="w-3 h-3 mr-1.5" />Live Demo</Button>
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" variant="outline" className="w-full h-8 text-xs"><Github className="w-3 h-3 mr-1.5" />Code</Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground text-center">Move mouse away to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const { data: projectsData } = useProjects();
  const [active, setActive] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const projects: Project[] =
    projectsData && projectsData.length > 0
      ? projectsData.map((p: any) => ({
          id: p.id, title: p.title,
          points: p.description ? [p.description] : [],
          tech: p.tech_stack || [],
          image: p.image_url || portfolio,
          liveUrl: p.live_url, githubUrl: p.github_url,
        }))
      : defaultProjects;

  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive((a) => Math.min(projects.length - 1, a + 1)), [projects.length]);

  // Drive active index from scroll position inside the tall wrapper
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top; // px scrolled into the wrapper
      const step = window.innerHeight; // 1 project per viewport height
      const idx = Math.round(Math.max(0, Math.min(projects.length - 1, scrolled / step)));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [projects.length]);

  // Touch swipe on the sticky frame
  const stickyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const delta = startX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) { if (delta > 0) next(); else prev(); }
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchend', onEnd); };
  }, [prev, next]);

  return (
    // Tall wrapper — gives scroll room for each project
    <div
      ref={wrapperRef}
      style={{ height: `${projects.length * 100}vh`, position: 'relative' }}
    >
      {/* Sticky frame that stays pinned while user scrolls through */}
      <div
        ref={stickyRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        className="flex flex-col items-center justify-center px-4"
      >
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">Real-world applications and solutions</p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative flex items-center justify-center select-none w-full"
          style={{ height: 460, perspective: '1200px' }}
          aria-label="Project carousel"
          aria-live="polite"
        >
          {projects.map((p, i) => {
            const offset = i - active;
            if (Math.abs(offset) > 2) return null;
            return (
              <CoverCard
                key={p.id}
                project={p}
                offset={offset}
                onClick={() => setActive(i)}
              />
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            disabled={active === 0}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/10 disabled:opacity-30 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  background: active === i ? '#00D4FF' : 'rgba(255,255,255,0.2)',
                  boxShadow: active === i ? '0 0 8px #00D4FF88' : 'none',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={active === projects.length - 1}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/10 disabled:opacity-30 transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          {active + 1} / {projects.length} — Scroll to navigate projects
        </p>
      </div>
    </div>
  );
};

export default Projects;
