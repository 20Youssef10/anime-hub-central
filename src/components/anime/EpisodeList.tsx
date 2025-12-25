import { useState } from 'react';
import { Play, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Episode {
  number: number;
  title?: string;
  thumbnail?: string;
  duration?: number;
  aired?: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  watchedEpisodes?: number[];
  currentEpisode?: number;
  onEpisodeClick?: (episode: number) => void;
  className?: string;
}

export function EpisodeList({ 
  episodes, 
  watchedEpisodes = [], 
  currentEpisode,
  onEpisodeClick,
  className 
}: EpisodeListProps) {
  const [displayCount, setDisplayCount] = useState(12);

  const visibleEpisodes = episodes.slice(0, displayCount);
  const hasMore = episodes.length > displayCount;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {visibleEpisodes.map((episode) => {
          const isWatched = watchedEpisodes.includes(episode.number);
          const isCurrent = currentEpisode === episode.number;
          
          return (
            <button
              key={episode.number}
              onClick={() => onEpisodeClick?.(episode.number)}
              className={cn(
                "relative group text-left rounded-xl overflow-hidden transition-all duration-300",
                "border border-border/50 hover:border-primary/50",
                isCurrent && "ring-2 ring-primary"
              )}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-secondary">
                {episode.thumbnail ? (
                  <img
                    src={episode.thumbnail}
                    alt={`Episode ${episode.number}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {episode.number}
                    </span>
                  </div>
                )}
                
                {/* Overlay */}
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity",
                  "bg-background/60 backdrop-blur-sm",
                  isWatched ? "opacity-50" : "opacity-0 group-hover:opacity-100"
                )}>
                  {isWatched ? (
                    <Check className="w-8 h-8 text-primary" />
                  ) : (
                    <Play className="w-10 h-10 text-primary fill-primary" />
                  )}
                </div>

                {/* Duration */}
                {episode.duration && (
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-xs bg-background/80 backdrop-blur-sm">
                    {Math.floor(episode.duration / 60)}:{(episode.duration % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2.5">
                <p className="text-sm font-medium">
                  Episode {episode.number}
                </p>
                {episode.title && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {episode.title}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setDisplayCount(prev => prev + 12)}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            Load More ({episodes.length - displayCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
