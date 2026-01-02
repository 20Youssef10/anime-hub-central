import { Link } from 'react-router-dom';
import { Star, Check, Plus } from 'lucide-react';
import { Anime } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils';

interface AnimeCompactCardProps {
  anime: Anime;
  className?: string;
}

export function AnimeCompactCard({ anime, className }: AnimeCompactCardProps) {
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
      <div className="glass-card rounded-lg p-2 flex items-center gap-3 hover:border-primary/30 transition-all">
        {/* Cover */}
        <div className="relative w-10 h-14 flex-shrink-0 overflow-hidden rounded">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {anime.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-accent fill-accent" />
              {anime.score.toFixed(1)}
            </span>
            <span>•</span>
            <span>{anime.episodes || '?'} eps</span>
          </div>
        </div>

        {/* Quick Add */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
            inList && "opacity-100 text-primary"
          )}
          onClick={handleWatchlistClick}
        >
          {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>
    </Link>
  );
}
