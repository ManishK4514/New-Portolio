import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, X, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { aiKnowledge } from '@/data/aiKnowledge';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Manish's AI Assistant. I know everything about his work, skills, and experience. Ask me anything!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Personal / Contact
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('phone')) {
      return `You can reach Manish at ${aiKnowledge.profile.email} or call him at ${aiKnowledge.profile.phone}. He is based in ${aiKnowledge.profile.location}.`;
    }
    
    if (lowerQuery.includes('who are you') || lowerQuery.includes('who is manish') || lowerQuery.includes('tell me about yourself')) {
      return `I am an AI representing Manish Kumar. ${aiKnowledge.profile.summary} He is currently a ${aiKnowledge.profile.role} with ${aiKnowledge.profile.experience} of experience.`;
    }

    // Skills
    if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || lowerQuery.includes('stack') || lowerQuery.includes('language')) {
      const allSkills = [...aiKnowledge.skills.languages, ...aiKnowledge.skills.frameworks, ...aiKnowledge.skills.infrastructure].join(', ');
      return `Manish is proficient in: ${allSkills}. He specializes in ${aiKnowledge.skills.frameworks[0]} and ${aiKnowledge.skills.frameworks[1]} for backend development.`;
    }

    // Projects
    if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built')) {
      const projectNames = aiKnowledge.projects.map(p => p.name).join(', ');
      return `Manish has built several enterprise-grade systems, including: ${projectNames}. Which one would you like to know more about?`;
    }

    // Specific Project Matching
    for (const project of aiKnowledge.projects) {
      if (project.keywords.some(keyword => lowerQuery.includes(keyword))) {
        return `**${project.name}**: ${project.description}`;
      }
    }

    // Experience
    if (lowerQuery.includes('experience') || lowerQuery.includes('history') || lowerQuery.includes('company')) {
      const latest = aiKnowledge.experience[0];
      return `Manish has ${aiKnowledge.profile.experience} of experience. He is currently at ${latest.company} as a ${latest.role}, where he ${latest.highlights.toLowerCase()}`;
    }

    // Fallback
    return "I can tell you about Manish's projects (like the Payment Gateway or KYC System), his technical skills, or his work experience. What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const responseText = findResponse(userMessage.text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: responseText,
        isBot: true
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 md:w-16 md:h-16 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-110 group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] z-50 bg-card/80 backdrop-blur-xl rounded-2xl border border-primary/20 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 shadow-2xl shadow-primary/10 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-primary/10 bg-primary/5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">AI Portfolio Guide</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    message.isBot
                      ? 'bg-muted/50 border border-border rounded-tl-none'
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about projects, skills..."
                className="bg-background/50 border-primary/20 focus:border-primary/50"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-primary hover:bg-primary/90 transition-colors"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
