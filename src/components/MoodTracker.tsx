import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Smile, Meh, Frown, Zap, Sun, Moon, Star } from "lucide-react";

const moodOptions = [
  { icon: Heart, label: "Grateful", color: "text-wellness-mint" },
  { icon: Smile, label: "Happy", color: "text-peach-glow" },
  { icon: Sun, label: "Energetic", color: "text-primary" },
  { icon: Star, label: "Inspired", color: "text-lavender-bliss" },
  { icon: Meh, label: "Neutral", color: "text-muted-foreground" },
  { icon: Moon, label: "Peaceful", color: "text-cosmic-blue" },
  { icon: Frown, label: "Stressed", color: "text-destructive" },
  { icon: Zap, label: "Anxious", color: "text-orange-500" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Here you would typically save to database
    console.log(`Mood selected: ${mood}`);
  };

  return (
    <Card className="w-full bg-gradient-wellness-card border-lavender-bliss/30 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-foreground">
          How Are You Feeling Today?
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your daily emotions for better wellness insights
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3">
          {moodOptions.map(({ icon: Icon, label, color }) => (
            <Button
              key={label}
              variant={selectedMood === label ? "default" : "outline"}
              className={`flex flex-col h-auto py-3 px-2 ${
                selectedMood === label 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-lavender-bliss/20 border-lavender-bliss/40"
              }`}
              onClick={() => handleMoodSelect(label)}
            >
              <Icon className={`h-6 w-6 mb-1 ${selectedMood === label ? "text-primary-foreground" : color}`} />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>
        {selectedMood && (
          <div className="mt-4 p-3 bg-background/80 rounded-lg border border-lavender-bliss/30">
            <p className="text-sm text-center text-muted-foreground">
              You're feeling <span className="font-semibold text-primary">{selectedMood}</span> today. 
              Your cosmic energy reflects this mood in your readings.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;