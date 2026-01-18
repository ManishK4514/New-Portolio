import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Code2, Trophy, Award, Star, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CodingStat {
  label: string;
  value: string;
  icon?: typeof Star;
  color?: string;
}

interface CodingProfile {
  id: number;
  platform: string;
  title: string;
  rating: string;
  rank: string;
  problemsSolved: string;
  percentile?: string;
  badge?: string;
  stats: CodingStat[];
  link: string;
  icon: typeof Code2;
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
}

const profiles: CodingProfile[] = [
  {
    id: 1,
    platform: "LeetCode",
    title: "Knight Badge",
    rating: "2000+",
    rank: "Top 2.28%",
    problemsSolved: "2000+",
    percentile: "97.72",
    badge: "🏆",
    stats: [
      { label: "Rating", value: "2000+", icon: TrendingUp, color: "text-orange-500" },
      { label: "Solved", value: "2000+", icon: Target, color: "text-yellow-500" },
      { label: "Rank", value: "Top 2.28%", icon: Star, color: "text-orange-400" }
    ],
    link: "https://leetcode.com/u/manish1972",
    icon: Code2,
    primaryColor: "rgb(249, 115, 22)",
    secondaryColor: "rgb(251, 146, 60)",
    bgGradient: "from-orange-500/10 via-yellow-500/5 to-orange-500/10"
  },
  {
    id: 2,
    platform: "GeeksforGeeks",
    title: "Consistent Performer",
    rating: "N/A",
    rank: "Active",
    problemsSolved: "500+",
    percentile: "83.33",
    badge: "💚",
    stats: [
      { label: "Problems", value: "500+", icon: Target, color: "text-green-500" },
      { label: "Status", value: "Active", icon: TrendingUp, color: "text-emerald-500" },
      { label: "Streak", value: "Strong", icon: Star, color: "text-green-400" }
    ],
    link: "https://auth.geeksforgeeks.org/user/manishk4514",
    icon: Trophy,
    primaryColor: "rgb(34, 197, 94)",
    secondaryColor: "rgb(74, 222, 128)",
    bgGradient: "from-green-500/10 via-emerald-500/5 to-green-500/10"
  },
  {
    id: 3,
    platform: "CodeChef",
    title: "3★ Coder",
    rating: "1521",
    rank: "3 Star",
    problemsSolved: "N/A",
    percentile: "76.05",
    badge: "⭐",
    stats: [
      { label: "Rating", value: "1521", icon: TrendingUp, color: "text-amber-600" },
      { label: "Stars", value: "3★", icon: Star, color: "text-orange-500" },
      { label: "Division", value: "Div 2", icon: Trophy, color: "text-amber-500" }
    ],
    link: "https://www.codechef.com/users/manishk4514",
    icon: Award,
    primaryColor: "rgb(217, 119, 6)",
    secondaryColor: "rgb(245, 158, 11)",
    bgGradient: "from-amber-600/10 via-orange-600/5 to-amber-600/10"
  }
];

const ProfileCard = ({ profile, index }: { profile: CodingProfile; index: number }) => {
  const reveal = useScrollReveal({ delay: index * 150 });
  const Icon = profile.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={reveal.ref}
      className={`reveal ${reveal.isVisible ? 'active reveal-scale-up' : ''}`}
    >
      <div 
        ref={cardRef}
        className="relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover-shadow group h-full"
        style={{ transform, transition: 'transform 0.1s ease-out' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${profile.bgGradient} opacity-50`} />
        
        {/* Animated Border Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, ${profile.primaryColor}20, ${profile.secondaryColor}20)`,
            filter: 'blur(20px)'
          }}
        />

        <div className="relative p-6 space-y-6">
          {/* Header with Icon and Badge */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300"
                style={{
                  background: `linear-gradient(135deg, ${profile.primaryColor}30, ${profile.secondaryColor}30)`,
                  boxShadow: isHovered ? `0 8px 16px ${profile.primaryColor}40` : 'none'
                }}
              >
                <Icon className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{profile.platform}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{profile.badge}</span>
                  <span className="text-sm font-medium text-muted-foreground">{profile.title}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {profile.stats.map((stat, idx) => {
              const StatIcon = stat.icon || Star;
              return (
                <div 
                  key={idx}
                  className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border/50 transition-all duration-300 hover:border-primary/50 group/stat"
                  style={{
                    transitionDelay: isHovered ? `${idx * 50}ms` : '0ms'
                  }}
                >
                  <StatIcon className={`w-4 h-4 mb-2 ${stat.color} transition-transform group-hover/stat:scale-110`} />
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-sm font-bold text-foreground">{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <a
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${profile.platform} profile`}
          >
            <Button 
              className="w-full group/btn relative overflow-hidden mt-4"
              style={{
                background: `linear-gradient(135deg, ${profile.primaryColor}, ${profile.secondaryColor})`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                View Profile
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

const CodingProfiles = () => {
  const heading = useScrollReveal();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div 
          ref={heading.ref}
          className={`text-center mb-16 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Competitive Programming</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Problem Solving & Algorithms
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            1200+ complex algorithmic problems solved across multiple platforms, showcasing expertise in data structures, optimization, and system design
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
