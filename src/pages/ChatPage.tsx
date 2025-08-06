import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface User {
  email: string;
  name: string;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { kundliData, savedChatId } = location.state || {};

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

    // Redirect if no Kundli data
    if (!kundliData) {
      navigate('/dashboard');
    }
  }, [navigate, kundliData]);

  const handleCreditChange = (newCredits: number) => {
    setCredits(newCredits);
    localStorage.setItem('credits', newCredits.toString());
  };

  const handleSaveChat = (messages: Message[], kundliData: any) => {
    const chatId = savedChatId || `chat_${Date.now()}`;
    const savedChat = {
      id: chatId,
      title: `Reading for ${kundliData.name}`,
      date: new Date(),
      kundliData,
      messageCount: messages.length,
      messages: messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    // Get existing saved chats
    const existingChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
    
    // Update or add new chat
    const chatIndex = existingChats.findIndex((chat: any) => chat.id === chatId);
    if (chatIndex >= 0) {
      existingChats[chatIndex] = savedChat;
    } else {
      existingChats.unshift(savedChat);
    }
    
    localStorage.setItem('savedChats', JSON.stringify(existingChats));
  };

  const handleAuthClick = () => {
    navigate('/dashboard');
  };

  const getInitialMessages = (): Message[] => {
    if (savedChatId) {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
      const savedChat = savedChats.find((chat: any) => chat.id === savedChatId);
      if (savedChat && savedChat.messages) {
        return savedChat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    }
    return [];
  };

  if (!user || !kundliData) {
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
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="mystical" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-cosmic bg-clip-text text-transparent">
              Cosmic Consultation
            </h1>
            <p className="text-muted-foreground">
              Your personalized astrological guidance session
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface 
          kundliData={kundliData}
          credits={credits}
          onCreditChange={handleCreditChange}
          onSaveChat={handleSaveChat}
          initialMessages={getInitialMessages()}
        />
      </div>
    </div>
  );
};

export default ChatPage;