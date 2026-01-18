import { useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSkills } from '@/hooks/usePortfolioData';
import { Skeleton } from '@/components/ui/skeleton';
import { Code2, Database, Cloud, Layers, Palette, Terminal, Globe, Server, Box } from 'lucide-react';
import { 
  FaJava, FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, 
  SiExpress, SiNestjs, SiSpringboot, SiHibernate, 
  SiPostgresql, SiMongodb, SiRedis, 
  SiJenkins, SiPostman, SiGraphql, SiPrisma, SiTypeorm 
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

// Configuration for mapping skill names to icons and colors
const skillConfig: Record<string, { icon: React.ElementType, color: string }> = {
  'Java': { icon: FaJava, color: '#f89820' },
  'JavaScript': { icon: SiJavascript, color: '#f7df1e' },
  'TypeScript': { icon: SiTypescript, color: '#3178c6' },
  'React.js': { icon: FaReact, color: '#61dafb' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'Redux': { icon: SiRedux, color: '#764abc' },
  'Tailwind': { icon: SiTailwindcss, color: '#06b6d4' },
  'HTML5': { icon: FaHtml5, color: '#e34f26' },
  'CSS3': { icon: FaCss3Alt, color: '#1572b6' },
  'Node.js': { icon: FaNodeJs, color: '#339933' },
  'Express': { icon: SiExpress, color: '#000000' },
  'NestJS': { icon: SiNestjs, color: '#e0234e' },
  'Spring Boot': { icon: SiSpringboot, color: '#6db33f' },
  'Hibernate': { icon: SiHibernate, color: '#59666c' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169e1' },
  'MongoDB': { icon: SiMongodb, color: '#47a248' },
  'Redis': { icon: SiRedis, color: '#dc382d' },
  'AWS': { icon: FaAws, color: '#ff9900' },
  'Docker': { icon: FaDocker, color: '#2496ed' },
  'Jenkins': { icon: SiJenkins, color: '#d24939' },
  'GraphQL': { icon: SiGraphql, color: '#e10098' },
  'Git': { icon: FaGitAlt, color: '#f05032' },
  'GitHub': { icon: FaGithub, color: '#181717' },
  'Postman': { icon: SiPostman, color: '#ff6c37' },
  'Prisma': { icon: SiPrisma, color: '#2d3748' },
  'TypeORM': { icon: SiTypeorm, color: '#fe0803' },
};

const categoryConfig: Record<string, { icon: React.ReactNode, color: string }> = {
  'Languages': { icon: <Code2 className="w-8 h-8" />, color: 'hsl(14 100% 60%)' },
  'Frontend': { icon: <Palette className="w-8 h-8" />, color: 'hsl(171 100% 36%)' },
  'Backend': { icon: <Server className="w-8 h-8" />, color: 'hsl(199 100% 50%)' },
  'Databases': { icon: <Database className="w-8 h-8" />, color: 'hsl(270 61% 65%)' },
  'Cloud & DevOps': { icon: <Cloud className="w-8 h-8" />, color: 'hsl(199 100% 50%)' },
  'APIs & Integration': { icon: <Globe className="w-8 h-8" />, color: 'hsl(14 100% 60%)' },
  'Tools': { icon: <Terminal className="w-8 h-8" />, color: 'hsl(171 100% 36%)' },
};

const defaultCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: <Code2 className="w-8 h-8" />,
    color: 'hsl(14 100% 60%)',
    skills: [
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    ],
  },
  {
    title: 'Frontend',
    icon: <Palette className="w-8 h-8" />,
    color: 'hsl(171 100% 36%)',
    skills: [
      { name: 'React.js', icon: FaReact, color: '#61dafb' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'Redux', icon: SiRedux, color: '#764abc' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4' },
      { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="w-8 h-8" />,
    color: 'hsl(199 100% 50%)',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#000000' },
      { name: 'NestJS', icon: SiNestjs, color: '#e0234e' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f' },
      { name: 'Hibernate', icon: SiHibernate, color: '#59666c' },
    ],
  },
  {
    title: 'Databases',
    icon: <Database className="w-8 h-8" />,
    color: 'hsl(270 61% 65%)',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'Redis', icon: SiRedis, color: '#dc382d' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-8 h-8" />,
    color: 'hsl(199 100% 50%)',
    skills: [
      { name: 'AWS', icon: FaAws, color: '#ff9900' },
      { name: 'Docker', icon: FaDocker, color: '#2496ed' },
      { name: 'Jenkins', icon: SiJenkins, color: '#d24939' },
    ],
  },
  {
    title: 'APIs & Integration',
    icon: <Globe className="w-8 h-8" />,
    color: 'hsl(14 100% 60%)',
    skills: [
      { name: 'GraphQL', icon: SiGraphql, color: '#e10098' },
    ],
  },
  {
    title: 'Tools',
    icon: <Terminal className="w-8 h-8" />,
    color: 'hsl(171 100% 36%)',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#f05032' },
      { name: 'GitHub', icon: FaGithub, color: '#181717' },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
      { name: 'Prisma', icon: SiPrisma, color: '#2d3748' },
      { name: 'TypeORM', icon: SiTypeorm, color: '#fe0803' },
    ],
  },
];

const SkillCategoryCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const reveal = useScrollReveal({ delay: index * 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div ref={reveal.ref} className={`reveal ${reveal.isVisible ? 'active reveal-fade-up' : ''} h-full`}>
      <div 
        ref={cardRef} 
        className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 group"
        style={{ 
          transform, 
          transition: 'transform 0.1s ease-out, box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: transform.includes('scale3d(1.02') ? `0 12px 36px ${category.color}20` : 'none' 
        }}
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-3 rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            {category.icon}
          </div>
          <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {category.skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-2 group/icon relative"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-background/50 border border-border/50 transition-all duration-300 group-hover/icon:border-primary/50 group-hover/icon:-translate-y-1 group-hover/icon:shadow-lg"
                style={{
                  boxShadow: `0 0 0 0 ${skill.color}00`
                }}
              >
                <skill.icon 
                  className="w-6 h-6 transition-all duration-300 group-hover/icon:scale-110" 
                  style={{ color: skill.color }}
                />
                
                {/* 3D Depth Effect Layer */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 12px ${skill.color}20, 0 8px 16px -4px ${skill.color}40`
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground group-hover/icon:text-foreground transition-colors text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const heading = useScrollReveal();
  const { data: skillsData, isLoading } = useSkills();

  const displayCategories: SkillCategory[] = skillsData && skillsData.length > 0
    ? skillsData.map((categoryData: any) => ({
        title: categoryData.category,
        icon: categoryConfig[categoryData.category]?.icon || <Box className="w-8 h-8" />,
        color: categoryConfig[categoryData.category]?.color || 'hsl(210 100% 50%)',
        skills: (categoryData.items || []).map((skillName: string) => ({
          name: skillName,
          icon: skillConfig[skillName]?.icon || Box,
          color: skillConfig[skillName]?.color || '#888888'
        }))
      }))
    : defaultCategories;

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div ref={heading.ref} className={`text-center mb-16 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Technical Skills</h2>
          <p className="text-lg md:text-xl text-muted-foreground">Technologies and tools I work with</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 h-64 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="flex flex-col items-center gap-2">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {displayCategories.map((category, index) => (
              <SkillCategoryCard key={category.title} category={category} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
