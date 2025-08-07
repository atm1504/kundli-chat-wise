import { Heart, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-wellness border-t border-lavender-bliss/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              HoroscopeGuru.AI
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Blending ancient astrological wisdom with modern wellness practices 
              for Gen Z's cosmic journey.
            </p>
            <div className="flex items-center gap-1 text-sm text-primary">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-wellness-mint fill-current" />
              <span>for cosmic souls</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Wellness Blog
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Community
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                GDPR Compliance
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@horoscopeguru.ai" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@horoscopeguru.ai
              </a>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8 hover:bg-lavender-bliss/20 border-lavender-bliss/40"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8 hover:bg-lavender-bliss/20 border-lavender-bliss/40"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8 hover:bg-lavender-bliss/20 border-lavender-bliss/40"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-lavender-bliss/30 mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 HoroscopeGuru.AI. All rights reserved. | Your cosmic journey starts here.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;