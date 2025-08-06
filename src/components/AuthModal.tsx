import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Sparkles, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: { email: string; name: string }) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthenticated }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && !formData.name) {
      toast({
        title: "Missing Name",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate authentication (replace with real auth)
    setTimeout(() => {
      const user = {
        email: formData.email,
        name: isLogin ? formData.email.split('@')[0] : formData.name,
      };
      
      onAuthenticated(user);
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You've successfully logged in." : "Your cosmic journey begins now.",
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-mystical border-primary/20">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-golden animate-mystical-float" />
              <div className="absolute inset-0 animate-cosmic-pulse">
                <Sparkles className="h-10 w-10 text-primary-glow opacity-50" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Join Your Cosmic Journey
          </DialogTitle>
        </DialogHeader>

        <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-primary font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-cosmic-blue" />
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-primary font-medium flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-golden" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="border-primary/20 focus:border-primary bg-background/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" variant="cosmic" disabled={isLoading}>
                {isLoading ? "Connecting to the cosmos..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-primary font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-golden" />
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-primary font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-cosmic-blue" />
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-primary font-medium flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-golden" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="border-primary/20 focus:border-primary bg-background/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-primary font-medium flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-golden" />
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="border-primary/20 focus:border-primary bg-background/50"
                />
              </div>

              <Button type="submit" className="w-full" variant="cosmic" disabled={isLoading}>
                {isLoading ? "Creating your cosmic profile..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By continuing, you agree to unlock the mysteries of the cosmos
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;