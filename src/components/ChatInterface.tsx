import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Save, Sparkles, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface KundliData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface ChatInterfaceProps {
  kundliData: KundliData;
  credits: number;
  onCreditChange: (newCredits: number) => void;
  onSaveChat?: (messages: Message[], kundliData: KundliData) => void;
  initialMessages?: Message[];
}

const ChatInterface = ({ 
  kundliData, 
  credits, 
  onCreditChange, 
  onSaveChat,
  initialMessages = []
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Add initial AI greeting with basic Kundli info if no initial messages
    if (initialMessages.length === 0) {
      return [{
        id: "initial",
        type: "ai",
        content: `🌟 Welcome, ${kundliData.name}! 

I've analyzed your cosmic profile based on your birth details:
📅 Born: ${new Date(kundliData.dateOfBirth).toLocaleDateString()}
⏰ Time: ${kundliData.timeOfBirth}
📍 Place: ${kundliData.placeOfBirth}

Your celestial journey awaits! I'm here to provide insights about your astrology, personality, relationships, career, and life path. What would you like to explore first?

✨ *Kundli generation is free - each question costs 1 credit*`,
        timestamp: new Date(),
      }];
    }
    return initialMessages;
  });
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (credits <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need credits to ask questions. You'll receive 10 new credits tomorrow!",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Deduct credit
    onCreditChange(credits - 1);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `🔮 Based on your cosmic profile and your question: "${inputMessage}"

Here's your personalized astrological insight:

This is a simulated response that would provide detailed astrological guidance based on your birth chart and current planetary positions. In a real implementation, this would connect to an AI service that analyzes your Kundli data and provides personalized insights.

✨ *This reading is personalized for ${kundliData.name} born on ${new Date(kundliData.dateOfBirth).toLocaleDateString()} at ${kundliData.timeOfBirth} in ${kundliData.placeOfBirth}*`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsSaved(false); // Mark as unsaved after new messages
    }, 2000);
  };

  const handleSaveChat = () => {
    if (onSaveChat) {
      onSaveChat(messages, kundliData);
      setIsSaved(true);
      toast({
        title: "Chat Saved",
        description: "Your cosmic conversation has been saved to your history.",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col shadow-celestial border-primary/20 bg-gradient-mystical/30 backdrop-blur-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Cosmic Chat
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-background/60 border border-primary/20">
              <Sparkles className="w-4 h-4 text-golden" />
              <span className="text-sm font-medium text-primary">{credits} Credits</span>
            </div>
            <Button 
              variant="golden" 
              size="sm" 
              onClick={handleSaveChat}
              disabled={isSaved}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaved ? "Saved" : "Save Chat"}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gradient-cosmic animate-celestial-glow"
                }`}>
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-[80%] ${
                  message.type === "user" ? "text-right" : ""
                }`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/80 border border-primary/20"
                  }`}>
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-cosmic animate-celestial-glow flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-background/80 border border-primary/20 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-cosmic-pulse"></div>
                    <div className="w-2 h-2 bg-primary-glow rounded-full animate-cosmic-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-golden rounded-full animate-cosmic-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="flex space-x-2 pt-4 border-t border-primary/20">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your astrology, relationships, career, future..."
              className="flex-1 border-primary/20 focus:border-primary bg-background/50"
              disabled={isLoading || credits <= 0}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading || credits <= 0}
              variant="cosmic"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {credits <= 0 && (
            <p className="text-sm text-muted-foreground text-center">
              💫 Out of credits? You'll receive 10 new credits tomorrow!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;