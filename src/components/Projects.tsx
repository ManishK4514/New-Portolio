import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import socialCircle from '@/assets/social-circle.png';
import socializespot from '@/assets/socializespot.png';
import filmfliker from '@/assets/filmfliker.png';
import noteapp from '@/assets/noteapp.png';
import portfolio from '@/assets/portfolio.png';
import disneyClone from '@/assets/disney-clone.png';

interface Project {
  id: number;
  title: string;
  points: string[];
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "SocialCircle – Social Media Platform",
    points: [
      "Full-stack MERN social platform with real-time features serving 100+ active users",
      "RESTful APIs with optimized MongoDB schema for complex social relationships",
      "Dynamic user search, profiles, and news feed with seamless UX"
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Redis", "AWS S3", "Socket.io"],
    image: socialCircle,
    liveUrl: "https://socialcircle-red.vercel.app/",
    githubUrl: "https://github.com/ManishK4514/SocialCircle"
  },
  {
    id: 2,
    title: "Socializespot – Blog Website",
    points: [
      "Complete blogging platform with authentication, CRUD, and category management",
      "Rich text editor with image uploads and advanced search functionality",
      "Social features including likes, shares, follows, and real-time comments"
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Tailwind CSS"],
    image: socializespot,
    liveUrl: "https://socializespot.vercel.app/",
    githubUrl: "https://github.com/ManishK4514/Socializespot"
  },
  {
    id: 3,
    title: "FilmFliker – Movie Catalog Web-App",
    points: [
      "Modern movie browser with advanced search and filtering",
      "Third-party API integration for movie data and reviews",
      "Clean, responsive design for all devices"
    ],
    tech: ["React.js", "JavaScript", "CSS", "REST API"],
    image: filmfliker,
    liveUrl: "https://film-fliker.vercel.app/",
    githubUrl: "https://github.com/ManishK4514/FilmFliker"
  },
  {
    id: 4,
    title: "NoteApp – Note Taking Web-App",
    points: [
      "Efficient note-taking with local storage persistence",
      "Create, edit, delete, and organize notes seamlessly",
      "Responsive design with smooth performance"
    ],
    tech: ["React.js", "JavaScript", "Local Storage", "CSS"],
    image: noteapp,
    liveUrl: "https://noteapp-manishk.vercel.app/",
    githubUrl: "https://github.com/ManishK4514/NoteApp"
  },
  {
    id: 5,
    title: "Portfolio Website",
    points: [
      "Personal portfolio showcasing professional work and skills",
      "Glassmorphism effects with smooth animations",
      "Optimized performance and full responsiveness"
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
    image: portfolio,
    liveUrl: "https://manishk4514.vercel.app/",
    githubUrl: "https://github.com/ManishK4514/My_Portfolio"
  },
  {
    id: 6,
    title: "Disney+ Hotstar Clone",
    points: [
      "Pixel-perfect streaming platform UI clone",
      "Responsive catalog with horizontal scrolling",
      "Modern UI/UX replicating premium experience"
    ],
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: disneyClone,
    liveUrl: "https://manishk4514.github.io/Disney-Hotstar-Clone/",
    githubUrl: "https://github.com/ManishK4514/Disney-Hotstar-Clone"
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const reveal = useScrollReveal({ delay: index * 100 });
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
      ref={reveal.ref}
      className={`reveal ${reveal.isVisible ? 'active reveal-bounce-in' : ''}`}
    >
      <div 
        ref={cardRef}
        className="group relative bg-card rounded-xl overflow-hidden border border-border hover-shadow transition-all duration-300 ease-in-out"
        style={{ transform, transition: 'transform 0.1s ease-out' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image - Taller for Better Overlay Space */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Title - Always Visible Below Image */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
        </div>

        {/* Details Overlay - Slides Up from Bottom on Hover - Covers Entire Card */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out flex flex-col p-5">
          {/* Title in overlay */}
          <h3 className="text-base font-bold mb-3 text-foreground">{project.title}</h3>
          
          {/* Description Points */}
          <div className="flex-grow mb-3 space-y-2 overflow-y-auto">
            {project.points.map((point, i) => (
              <div 
                key={i} 
                className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <svg 
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                <p className="text-xs text-muted-foreground leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          
          {/* Tech Stack */}
          <div 
            className="flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{ transitionDelay: '550ms' }}
          >
            {project.tech.map((tech) => (
              <span 
                key={tech}
                className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Buttons */}
          <div 
            className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{ transitionDelay: '650ms' }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                size="sm"
                className="w-full group/btn text-xs h-8"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                Live Demo
              </Button>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                size="sm"
                variant="outline"
                className="group/btn text-xs h-8"
              >
                <Github className="w-3.5 h-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
                Code
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const heading = useScrollReveal();

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div 
          ref={heading.ref}
          className={`text-center mb-16 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Projects</h2>
          <p className="text-lg md:text-xl text-muted-foreground">Real-world applications and solutions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
