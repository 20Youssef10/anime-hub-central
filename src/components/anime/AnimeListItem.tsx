import { Link } from 'react-router-dom';
import { Star, Play, Trash2, Heart, MoreVertical, Calendar, Clock } from 'lucide-react';
import { Anime } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AnimeListItemProps {
  anime: Anime;
  progress?: number;
  score?: number;
  status?: string;
  favorite?: boolean;
  onRemove?: () => void;
  onFavorite?: () => void;
  onStatusChange?: (status: string) => void;
  className?: string;
}

export function AnimeListItem({
  anime,
  progress = 0,
  score,
  status,
  favorite,
  onRemove,
  onFavorite,
  onStatusChange,
  className,
}: AnimeListItemProps) {
  const progressPercent = anime.episodes ? (progress / anime.episodes) * 100 : 0;

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 flex items-center gap-4 group hover:border-primary/30 transition-all",
        className
      )}
    >
      {/* Cover */}
      <Link to={`/anime/${anime.id}`} className="flex-shrink-0">
        <img
          src={anime.coverImage}
          alt={anime.title}
          className="w-16 h-24 object-cover rounded-lg transition-transform group-hover:scale-105"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start gap-2">
          <Link to={`/anime/${anime.id}`} className="flex-1 min-w-0">
            <h3 className="font-semibold truncate hover:text-primary transition-colors">
              {anime.title}
            </h3>
          </Link>
          {favorite && (
            <Heart className="w-4 h-4 text-destructive fill-destructive flex-shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            {anime.score.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {anime.episodes || '?'} eps
          </span>
          {anime.seasonYear && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {anime.seasonYear}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {status === 'watching' && anime.episodes && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}/{anime.episodes}</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        )}

        {/* User Score */}
        {score && (
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">Your score:</span>
            <span className="font-medium text-primary">{score}/10</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="glow" size="sm" className="gap-1">
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Continue</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onFavorite}>
              <Heart className={cn("w-4 h-4 mr-2", favorite && "fill-destructive text-destructive")} />
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.('completed')}>
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.('on_hold')}>
              Put on Hold
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Remove from List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
