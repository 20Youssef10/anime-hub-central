import { Flame, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WatchStreakProps {
  currentStreak: number;
  longestStreak: number;
  lastWatched?: string;
  className?: string;
}

export function WatchStreak({ currentStreak, longestStreak, lastWatched, className }: WatchStreakProps) {
  const isActive = currentStreak > 0;
  
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <div className="flex items-center gap-4">
        {/* Flame Icon */}
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center",
          isActive 
            ? "bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30" 
            : "bg-secondary"
        )}>
          <Flame className={cn(
            "w-8 h-8",
            isActive ? "text-white animate-pulse" : "text-muted-foreground"
          )} />
        </div>
        
        {/* Current Streak */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Current Streak</p>
          <p className="text-3xl font-bold gradient-text">
            {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Longest Streak</p>
            <p className="font-semibold">{longestStreak} days</p>
          </div>
        </div>
        
        {lastWatched && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Last Watched</p>
              <p className="font-semibold text-sm">
                {new Date(lastWatched).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface DayActivityProps {
  days: { date: string; count: number }[];
  className?: string;
}

export function DayActivity({ days, className }: DayActivityProps) {
  const maxCount = Math.max(...days.map(d => d.count), 1);
  
  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-secondary/50';
    const ratio = count / maxCount;
    if (ratio < 0.25) return 'bg-primary/25';
    if (ratio < 0.5) return 'bg-primary/50';
    if (ratio < 0.75) return 'bg-primary/75';
    return 'bg-primary';
  };
  
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <h3 className="font-semibold mb-4">Activity</h3>
      <div className="flex flex-wrap gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-sm transition-all hover:scale-150",
              getIntensity(day.count)
            )}
            title={`${day.date}: ${day.count} episodes`}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-secondary/50" />
          <div className="w-3 h-3 rounded-sm bg-primary/25" />
          <div className="w-3 h-3 rounded-sm bg-primary/50" />
          <div className="w-3 h-3 rounded-sm bg-primary/75" />
          <div className="w-3 h-3 rounded-sm bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
