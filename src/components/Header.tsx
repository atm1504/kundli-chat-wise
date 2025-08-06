import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, User, History, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isAuthenticated?: boolean;
  credits?: number;
  onAuthClick?: () => void;
}

const Header = ({ isAuthenticated = false, credits = 0, onAuthClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <Sparkles className="h-8 w-8 text-primary group-hover:animate-celestial-glow" />
            <div className="absolute inset-0 animate-cosmic-pulse">
              <Sparkles className="h-8 w-8 text-primary-glow opacity-50" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            HoroscopeGuru.AI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/dashboard")}
                className="hover:bg-gradient-mystical"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/history")}
                className="hover:bg-gradient-mystical"
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-mystical border border-primary/20">
                <Sparkles className="w-4 h-4 text-golden" />
                <span className="text-sm font-medium text-primary">{credits} Credits</span>
              </div>
            </>
          )}
          
          <Button 
            variant={isAuthenticated ? "cosmic" : "hero"}
            onClick={onAuthClick}
            className="min-w-24"
          >
            {isAuthenticated ? (
              <User className="w-4 h-4 mr-2" />
            ) : null}
            {isAuthenticated ? "Profile" : "Login"}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {isAuthenticated && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className="w-full justify-start hover:bg-gradient-mystical"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/history")}
                  className="w-full justify-start hover:bg-gradient-mystical"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
                <div className="flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-gradient-mystical border border-primary/20">
                  <Sparkles className="w-4 h-4 text-golden" />
                  <span className="text-sm font-medium text-primary">{credits} Credits</span>
                </div>
              </>
            )}
            
            <Button 
              variant={isAuthenticated ? "cosmic" : "hero"}
              onClick={onAuthClick}
              className="w-full"
            >
              {isAuthenticated ? (
                <User className="w-4 h-4 mr-2" />
              ) : null}
              {isAuthenticated ? "Profile" : "Login"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;