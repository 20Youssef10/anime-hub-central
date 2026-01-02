import { Link } from 'react-router-dom';
import { Star, Sparkles, Plus, Check } from 'lucide-react';
import { Anime } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  anime: Anime;
  reason?: string;
  matchScore?: number;
  className?: string;
}

export function RecommendationCard({ 
  anime, 
  reason, 
  matchScore,
  className 
}: RecommendationCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inList = isInWatchlist(anime.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime.id);
    }
  };

  return (
    <Link
      to={`/anime/${anime.id}`}
      className={cn("block group", className)}
    >
      <div className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
        <div className="flex">
          {/* Cover Image */}
          <div className="relative w-24 h-36 flex-shrink-0 overflow-hidden">
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {matchScore && (
              <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary/90 text-primary-foreground text-xs font-medium flex items-center gap-0.5">
                <Sparkles className="w-3 h-3" />
                {matchScore}%
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 p-3 min-w-0 flex flex-col">
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {anime.title}
            </h4>
            
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-accent fill-accent" />
                {anime.score.toFixed(1)}
              </span>
              <span>•</span>
              <span>{anime.episodes || '?'} eps</span>
            </div>

            {reason && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {reason}
              </p>
            )}

            <div className="mt-auto pt-2">
              <Button
                size="sm"
                variant={inList ? "outline" : "glow"}
                className="w-full h-7 text-xs gap-1"
                onClick={handleWatchlistClick}
              >
                {inList ? (
                  <>
                    <Check className="w-3 h-3" />
                    In List
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    Add to List
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
