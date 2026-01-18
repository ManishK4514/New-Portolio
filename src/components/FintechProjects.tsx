import { useRef, useState } from 'react';
import { Database, Shield, TrendingUp, CheckCircle2, Zap, Server, Activity, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';

interface FintechProject {
  id: number;
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  icon: React.ReactNode;
  color: string;
}

const fintechProjects: FintechProject[] = [
  {
    id: 1,
    title: "Payment Processing API",
    description: "Multi-channel payment gateway processing $500K+ monthly transactions for 50+ enterprise clients including LIC (Spice Money), Airtel Payment Bank, Atomberg, and Kerakol. Integrated UPI, NEFT, IMPS, and wallet payouts with intelligent 3+ gateway fallbacks.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Redis", "Apache Kafka", "Circuit Breaker"],
    highlights: [
      "99% transaction success rate",
      "40% reduction in failed transactions",
      "PCI-DSS compliant architecture",
      "Real-time fraud detection",
      "Multi-currency support",
      "Handles $500K+ monthly volume"
    ],
    icon: <Database className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "KYC Verification System",
    description: "Automated KYC verification pipeline with document processing, risk scoring, and compliance reporting. High-availability architecture achieving 99% uptime by integrating 3 KYC providers with intelligent fallback and circuit breaker patterns.",
    tech: ["Node.js", "TypeScript", "AWS", "REST APIs", "MongoDB", "Apache Kafka"],
    highlights: [
      "99% system uptime",
      "5,000+ daily verifications",
      "99.5% accuracy rate",
      "75% reduction in manual review time",
      "Intelligent provider fallback",
      "Circuit breaker implementation"
    ],
    icon: <Shield className="w-6 h-6" />,
    color: "from-emerald-500 to-green-500"
  },
  {
    id: 3,
    title: "IRIS Loyalty & Rule Engine",
    description: "Enterprise-grade loyalty platform with a microservice-based rule engine processing 10,000+ daily calculations for dynamic campaigns and multi-tier commission structures. Automated incentive workflows with zero calculation errors.",
    tech: ["Node.js", "Microservices", "React.js", "PostgreSQL", "Redis", "Docker"],
    highlights: [
      "10,000+ daily calculations",
      "Dynamic campaign management",
      "$500K+ revenue impact",
      "RBAC & Real-time analytics",
      "Zero calculation errors"
    ],
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500"
  }
];

// Helper to highlight numbers and key metrics
const HighlightText = ({ text }: { text: string }) => {
  const parts = text.split(/(\d+(?:[.,]\d+)?(?:[KkM%+]?))/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.match(/\d+(?:[.,]\d+)?(?:[KkM%+]?)/)) {
          return <span key={i} className="font-bold text-primary">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const FintechProjectCard = ({ project, index }: { project: FintechProject; index: number }) => {
  const reveal = useScrollReveal({ delay: index * 100 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={reveal.ref}
      className={`reveal ${reveal.isVisible ? 'active reveal-fade-up' : ''} h-full`}
    >
      <div 
        ref={cardRef}
        className="group relative bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 hover:border-primary/50 h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Glow Effect */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${project.color}`} 
        />
        
        {/* Top Border Gradient */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color} opacity-70`} />

        <div className="p-8 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div 
                className={`p-3.5 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-10 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                style={{ boxShadow: isHovered ? '0 0 20px rgba(var(--primary), 0.3)' : 'none' }}
              >
                {project.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium text-green-500">Production Ready</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed text-base">
              <HighlightText text={project.description} />
            </p>
          </div>
          
          {/* Tech Stack */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Highlights */}
          <div className="mt-auto bg-background/30 rounded-xl p-5 border border-border/30">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Key Performance Metrics
            </h4>
            <div className="grid gap-3">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 group/item">
                  <div className="mt-1 p-0.5 rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                    <HighlightText text={highlight} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FintechProjects = () => {
  const heading = useScrollReveal();

  return (
    <section id="fintech-projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[100px] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto relative z-10">
        <div 
          ref={heading.ref}
          className={`text-center mb-20 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Server className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Enterprise Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
            High-Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Fintech Systems</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Architecting robust, secure, and scalable financial infrastructure processing millions in transactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {fintechProjects.map((project, index) => (
            <FintechProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FintechProjects;
