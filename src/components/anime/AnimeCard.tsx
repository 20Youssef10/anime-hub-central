import { Link } from 'react-router-dom';
import { Star, Play, Plus, Check } from 'lucide-react';
import { Anime } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils';

interface AnimeCardProps {
  anime: Anime;
  showRank?: boolean;
  rank?: number;
}

export function AnimeCard({ anime, showRank, rank }: AnimeCardProps) {
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
    <Link to={`/anime/${anime.id}`} className="block group">
      <div className="anime-card">
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          
          {/* Rank Badge */}
          {showRank && rank && (
            <div className="absolute top-2 left-2 z-20">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-primary-foreground shadow-lg">
                {rank}
              </div>
            </div>
          )}

          {/* Score Badge */}
          <div className="absolute top-2 right-2 z-20">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-md">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-xs font-semibold">{anime.score.toFixed(1)}</span>
            </div>
          </div>

          {/* Status Badge */}
          {anime.status === 'RELEASING' && anime.nextAiringEpisode && (
            <div className="absolute bottom-2 left-2 right-2 z-20">
              <div className="status-badge bg-primary/90 text-primary-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse" />
                  Ep {anime.nextAiringEpisode.episode} airing soon
                </span>
              </div>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Button 
              size="icon" 
              variant="glow" 
              className="w-12 h-12 rounded-full"
            >
              <Play className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              variant="glass"
              className={cn(
                "w-10 h-10 rounded-full",
                inList && "bg-primary/20 text-primary"
              )}
              onClick={handleWatchlistClick}
            >
              {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{anime.seasonYear}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
