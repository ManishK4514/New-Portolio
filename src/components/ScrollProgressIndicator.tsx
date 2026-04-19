import { useSceneStore } from '@/stores/sceneStore';
import { useLenis } from '@/providers/LenisProvider';

const SECTIONS = [
  { id: 'home', label: 'Hero' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'coding', label: 'Coding' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
];

const ScrollProgressIndicator = () => {
  const activeSection = useSceneStore((s) => s.activeSection);
  const lenis = useLenis();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden lg:flex"
      role="navigation"
      aria-label="Page sections"
    >
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          aria-label={`Go to ${s.label}`}
          title={s.label}
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] text-muted-foreground whitespace-nowrap bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-border">
            {s.label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: activeSection === i ? '10px' : '6px',
              height: activeSection === i ? '10px' : '6px',
              background: activeSection === i ? 'var(--color-primary, #00D4FF)' : 'rgba(255,255,255,0.25)',
              boxShadow: activeSection === i ? '0 0 8px 2px #00D4FF88' : 'none',
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default ScrollProgressIndicator;
