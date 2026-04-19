import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Zap, Layers } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Architecture {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const architectures: Architecture[] = [
  {
    id: 1,
    title: "Designed microservices architecture handling 1M+ daily API calls",
    icon: <Server className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Implemented database sharding strategy for horizontal scaling",
    icon: <Database className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Built event-driven architecture using Apache Kafka for real-time processing",
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Designed caching strategy reducing database load by 60%",
    icon: <Layers className="w-6 h-6" />
  }
];

const ArchitectureCard = ({ architecture, index }: { architecture: Architecture; index: number }) => {
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
      className={`reveal ${reveal.isVisible ? 'active reveal-fade-up' : ''}`}
    >
      <div 
        ref={cardRef}
        className="group bg-card rounded-xl border border-border hover-shadow p-6 flex items-start gap-4 transition-all duration-300 ease-in-out"
        style={{ transform, transition: 'transform 0.1s ease-out' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" style={{ boxShadow: '0 0 16px rgba(0,212,255,0.15)' }}>
          {architecture.icon}
        </div>
        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">{architecture.title}</p>
      </div>
    </div>
  );
};

const TechnicalArchitecture = () => {
  const heading = useScrollReveal();

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div 
          ref={heading.ref}
          className={`text-center mb-16 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Technical Architecture</h2>
          <p className="text-lg md:text-xl text-muted-foreground">System design and scalability achievements</p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
        >
          {architectures.map((architecture, index) => (
            <motion.div
              key={architecture.id}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <ArchitectureCard architecture={architecture} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalArchitecture;
