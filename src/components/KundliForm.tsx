import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KundliFormData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface KundliFormProps {
  onSubmit: (data: KundliFormData) => void;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
  initialData?: Partial<KundliFormData>;
}

const KundliForm = ({ onSubmit, isAuthenticated = false, onAuthRequired, initialData }: KundliFormProps) => {
  const [formData, setFormData] = useState<KundliFormData>({
    name: initialData?.name || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    timeOfBirth: initialData?.timeOfBirth || "",
    placeOfBirth: initialData?.placeOfBirth || "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof KundliFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate your Kundli.",
        variant: "destructive",
      });
      return;
    }

    // Store form data temporarily if not authenticated
    if (!isAuthenticated) {
      localStorage.setItem('kundliFormData', JSON.stringify(formData));
      onAuthRequired?.();
      return;
    }

    // Submit form data
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-celestial border-primary/20 bg-gradient-mystical backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Star className="h-12 w-12 text-golden animate-mystical-float" />
            <div className="absolute inset-0 animate-cosmic-pulse">
              <Star className="h-12 w-12 text-primary-glow opacity-50" />
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
          Create Your Cosmic Profile
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your birth details to unlock the secrets of your celestial journey
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary font-medium flex items-center">
              <Star className="w-4 h-4 mr-2 text-golden" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border-primary/20 focus:border-primary bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-primary font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-cosmic-blue" />
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="border-primary/20 focus:border-primary bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeOfBirth" className="text-primary font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2 text-golden" />
              Time of Birth
            </Label>
            <Input
              id="timeOfBirth"
              type="time"
              value={formData.timeOfBirth}
              onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
              className="border-primary/20 focus:border-primary bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeOfBirth" className="text-primary font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-cosmic-blue" />
              Place of Birth
            </Label>
            <Input
              id="placeOfBirth"
              type="text"
              placeholder="City, State, Country"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
              className="border-primary/20 focus:border-primary bg-background/50"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full mt-8"
            variant="cosmic"
            size="lg"
          >
            {isAuthenticated ? "Generate My Kundli" : "Continue to Generate Kundli"}
          </Button>
          
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground text-center mt-4">
              You'll need to sign in to continue with your cosmic reading
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default KundliForm;