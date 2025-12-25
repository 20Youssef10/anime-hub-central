import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimeCard } from './AnimeCard';
import { Anime } from '@/types/anime';
import { cn } from '@/lib/utils';

interface SeasonalCalendarProps {
  className?: string;
}

const SEASONS = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const;
const SEASON_ICONS = {
  WINTER: '❄️',
  SPRING: '🌸',
  SUMMER: '☀️',
  FALL: '🍂',
};

function getCurrentSeason(): { season: typeof SEASONS[number]; year: number } {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  
  if (month <= 2) return { season: 'WINTER', year };
  if (month <= 5) return { season: 'SPRING', year };
  if (month <= 8) return { season: 'SUMMER', year };
  return { season: 'FALL', year };
}

export function SeasonalCalendar({ className }: SeasonalCalendarProps) {
  const current = getCurrentSeason();
  const [season, setSeason] = useState(current.season);
  const [year, setYear] = useState(current.year);

  const navigateSeason = (direction: 'prev' | 'next') => {
    const currentIndex = SEASONS.indexOf(season);
    
    if (direction === 'next') {
      if (currentIndex === 3) {
        setSeason('WINTER');
        setYear(y => y + 1);
      } else {
        setSeason(SEASONS[currentIndex + 1]);
      }
    } else {
      if (currentIndex === 0) {
        setSeason('FALL');
        setYear(y => y - 1);
      } else {
        setSeason(SEASONS[currentIndex - 1]);
      }
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateSeason('prev')}
          className="h-10 w-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="text-center">
          <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
            <span>{SEASON_ICONS[season]}</span>
            <span>{season.charAt(0) + season.slice(1).toLowerCase()} {year}</span>
          </h2>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateSeason('next')}
          className="h-10 w-10"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Season Tabs */}
      <div className="flex justify-center gap-2">
        {SEASONS.map((s) => (
          <button
            key={s}
            onClick={() => setSeason(s)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              season === s 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {SEASON_ICONS[s]} {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Year Selector */}
      <div className="flex justify-center gap-2">
        {[year - 1, year, year + 1].map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={cn(
              "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200",
              year === y 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}
