import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl pt-12 md:pt-16 pb-8 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full opacity-30" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Manish Kumar
                </span>
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto md:mx-0 leading-relaxed">
                Crafting scalable fintech solutions and immersive digital experiences. 
                Open to new opportunities and collaborations.
              </p>
              <div className="flex gap-4 pt-2 justify-center md:justify-start">
                <a 
                  href="https://github.com/ManishK4514" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://linkedin.com/in/manishk4514" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
              <ul className="space-y-3">
                {['Home', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm py-1"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:manish80842@gmail.com" className="hover:text-primary transition-colors py-1 block">
                    manish80842@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919065129628" className="hover:text-primary transition-colors py-1 block">
                    +91-9065129628
                  </a>
                </li>
                <li className="py-1">Mumbai, Maharashtra, India</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
              © {currentYear} Manish Kumar. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground order-1 md:order-2 bg-card/50 px-4 py-2 rounded-full border border-border/50">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>and passion</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 order-3"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
