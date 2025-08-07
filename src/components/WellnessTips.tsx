import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Brain, RefreshCw } from "lucide-react";
import { useState } from "react";

const wellnessTips = [
  {
    category: "Mindfulness",
    icon: Brain,
    tip: "Take 5 deep breaths and focus on your cosmic connection. Your Mercury placement suggests meditation will enhance your mental clarity today.",
    color: "text-lavender-bliss",
    bgGradient: "bg-gradient-lavender"
  },
  {
    category: "Fitness",
    icon: Heart,
    tip: "Your Mars energy is strong today! Try a 15-minute dance session or yoga flow to channel this dynamic energy positively.",
    color: "text-peach-glow",
    bgGradient: "bg-gradient-peach"
  },
  {
    category: "Nutrition",
    icon: Leaf,
    tip: "Venus in your chart suggests nourishing foods today. Try green leafy vegetables and citrus fruits to align with your cosmic energy.",
    color: "text-wellness-mint",
    bgGradient: "bg-gradient-mint"
  }
];

const WellnessTips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % wellnessTips.length);
  };

  const tip = wellnessTips[currentTip];
  const Icon = tip.icon;

  return (
    <Card className="w-full bg-gradient-wellness-card border-lavender-bliss/30 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
          <Icon className={`h-6 w-6 ${tip.color}`} />
          Daily Wellness Tip
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized advice aligned with your cosmic energy
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg ${tip.bgGradient}/20 border border-current/10`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${tip.bgGradient}/40`}>
              <Icon className={`h-5 w-5 ${tip.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">{tip.category}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip.tip}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {wellnessTips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentTip ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextTip}
            className="hover:bg-lavender-bliss/20 border-lavender-bliss/40"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Next Tip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessTips;