import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import KundliForm from "@/components/KundliForm";
import AuthModal from "@/components/AuthModal";
import MoodTracker from "@/components/MoodTracker";
import WellnessTips from "@/components/WellnessTips";
import CommunityHighlights from "@/components/CommunityHighlights";
import DailyPlanner from "@/components/DailyPlanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Moon, Sun, Heart, Brain, Users } from "lucide-react";

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

    // SEO
    document.title = "Cosmic Wellness Astrology | HoroscopeGuru.AI";
    const desc = "Personalized Kundli, daily planner, mood check-ins, and AI insights for Gen Z wellness.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
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
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={!!user}
        credits={credits}
        onAuthClick={handleAuthClick}
      />
      
      {/* Hero Section - Wellness Focused */}
      <section className="relative py-20 px-4 bg-gradient-mystical">
        <div className="container mx-auto text-center space-y-8">
          <div className="flex justify-center space-x-6 mb-8">
            <div className="p-3 rounded-full bg-wellness-mint/20">
              <Heart className="h-8 w-8 text-wellness-mint" />
            </div>
            <div className="p-3 rounded-full bg-lavender-bliss/20">
              <Star className="h-10 w-10 text-lavender-bliss" />
            </div>
            <div className="p-3 rounded-full bg-peach-glow/20">
              <Brain className="h-8 w-8 text-peach-glow" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Discover Your Cosmic Wellness Journey
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Blend ancient astrological wisdom with modern wellness practices. 
            Understand your emotions, make better decisions, and find your path 
            through personalized cosmic insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="default" 
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => document.getElementById('kundli-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Free Kundli
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-lavender-bliss hover:bg-lavender-bliss/20"
              onClick={() => document.getElementById('daily-planner')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Daily Planner
            </Button>
            {user && (
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            )}
          </div>

          {/* Hero Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <Card className="bg-background/70 border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Color of the Day</p>
                  <p className="text-sm font-medium text-cosmic-blue">Wellness Mint</p>
                </div>
                <Sun className="h-6 w-6 text-wellness-mint" />
              </CardContent>
            </Card>
            <Card className="bg-background/70 border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Lucky Time Window</p>
                  <p className="text-sm font-medium text-primary">10:00 — 13:00</p>
                </div>
                <Moon className="h-6 w-6 text-lavender-bliss" />
              </CardContent>
            </Card>
            <Card className="bg-background/70 border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Today’s Vibe</p>
                  <p className="text-sm font-medium text-lavender-bliss">Creative • Calm</p>
                </div>
                <Star className="h-6 w-6 text-peach-glow" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Daily Planner */}
      <section id="daily-planner" className="py-16 px-4">
        <div className="container mx-auto">
          <DailyPlanner />
        </div>
      </section>

      {/* Daily Wellness Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <MoodTracker />
            <WellnessTips />
            <CommunityHighlights />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-wellness/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Your Wellness Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-lavender-bliss/30 bg-gradient-wellness-card/30">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Free Kundli Generation</h3>
                <p className="text-muted-foreground">
                  Generate your complete birth chart and cosmic wellness profile at no cost
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-lavender-bliss/30 bg-gradient-wellness-card/30">
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-lavender-bliss mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Holistic AI Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized wellness guidance combining astrology and modern psychology
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-lavender-bliss/30 bg-gradient-wellness-card/30">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-wellness-mint mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Community Support</h3>
                <p className="text-muted-foreground">
                  Join a community of wellness seekers on their cosmic journey
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kundli Form Section */}
      <section id="kundli-form" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Your Kundli, Your Wellness Guide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your birth details to unlock personalized insights about your emotional patterns, 
              life decisions, and wellness recommendations
            </p>
          </div>
          
          <KundliForm 
            onSubmit={handleKundliSubmit}
            isAuthenticated={!!user}
            onAuthRequired={handleAuthRequired}
          />
        </div>
      </section>

      <Footer />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default Index;
