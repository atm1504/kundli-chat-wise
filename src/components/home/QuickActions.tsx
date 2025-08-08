import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, MessageSquare, Clock, Shirt } from "lucide-react";

const ActionCard = ({ title, subtitle, icon: Icon, onClick }: { title: string; subtitle: string; icon: any; onClick: () => void }) => (
  <button onClick={onClick} className="text-left group">
    <Card className="h-full bg-background/70 border-primary/20 hover:shadow-celestial transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2 rounded-full bg-gradient-wellness-card/40 border border-lavender-bliss/40">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </CardContent>
    </Card>
  </button>
);

const QuickActions = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard title="Generate Kundli" subtitle="Instant, free & detailed" icon={Star} onClick={() => document.getElementById('kundli-form')?.scrollIntoView({ behavior: 'smooth' })} />
          <ActionCard title="Ask the Oracle" subtitle="Get a clear answer now" icon={MessageSquare} onClick={() => document.getElementById('kundli-form')?.scrollIntoView({ behavior: 'smooth' })} />
          <ActionCard title="Today’s Timing" subtitle="Do/Don’t & windows" icon={Clock} onClick={() => document.getElementById('daily-planner')?.scrollIntoView({ behavior: 'smooth' })} />
          <ActionCard title="Color to Wear" subtitle="Boost your mood today" icon={Shirt} onClick={() => document.getElementById('daily-planner')?.scrollIntoView({ behavior: 'smooth' })} />
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
