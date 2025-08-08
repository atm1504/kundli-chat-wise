import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import KundliForm from "@/components/KundliForm";
import AuthModal from "@/components/AuthModal";
import MoodTracker from "@/components/MoodTracker";
import WellnessTips from "@/components/WellnessTips";
import CommunityHighlights from "@/components/CommunityHighlights";
import DailyPlanner from "@/components/DailyPlanner";
import CosmicHero from "@/components/home/CosmicHero";
import QuickActions from "@/components/home/QuickActions";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/Footer";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Brain, Users } from "lucide-react";

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
      
      {/* Hero */}
      <CosmicHero />

      {/* Quick Actions */}
      <QuickActions />

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

      {/* FAQ */}
      <FAQ />

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
