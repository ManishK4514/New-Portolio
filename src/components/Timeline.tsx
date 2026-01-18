import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Circle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TimelineItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Software Developer',
    organization: 'Nupipay',
    period: 'July 2024 - Present',
    description: [
      'Engineered multi-channel payment processing APIs handling $500K+ monthly transactions for 50+ enterprise clients including LIC and Airtel Payment Bank.',
      'Boosted transaction success rates from 80% to 99% and reduced failed transactions by 40% through optimized gateway fallbacks.',
      'Architected Rule Engine microservice processing 10,000+ daily calculations, automating incentive workflows and saving 30 hours/week.',
      'Built high-availability eKYC system with 99% uptime, processing 5,000+ daily verifications with 99.5% accuracy.',
      'Designed comprehensive RBAC system with JWT authentication, reducing security vulnerabilities by 40%.',
      'Optimized PostgreSQL queries and implemented Redis caching to achieve sub-200ms API response times.'
    ]
  },
  {
    id: 2,
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Storeprops',
    period: 'June 2023 - July 2024',
    description: [
      'Built AI-powered video generation service serving 50+ Shopify merchants and processing 50,000+ monthly video renders.',
      'Improved response time by 75% (800ms to 200ms) and saved $1,200/month in infrastructure costs through database and caching optimizations.',
      'Created serverless video conversion pipeline using FFmpeg and AWS Lambda, enabling MP4 downloads for 10,000+ Lottie animations.',
      'Architected backend infrastructure processing 10K+ monthly conversions and optimized queries across MySQL and MongoDB.'
    ]
  },
  {
    id: 3,
    type: 'work',
    title: 'Android Developer Intern',
    organization: 'CITC',
    period: 'Dec 2022 - Jan 2023',
    description: [
      'Developed native Android applications focusing on user experience and performance.',
      'Implemented mobile UI/UX best practices for responsive design and collaborated on feature development.',
      'Gained hands-on experience in mobile development lifecycle using Java and Kotlin.'
    ]
  },
  {
    id: 4,
    type: 'work',
    title: 'Full-stack Web Developer Intern',
    organization: 'Upskillz',
    period: 'May 2022 - Jul 2022',
    description: [
      'Developed full-stack web applications using modern frameworks like React.js and Node.js.',
      'Participated in agile development processes and code reviews, building a strong foundation in professional software development.',
      'Gained hands-on experience with frontend and backend technologies and database management.'
    ]
  },
  {
    id: 5,
    type: 'education',
    title: 'Bachelor of Science - Computer Application',
    organization: 'Marwari Boy\'s College, Ranchi University',
    period: 'July 2020 - Aug 2023',
    description: [
      'Graduated with Distinction (CGPA 8.7/10).',
      'Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Web Technologies.'
    ]
  },
];

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeItems, setActiveItems] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !lineRef.current) return;

      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const timelineHeight = timelineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how much of the timeline is visible
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - timelineTop) / (timelineHeight + windowHeight)
      ));

      // Update line height based on scroll progress
      setLineHeight(scrollProgress * 100);

      // Check which items should be highlighted
      const newActiveItems: number[] = [];
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const itemTop = item.getBoundingClientRect().top;
          const itemCenter = itemTop + (item.offsetHeight / 2);
          
          // If the center of the item is above the middle of the viewport, highlight it
          if (itemCenter < windowHeight * 0.6) {
            newActiveItems.push(index);
          }
        }
      });
      
      setActiveItems(newActiveItems);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heading = useScrollReveal();

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div 
          ref={heading.ref}
          className={`text-center mb-16 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Experience & Education</h2>
          <p className="text-lg md:text-xl text-muted-foreground">My professional journey</p>
        </div>

        <div ref={timelineRef} className="max-w-6xl mx-auto relative">
          {/* Background line */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20" />
          
          {/* Animated line */}
          <div 
            ref={lineRef}
            className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary transition-all duration-300 ease-out"
            style={{ 
              height: `${lineHeight}%`,
              boxShadow: '0 0 10px hsl(var(--primary) / 0.5)'
            }}
          />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const itemReveal = useScrollReveal({ delay: index * 100 });
              const animationClass = index % 2 === 0 ? 'reveal-slide-left' : 'reveal-slide-right';
              const cardRef = useRef<HTMLDivElement>(null);
              const [transform, setTransform] = useState('');

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                if (!cardRef.current) return;
                const card = cardRef.current;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
              };

              const handleMouseLeave = () => {
                setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
              };
              
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                    if (el && !itemReveal.ref.current) {
                      (itemReveal.ref as any).current = el;
                    }
                  }}
                  className={`relative flex items-center justify-end ${
                    index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                  } reveal ${itemReveal.isVisible ? `active ${animationClass}` : ''}`}
                >
                  <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div 
                    ref={cardRef}
                    className={`bg-card border border-border rounded-xl p-6 transition-all duration-300 ease-in-out group ${
                      activeItems.includes(index) 
                        ? 'border-primary shadow-lg shadow-primary/20' 
                        : 'hover:border-primary/50'
                    }`}
                    style={{ transform, transition: 'transform 0.1s ease-out' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {item.type === 'work' ? (
                        <Briefcase className={`w-5 h-5 transition-colors ${activeItems.includes(index) ? 'text-primary' : 'text-muted-foreground'}`} />
                      ) : (
                        <GraduationCap className={`w-5 h-5 transition-colors ${activeItems.includes(index) ? 'text-primary' : 'text-muted-foreground'}`} />
                      )}
                      <span className={`text-sm font-medium transition-colors ${activeItems.includes(index) ? 'text-primary' : 'text-muted-foreground'}`}>
                        {item.period}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${
                      activeItems.includes(index) ? 'text-foreground' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-medium mb-4">{item.organization}</p>
                    
                    <ul className="space-y-2">
                      {item.description.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Circle className="w-2 h-2 mt-1.5 fill-primary text-primary flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-500 z-10 ${
                  activeItems.includes(index)
                    ? 'w-6 h-6 bg-primary shadow-lg shadow-primary/50'
                    : 'w-4 h-4 bg-primary/50'
                }`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
