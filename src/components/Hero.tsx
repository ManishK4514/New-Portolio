import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Github, Linkedin, Terminal, Database, Server, Cloud } from 'lucide-react';
import profileImage from '@/assets/profile.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useProfile } from '@/hooks/usePortfolioData';
import { Skeleton } from '@/components/ui/skeleton';

const Hero = () => {
  const content = useScrollReveal({ delay: 0 });
  const profileImg = useScrollReveal({ delay: 300 });
  const { data: profile, isLoading } = useProfile();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fallback data
  const defaultProfile = {
    full_name: "Manish Kumar",
    headline: "Full-Stack Engineer | Payment Systems Architect",
    bio: "Specializing in building scalable payment systems and loyalty platforms for fintech companies. Proven track record of delivering high-performance solutions.",
    social_links: {
      github: "https://github.com/ManishK4514",
      linkedin: "https://linkedin.com/in/manishk4514",
      email: "manish80842@gmail.com"
    }
  };

  const displayProfile = profile || defaultProfile;

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center overflow-x-hidden pb-20 lg:pb-0">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 z-10 relative pt-16 lg:pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Status badge */}
          <div 
            ref={content.ref}
            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4 reveal ${content.isVisible ? 'active reveal-fade-up' : ''}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">Available for opportunities</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-4 lg:space-y-5">
              {/* Name and Title */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  {isLoading ? (
                    <Skeleton className="h-12 w-3/4" />
                  ) : (
                    <span className="block text-foreground">{displayProfile.full_name}</span>
                  )}
                </h1>
                {isLoading ? (
                  <Skeleton className="h-8 w-full" />
                ) : (
                  <p className="text-base md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-[hsl(14,100%,60%)] bg-clip-text text-transparent">
                    {displayProfile.headline}
                  </p>
                )}
              </div>

              {/* Summary */}
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <p className="text-sm text-foreground/80 leading-relaxed max-w-lg">
                  {displayProfile.bio}
                </p>
              )}

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors">
                  <div className="text-lg font-bold text-primary">$500K+</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Monthly Transactions</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 backdrop-blur-sm hover:border-secondary/40 transition-colors">
                  <div className="text-lg font-bold text-secondary">99%</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Success Rate</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-colors">
                  <div className="text-lg font-bold text-yellow-400">Knight</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">LeetCode Badge</div>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-colors">
                  <div className="text-lg font-bold text-green-400">3+</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Years Experience</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button 
                  size="sm" 
                  onClick={scrollToProjects}
                  className="h-9 px-5 text-xs font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={scrollToContact}
                  className="h-9 px-5 text-xs font-semibold rounded-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <Mail className="mr-2 w-3.5 h-3.5" />
                  Get In Touch
                </Button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-1">
                {displayProfile.social_links?.github && (
                  <a 
                    href={displayProfile.social_links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg bg-card/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )}
                {displayProfile.social_links?.linkedin && (
                  <a 
                    href={displayProfile.social_links.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg bg-card/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )}
                {displayProfile.social_links?.email && (
                  <span className="text-xs text-muted-foreground font-medium px-2">
                    {displayProfile.social_links.email}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column - Profile & Tech Stack */}
            <div 
              ref={profileImg.ref}
              className={`space-y-5 reveal ${profileImg.isVisible ? 'active reveal-slide-right' : ''}`}
            >
              {/* Profile Card with Code Editor Style */}
              <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[2rem] blur-3xl opacity-50" />
                
                {/* Main container - Code editor style */}
                <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border overflow-hidden shadow-2xl">
                  {/* Window header */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono ml-2">developer.profile</span>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-4">
                    {/* Profile image */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-border mb-3 group">
                      <img 
                        src={profileImage} 
                        alt={displayProfile.full_name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                    
                    {/* Code-style info */}
                    <div className="font-mono text-[10px] space-y-1 ">
                      <div className="flex items-center gap-2">
                        <span className="text-secondary">const</span>
                        <span className="text-foreground">role</span>
                        <span className="text-muted-foreground">=</span>
                        <span className="text-primary">"Full-Stack Engineer"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-secondary">const</span>
                        <span className="text-foreground">exp</span>
                        <span className="text-muted-foreground">=</span>
                        <span className="text-[hsl(14,100%,60%)]">3+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stats cards */}
                <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-xl p-2.5 rounded-xl border border-border shadow-xl animate-float hidden xl:block">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-green-500/10">
                      <Database className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">$500K+</p>
                      <p className="text-[10px] text-muted-foreground">Transactions</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-xl p-2.5 rounded-xl border border-border shadow-xl animate-float hidden xl:block" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <Server className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">99%</p>
                      <p className="text-[10px] text-muted-foreground">Success</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-[10px] font-mono">scroll</span>
          <div className="w-4 h-6 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
