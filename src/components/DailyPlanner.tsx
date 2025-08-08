import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sun, Moon, Clock, Shirt, Hash } from "lucide-react";

const TimelineRow = ({ label, items }: { label: string; items: string[] }) => (
  <div className="flex items-start gap-3">
    <Clock className="h-4 w-4 mt-1 text-primary" />
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground">{items.join(" • ")}</p>
    </div>
  </div>
);

const DailyPlanner = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Do / Don't */}
      <Card className="bg-gradient-wellness-card border-lavender-bliss/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-lavender-bliss" /> Daily Cosmic Planner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-lavender-bliss/40 bg-background/70 p-3">
              <p className="text-xs text-muted-foreground mb-2">Do</p>
              <ul className="text-sm text-foreground list-disc pl-4 space-y-1">
                <li>Deep work 10–1</li>
                <li>Gentle movement</li>
                <li>Reach out to a friend</li>
              </ul>
            </div>
            <div className="rounded-lg border border-lavender-bliss/40 bg-background/70 p-3">
              <p className="text-xs text-muted-foreground mb-2">Don't</p>
              <ul className="text-sm text-foreground list-disc pl-4 space-y-1">
                <li>Overshare online</li>
                <li>Major financial decisions</li>
                <li>Late-night screens</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-lavender-bliss/30 text-foreground border-lavender-bliss/40">Color of the Day</Badge>
            <span className="text-sm font-medium text-cosmic-blue">Wellness Mint</span>
            <Shirt className="h-4 w-4 text-wellness-mint" />
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-peach-glow/30 text-foreground border-peach-glow/40">Lucky Number</Badge>
            <span className="text-sm font-medium text-primary">7</span>
            <Hash className="h-4 w-4 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Auspicious Timeline */}
      <Card className="bg-gradient-wellness-card border-lavender-bliss/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sun className="h-5 w-5 text-peach-glow" /> Auspicious Timing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TimelineRow label="Morning" items={["Focus work", "Meditation", "Email replies"]} />
          <TimelineRow label="Afternoon" items={["Creative tasks", "Walk", "Calls"]} />
          <TimelineRow label="Evening" items={["Wind down", "Journal", "Stretch"]} />
        </CardContent>
      </Card>

      {/* Outfit & Vibe */}
      <Card className="bg-gradient-wellness-card border-lavender-bliss/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Moon className="h-5 w-5 text-cosmic-purple" /> Outfit & Vibe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-lavender-bliss/40 bg-background/70 p-3">
            <p className="text-sm text-foreground">
              Wear: <span className="font-medium text-primary">Lavender / Mint</span>
            </p>
            <p className="text-sm text-muted-foreground">Soft textures, breathable fabrics.</p>
          </div>
          <div className="rounded-lg border border-lavender-bliss/40 bg-background/70 p-3">
            <p className="text-sm text-foreground">
              Today’s Vibe: <span className="font-medium text-lavender-bliss">Creative • Calm</span>
            </p>
            <p className="text-sm text-muted-foreground">Lean into connection and gentle focus.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyPlanner;
