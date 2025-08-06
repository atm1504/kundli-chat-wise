import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import KundliForm from "@/components/KundliForm";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Moon, Sun } from "lucide-react";
import cosmicHero from "@/assets/cosmic-hero.jpg";

interface User {
  email: string;
  name: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(10);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('user');
    const storedCredits = localStorage.getItem('credits');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCredits) {
      setCredits(parseInt(storedCredits));
    }
  }, []);

  const handleAuthenticated = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Check if there's stored Kundli data to continue with
    const storedKundliData = localStorage.getItem('kundliFormData');
    if (storedKundliData) {
      const kundliData = JSON.parse(storedKundliData);
      localStorage.removeItem('kundliFormData');
      navigate('/chat', { state: { kundliData } });
    }
  };

  const handleKundliSubmit = (kundliData: any) => {
    navigate('/chat', { state: { kundliData } });
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  const handleAuthClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-celestial">
      <Header 
        isAuthenticated={!!user}
        credits={credits}
        onAuthClick={handleAuthClick}
      />
      
      {/* Enhanced Hero Section with Neo-Cosmic Effects */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Cosmic Background Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${cosmicHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-nebula animate-aurora-shimmer" />
        <div className="absolute inset-0 bg-gradient-mystical/40" />
        
        {/* Floating Cosmic Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-cosmic-orb rounded-full animate-cosmic-orb opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-stellar rounded-full animate-stellar-dance opacity-15"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-aurora rounded-full animate-quantum-phase opacity-25"></div>
        
        <div className="relative container mx-auto text-center space-y-8">
          <div className="flex justify-center space-x-6 mb-8">
            <div className="floating-orb">
              <Sun className="h-10 w-10 text-golden-bright shadow-golden" />
            </div>
            <div className="floating-orb" style={{ animationDelay: '0.5s' }}>
              <Star className="h-12 w-12 text-primary-bright animate-neo-glow shadow-neo-glow" />
            </div>
            <div className="floating-orb" style={{ animationDelay: '1s' }}>
              <Moon className="h-10 w-10 text-cosmic-cyan shadow-aurora" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold cosmic-text mb-6 animate-neo-glow">
            HoroscopeGuru.AI
          </h1>
          
          <p className="text-xl md:text-2xl aurora-text max-w-3xl mx-auto mb-8">
            Unlock the secrets of your cosmic destiny with AI-powered astrology. 
            Discover your life path, relationships, and future through ancient wisdom 
            and modern intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="neo-cosmic" 
              size="lg"
              onClick={() => document.getElementById('kundli-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Cosmic Journey
            </Button>
            
            {user && (
              <Button 
                variant="aurora" 
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background/80">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-cosmic bg-clip-text text-transparent">
            Your Cosmic Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-celestial border-primary/20 bg-gradient-mystical/50">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-golden mx-auto mb-4 animate-mystical-float" />
                <h3 className="text-xl font-semibold mb-2 text-primary">Free Kundli Generation</h3>
                <p className="text-muted-foreground">
                  Generate your complete birth chart and cosmic profile at no cost
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-celestial border-primary/20 bg-gradient-mystical/50">
              <CardContent className="pt-6">
                <Sparkles className="h-12 w-12 text-cosmic-blue mx-auto mb-4 animate-cosmic-pulse" />
                <h3 className="text-xl font-semibold mb-2 text-primary">AI-Powered Insights</h3>
                <p className="text-muted-foreground">
                  Ask unlimited questions and get personalized astrological guidance
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-celestial border-primary/20 bg-gradient-mystical/50">
              <CardContent className="pt-6">
                <Moon className="h-12 w-12 text-primary mx-auto mb-4 animate-celestial-glow" />
                <h3 className="text-xl font-semibold mb-2 text-primary">Save & Continue</h3>
                <p className="text-muted-foreground">
                  Save your conversations and continue your cosmic journey anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kundli Form Section */}
      <section id="kundli-form" className="py-16 px-4 bg-gradient-mystical/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
              Begin Your Cosmic Reading
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your birth details to unlock personalized insights about your life, relationships, and destiny
            </p>
          </div>
          
          <KundliForm 
            onSubmit={handleKundliSubmit}
            isAuthenticated={!!user}
            onAuthRequired={handleAuthRequired}
          />
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default Index;
