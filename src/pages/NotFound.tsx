import { Home, Ghost, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* Animated Ghost */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative animate-float">
            <Ghost className="w-full h-full text-primary" strokeWidth={1.5} />
            {/* Eyes */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="w-3 h-3 bg-background rounded-full animate-blink" />
              <div className="w-3 h-3 bg-background rounded-full animate-blink" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The anime you're looking for has vanished into another dimension. 
          Maybe it's still being subbed?
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="glow" size="lg" className="gap-2 w-full sm:w-auto">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/browse">
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <Search className="w-5 h-5" />
              Browse Anime
            </Button>
          </Link>
        </div>

        {/* Popular Suggestions */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            While you're here, check out some popular anime:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/browse" className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              Action
            </Link>
            <Link to="/browse" className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              Romance
            </Link>
            <Link to="/browse" className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              Comedy
            </Link>
            <Link to="/browse" className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
              Fantasy
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .animate-blink {
          animation: blink 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
