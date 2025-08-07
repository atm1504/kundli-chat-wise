import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    sign: "Leo ♌",
    text: "The AI insights helped me understand my relationship patterns. The accuracy was incredible!",
    rating: 5,
    cosmic: "My Venus placement finally makes sense!"
  },
  {
    name: "Alex R.",
    sign: "Scorpio ♏",
    text: "This app guided me through a career transition with such clarity. The wellness tips are spot on.",
    rating: 5,
    cosmic: "My Mars energy is finally channeled positively."
  },
  {
    name: "Maya P.",
    sign: "Pisces ♓",
    text: "The daily mood tracking combined with astrological insights transformed my self-awareness.",
    rating: 5,
    cosmic: "Understanding my Moon sign changed everything."
  },
  {
    name: "Jordan K.",
    sign: "Gemini ♊",
    text: "I've found my community of wellness seekers here. The conversations are so meaningful.",
    rating: 5,
    cosmic: "Mercury retrograde doesn't scare me anymore!"
  }
];

const CommunityHighlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <Card className="w-full bg-gradient-wellness-card border-lavender-bliss/30 shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Community Highlights
          </h3>
          <p className="text-sm text-muted-foreground">
            Join a Community of Wellness Seekers
          </p>
        </div>

        <div className="relative min-h-[200px] flex items-center">
          <div className="w-full text-center space-y-4">
            <Quote className="h-8 w-8 text-lavender-bliss mx-auto" />
            
            <blockquote className="text-lg text-foreground leading-relaxed px-4">
              "{current.text}"
            </blockquote>
            
            <div className="space-y-2">
              <div className="flex justify-center">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-current" />
                ))}
              </div>
              
              <div className="text-center">
                <p className="font-medium text-foreground">
                  {current.name} • {current.sign}
                </p>
                <p className="text-sm text-primary italic">
                  "{current.cosmic}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="hover:bg-lavender-bliss/20 border-lavender-bliss/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="hover:bg-lavender-bliss/20 border-lavender-bliss/40"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityHighlights;