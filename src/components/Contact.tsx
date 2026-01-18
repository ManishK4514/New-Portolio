import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, MapPin, Phone, Download, Github, Linkedin, Twitter, Sparkles, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import emailjs from 'emailjs-com';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const heading = useScrollReveal();
  const leftSection = useScrollReveal({ delay: 200 });
  const form = useScrollReveal({ delay: 400 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text);
      toast({ title: "Message Sent!", description: "Thanks! I'll get back to you soon." });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, (error) => {
      console.log(error.text);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-12 md:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-secondary/20 to-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-40 right-40 w-3 h-3 bg-secondary/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-purple-500/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div ref={heading.ref} className={`text-center mb-12 md:mb-28 reveal ${heading.isVisible ? 'active reveal-fade-up' : ''}`}>
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 mb-6 md:mb-10 backdrop-blur-md shadow-lg shadow-primary/5">
            <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-primary animate-pulse" />
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Let's Connect</span>
          </div>
          
          <h2 className="text-2xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-10 leading-tight px-2">
            <span className="block text-foreground mb-2">Ready to build</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary bg-[length:200%_auto] animate-gradient-x">
              the future?
            </span>
          </h2>
          
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-4">
            Let's discuss how we can create exceptional digital experiences together
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div ref={leftSection.ref} className={`space-y-8 reveal ${leftSection.isVisible ? 'active reveal-slide-left' : ''}`}>
            
            {/* Main Contact Cards */}
            <div className="space-y-5">
              <a 
                href="mailto:manish80842@gmail.com" 
                className="group relative block p-5 md:p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                    <Mail className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">Email</h3>
                    <p className="text-muted-foreground font-light text-sm md:text-base break-all">manish80842@gmail.com</p>
                  </div>
                  <Send className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </a>

              <a 
                href="tel:+919065129628" 
                className="group relative block p-5 md:p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 hover:border-secondary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-secondary/20">
                    <Phone className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 md:mb-2 group-hover:text-secondary transition-colors">Phone</h3>
                    <p className="text-muted-foreground font-light text-sm md:text-base">+91-9065129628</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-muted-foreground/50 group-hover:text-secondary group-hover:scale-110 transition-all" />
                </div>
              </a>

              <div className="relative p-5 md:p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                <div className="relative flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-500 shadow-lg shadow-purple-500/20">
                    <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 md:mb-2">Location</h3>
                    <p className="text-muted-foreground font-light text-sm md:text-base">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links with Enhanced Design */}
            <div className="relative p-5 md:p-8 rounded-3xl bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-secondary/5 opacity-50" />
              <div className="relative">
                <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-primary to-purple-500" />
                  Connect
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: "https://github.com/ManishK4514", label: "Github", color: "from-gray-500 to-gray-700" },
                    { icon: Linkedin, href: "https://linkedin.com/in/manishk4514", label: "LinkedIn", color: "from-blue-500 to-blue-700" },
                    { icon: Twitter, href: "#", label: "Twitter", color: "from-cyan-500 to-blue-500" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 md:p-5 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 border border-white/10 hover:border-primary/30 transition-all duration-300 flex-1"
                      aria-label={social.label}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110 mx-auto" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Button with Enhanced Design */}
            <Button 
              className="w-full py-7 text-lg font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 group rounded-2xl border border-white/10 relative overflow-hidden"
              onClick={() => window.open('https://drive.google.com/file/d/1hnk1O-Tul6cN6W_vJB40kOlP8vRXrBWr/view?usp=sharing', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Download className="mr-3 w-5 h-5 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </div>

          {/* Right Column - Contact Form */}
          <div ref={form.ref} className={`reveal ${form.isVisible ? 'active reveal-slide-right' : ''}`}>
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000 animate-pulse" />
              
              <form ref={formRef} onSubmit={handleSubmit} className="relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] border border-white/10 p-4 md:p-12 space-y-5 md:space-y-8 shadow-2xl">
                {/* Form header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Send a Message</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      Your Name
                    </label>
                    <div className="relative group/input">
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        placeholder="John Doe"
                        className="h-12 md:h-14 bg-background/50 border-white/10 focus:border-primary/50 focus:bg-background/80 transition-all duration-300 rounded-xl placeholder:text-muted-foreground/40 pl-4 group-hover/input:border-primary/30" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-secondary" />
                      Email Address
                    </label>
                    <div className="relative group/input">
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder="john@example.com"
                        className="h-12 md:h-14 bg-background/50 border-white/10 focus:border-secondary/50 focus:bg-background/80 transition-all duration-300 rounded-xl placeholder:text-muted-foreground/40 pl-4 group-hover/input:border-secondary/30" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-500" />
                    Your Message
                  </label>
                  <div className="relative group/input">
                    <Textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      placeholder="Tell me about your project or just say hi..."
                      rows={6} 
                      className="bg-background/50 border-white/10 focus:border-purple-500/50 focus:bg-background/80 transition-all duration-300 rounded-xl resize-none p-4 placeholder:text-muted-foreground/40 group-hover/input:border-purple-500/30" 
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full h-14 md:h-16 text-lg font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 rounded-xl group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        Send Message
                        <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
