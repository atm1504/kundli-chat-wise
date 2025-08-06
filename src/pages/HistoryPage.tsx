import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Trash2, Calendar, MessageCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const HistoryPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(10);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState<SavedChat[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      const chats = JSON.parse(storedChats).map((chat: any) => ({
        ...chat,
        date: new Date(chat.date)
      }));
      setSavedChats(chats);
      setFilteredChats(chats);
    }
  }, [navigate]);

  useEffect(() => {
    // Filter chats based on search term
    if (searchTerm.trim() === "") {
      setFilteredChats(savedChats);
    } else {
      const filtered = savedChats.filter(chat =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.kundliData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.kundliData.placeOfBirth.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchTerm, savedChats]);

  const handleOpenChat = (chat: SavedChat) => {
    navigate('/chat', { 
      state: { 
        kundliData: chat.kundliData,
        savedChatId: chat.id 
      } 
    });
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = savedChats.filter(chat => chat.id !== chatId);
    setSavedChats(updatedChats);
    localStorage.setItem('savedChats', JSON.stringify(updatedChats));
    
    toast({
      title: "Chat Deleted",
      description: "Your cosmic conversation has been removed from history.",
    });
  };

  const handleAuthClick = () => {
    navigate('/dashboard');
  };

  const sortedChats = filteredChats.sort((a, b) => b.date.getTime() - a.date.getTime());

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
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="mystical" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
              Your Cosmic History
            </h1>
            <p className="text-xl text-muted-foreground">
              All your saved astrological consultations and cosmic insights
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search your readings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary bg-background/50"
              />
            </div>
          </div>
        </div>

        {/* Chat History */}
        {sortedChats.length === 0 ? (
          <Card className="max-w-md mx-auto shadow-celestial border-primary/20 bg-gradient-mystical/50">
            <CardContent className="text-center py-12">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {searchTerm ? "No matching readings found" : "No saved readings yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms" 
                  : "Start your first cosmic consultation to see it here"
                }
              </p>
              <Button 
                variant="cosmic" 
                onClick={() => navigate('/dashboard')}
              >
                {searchTerm ? "Clear Search" : "Start New Reading"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {sortedChats.map((chat) => (
              <Card 
                key={chat.id} 
                className="shadow-celestial border-primary/20 bg-gradient-mystical/30 hover:shadow-golden transition-all cursor-pointer group"
                onClick={() => handleOpenChat(chat)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary group-hover:bg-gradient-cosmic group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {chat.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Birth details: {new Date(chat.kundliData.dateOfBirth).toLocaleDateString()} at {chat.kundliData.timeOfBirth} in {chat.kundliData.placeOfBirth}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {chat.date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {chat.messageCount} messages
                      </div>
                    </div>
                    <Star className="h-4 w-4 text-golden" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {savedChats.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto shadow-celestial border-primary/20 bg-gradient-mystical/50">
              <CardContent className="pt-6">
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{savedChats.length}</p>
                    <p className="text-sm text-muted-foreground">Total Readings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {savedChats.reduce((total, chat) => total + chat.messageCount, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;