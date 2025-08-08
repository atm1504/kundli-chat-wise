import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Smile, Meh, Frown, Zap, Sun, Moon, Star, Wind } from "lucide-react";

const moodOptions = [
  { icon: Heart, label: "Grateful", color: "text-wellness-mint" },
  { icon: Smile, label: "Happy", color: "text-peach-glow" },
  { icon: Sun, label: "Energetic", color: "text-primary" },
  { icon: Star, label: "Inspired", color: "text-lavender-bliss" },
  { icon: Meh, label: "Neutral", color: "text-muted-foreground" },
  { icon: Moon, label: "Peaceful", color: "text-cosmic-blue" },
  { icon: Frown, label: "Stressed", color: "text-destructive" },
  { icon: Zap, label: "Anxious", color: "text-cosmic-pink" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(parseInt(localStorage.getItem('moodStreak') || '0'));
  const [breathing, setBreathing] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    // Prefill today's mood if already set
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('moodLastDate');
    const savedMood = localStorage.getItem('moodToday');
    if (lastDate === today && savedMood) setSelectedMood(savedMood);
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const today = new Date();
    const todayKey = today.toDateString();
    const lastDateStr = localStorage.getItem('moodLastDate');

    // Update streak
    let newStreak = 1;
    if (lastDateStr) {
      const lastDate = new Date(lastDateStr);
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        newStreak = parseInt(localStorage.getItem('moodStreak') || '1');
      } else if (diffDays === 1) {
        newStreak = parseInt(localStorage.getItem('moodStreak') || '0') + 1;
      } else {
        newStreak = 1;
      }
    }

    localStorage.setItem('moodLastDate', todayKey);
    localStorage.setItem('moodStreak', String(newStreak));
    localStorage.setItem('moodToday', mood);
    setStreak(newStreak);

    console.log(`Mood selected: ${mood}`);
  };

  return (
    <Card className="w-full bg-gradient-wellness-card border-lavender-bliss/30 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
          How Are You Feeling Today?
          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-muted text-foreground">Streak: {streak}d</span>
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

        {/* Cosmic Breath */}
        <div className="mt-4 p-3 bg-background/80 rounded-lg border border-lavender-bliss/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">1‑minute Cosmic Breath</p>
            <Button size="sm" variant="outline" className="border-lavender-bliss/40 hover:bg-lavender-bliss/20" onClick={() => setBreathing(!breathing)}>
              <Wind className="h-4 w-4 mr-1" /> {breathing ? 'Stop' : 'Start'}
            </Button>
          </div>
          {breathing && (
            <p className="mt-2 text-sm text-foreground">
              Inhale 4 • Hold 4 • Exhale 4 • Hold 4 — repeat calmly.
            </p>
          )}
        </div>

        {/* Quick Note */}
        <div className="mt-3">
          <label className="text-xs text-muted-foreground">Quick note (private)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A sentence about how you’re arriving…"
            className="mt-1 w-full rounded-md border border-lavender-bliss/30 bg-background/70 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            rows={3}
          />
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