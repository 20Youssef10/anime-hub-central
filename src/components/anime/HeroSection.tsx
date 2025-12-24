import { useState, useEffect } from 'react';
import { Play, Plus, Info, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Anime } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  featuredAnime: Anime[];
}

export function HeroSection({ featuredAnime }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const currentAnime = featuredAnime[currentIndex];
  const inList = currentAnime ? isInWatchlist(currentAnime.id) : false;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnime.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredAnime.length]);

  if (!currentAnime) return null;

  const handleWatchlistClick = () => {
    if (inList) {
      removeFromWatchlist(currentAnime.id);
    } else {
      addToWatchlist(currentAnime.id);
    }
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden -mt-16">
      {/* Background Images */}
      {featuredAnime.map((anime, index) => (
        <div
          key={anime.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={anime.bannerImage || anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
      ))}

      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-end pb-20">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          {/* Badges */}
          <div className="flex items-center gap-3">
            {currentAnime.status === 'RELEASING' && (
              <span className="status-badge bg-primary text-primary-foreground">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse mr-1.5" />
                Airing Now
              </span>
            )}
            <span className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="font-semibold">{currentAnime.score.toFixed(1)}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              {currentAnime.seasonYear} • {currentAnime.episodes || '?'} Episodes
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {currentAnime.title}
          </h1>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {currentAnime.genres.slice(0, 4).map((genre) => (
              <span 
                key={genre}
                className="px-3 py-1 text-xs rounded-full bg-secondary/80 text-secondary-foreground"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <p className="text-muted-foreground line-clamp-3 max-w-xl">
            {currentAnime.synopsis}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button size="lg" variant="glow" className="gap-2">
              <Play className="w-5 h-5" />
              Watch Now
            </Button>
            <Button 
              size="lg" 
              variant="glass"
              onClick={handleWatchlistClick}
              className={cn(
                "gap-2",
                inList && "bg-primary/20 text-primary border-primary/30"
              )}
            >
              {inList ? (
                <>
                  <Check className="w-5 h-5" />
                  In My List
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add to List
                </>
              )}
            </Button>
            <Link to={`/anime/${currentAnime.id}`}>
              <Button size="lg" variant="ghost" className="gap-2">
                <Info className="w-5 h-5" />
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {featuredAnime.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-primary"
                : "bg-foreground/30 hover:bg-foreground/50"
            )}
          />
        ))}
      </div>
    </section>
  );
}
