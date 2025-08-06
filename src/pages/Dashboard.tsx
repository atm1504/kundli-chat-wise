import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import KundliForm from "@/components/KundliForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Plus, History, Star, Clock } from "lucide-react";

interface User {
  email: string;
  name: string;
}

interface SavedChat {
  id: string;
  title: string;
  date: Date;
  kundliData: any;
  messageCount: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(10);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Load credits
    const storedCredits = localStorage.getItem('credits');
    if (storedCredits) {
      setCredits(parseInt(storedCredits));
    }

    // Load saved chats
    const storedChats = localStorage.getItem('savedChats');
    if (storedChats) {
      setSavedChats(JSON.parse(storedChats).map((chat: any) => ({
        ...chat,
        date: new Date(chat.date)
      })));
    }
  }, [navigate]);

  const handleKundliSubmit = (kundliData: any) => {
    navigate('/chat', { state: { kundliData } });
  };

  const handleOpenChat = (chat: SavedChat) => {
    navigate('/chat', { 
      state: { 
        kundliData: chat.kundliData,
        savedChatId: chat.id 
      } 
    });
  };

  const handleAuthClick = () => {
    // Logout functionality
    localStorage.removeItem('user');
    localStorage.removeItem('credits');
    navigate('/');
  };

  if (!user) {
    return null; // Loading or redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-celestial">
      <Header 
        isAuthenticated={true}
        credits={credits}
        onAuthClick={handleAuthClick}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Star className="h-12 w-12 text-golden animate-mystical-float" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to explore the cosmos? Create a new reading or continue your cosmic journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-celestial border-primary/20 bg-gradient-mystical/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-golden" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{credits}</p>
                  <p className="text-sm text-muted-foreground">Credits Remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-celestial border-primary/20 bg-gradient-mystical/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-cosmic-blue/10">
                  <History className="h-6 w-6 text-cosmic-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{savedChats.length}</p>
                  <p className="text-sm text-muted-foreground">Saved Readings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-celestial border-primary/20 bg-gradient-mystical/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-golden/10">
                  <Clock className="h-6 w-6 text-golden" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">24h</p>
                  <p className="text-sm text-muted-foreground">Next Credit Reset</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* New Reading Section */}
          <div>
            <Card className="shadow-celestial border-primary/20 bg-gradient-mystical/30">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl bg-gradient-cosmic bg-clip-text text-transparent">
                  <Plus className="w-6 h-6 mr-2 text-golden" />
                  Start New Reading
                </CardTitle>
                <CardDescription>
                  Create a fresh cosmic consultation with your birth details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KundliForm 
                  onSubmit={handleKundliSubmit}
                  isAuthenticated={true}
                />
              </CardContent>
            </Card>
          </div>

          {/* Saved Chats Section */}
          <div>
            <Card className="shadow-celestial border-primary/20 bg-gradient-mystical/30">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl bg-gradient-cosmic bg-clip-text text-transparent">
                  <History className="w-6 h-6 mr-2 text-cosmic-blue" />
                  Your Cosmic History
                </CardTitle>
                <CardDescription>
                  Continue your saved conversations and cosmic insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedChats.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No saved readings yet</p>
                    <p className="text-sm text-muted-foreground">Start your first cosmic consultation above</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {savedChats.map((chat) => (
                      <Card 
                        key={chat.id} 
                        className="cursor-pointer hover:shadow-celestial transition-all border-primary/10 bg-background/60"
                        onClick={() => handleOpenChat(chat)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-primary">{chat.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {chat.messageCount} messages • {chat.date.toLocaleDateString()}
                              </p>
                            </div>
                            <Sparkles className="h-5 w-5 text-golden" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {savedChats.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <Button 
                      variant="mystical" 
                      className="w-full"
                      onClick={() => navigate('/history')}
                    >
                      View All History
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;