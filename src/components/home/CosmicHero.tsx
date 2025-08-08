import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Star, Brain } from "lucide-react";

const CosmicHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-celestial" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-wellness opacity-40 blur-3xl floating-orb" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-lavender opacity-40 blur-3xl floating-orb" />

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="flex justify-center gap-6">
            <div className="p-3 rounded-full bg-wellness-mint/20"><Heart className="h-7 w-7 text-wellness-mint" /></div>
            <div className="p-3 rounded-full bg-lavender-bliss/20"><Star className="h-8 w-8 text-lavender-bliss" /></div>
            <div className="p-3 rounded-full bg-peach-glow/20"><Brain className="h-7 w-7 text-peach-glow" /></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-cosmic bg-clip-text text-transparent">
            Cosmic Wellness in Your Day‑to‑Day Life
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground">
            Empathetic guidance for emotions, timing, and decisions—rooted in your stars and grounded in wellness.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              className="min-w-48"
              onClick={() => document.getElementById('kundli-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="h-5 w-5 mr-2" /> Generate Free Kundli
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-48 border-lavender-bliss/50 hover:bg-lavender-bliss/20"
              onClick={() => document.getElementById('daily-planner')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Today’s Cosmic Planner
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="bg-background/70 border-primary/20"><CardContent className="p-4 text-sm"><span className="font-medium text-primary">10</span> free credits daily</CardContent></Card>
            <Card className="bg-background/70 border-primary/20"><CardContent className="p-4 text-sm">Guidance ready in <span className="font-medium text-lavender-bliss">60s</span></CardContent></Card>
            <Card className="bg-background/70 border-primary/20"><CardContent className="p-4 text-sm">Private, secure, <span className="font-medium text-foreground">wellness‑first</span></CardContent></Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CosmicHero;
