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
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${cosmicHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-mystical" />
        
        <div className="relative container mx-auto text-center space-y-8">
          <div className="flex justify-center space-x-4 mb-8">
            <Sun className="h-8 w-8 text-golden animate-mystical-float" />
            <Star className="h-10 w-10 text-primary animate-cosmic-pulse" />
            <Moon className="h-8 w-8 text-cosmic-blue animate-mystical-float" style={{ animationDelay: '1s' }} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-6">
            HoroscopeGuru.AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock the secrets of your cosmic destiny with AI-powered astrology. 
            Discover your life path, relationships, and future through ancient wisdom 
            and modern intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => document.getElementById('kundli-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Cosmic Journey
            </Button>
            
            {user && (
              <Button 
                variant="mystical" 
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
