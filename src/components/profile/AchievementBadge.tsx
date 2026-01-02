import { Trophy, Star, Flame, Clock, Heart, Zap, Award, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: 'trophy' | 'star' | 'flame' | 'clock' | 'heart' | 'zap' | 'award' | 'crown';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  flame: Flame,
  clock: Clock,
  heart: Heart,
  zap: Zap,
  award: Award,
  crown: Crown,
};

const tierStyles = {
  bronze: 'from-amber-700 to-amber-500 shadow-amber-500/30',
  silver: 'from-slate-400 to-slate-200 shadow-slate-400/30',
  gold: 'from-yellow-500 to-yellow-300 shadow-yellow-500/30',
  platinum: 'from-cyan-400 to-blue-400 shadow-cyan-400/30',
};

const sizeStyles = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
};

export function AchievementBadge({ achievement, size = 'md', className }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.icon];
  const isUnlocked = !!achievement.unlockedAt;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative rounded-full flex items-center justify-center transition-all duration-300",
              sizeStyles[size],
              isUnlocked
                ? `bg-gradient-to-br ${tierStyles[achievement.tier]} shadow-lg cursor-pointer hover:scale-110`
                : "bg-secondary/50 cursor-default opacity-40 grayscale",
              className
            )}
          >
            <Icon className={cn(iconSizes[size], isUnlocked ? "text-white" : "text-muted-foreground")} />
            
            {/* Progress Ring */}
            {!isUnlocked && achievement.progress !== undefined && achievement.maxProgress && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary/30"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(achievement.progress / achievement.maxProgress) * 283} 283`}
                  className="text-primary"
                />
              </svg>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <div className="space-y-1">
            <p className="font-semibold">{achievement.name}</p>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
            {!isUnlocked && achievement.progress !== undefined && (
              <p className="text-xs text-primary">
                {achievement.progress}/{achievement.maxProgress}
              </p>
            )}
            {isUnlocked && achievement.unlockedAt && (
              <p className="text-xs text-muted-foreground">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface AchievementGridProps {
  achievements: Achievement[];
  className?: string;
}

export function AchievementGrid({ achievements, className }: AchievementGridProps) {
  const unlocked = achievements.filter(a => a.unlockedAt);
  const locked = achievements.filter(a => !a.unlockedAt);
  
  return (
    <div className={cn("space-y-4", className)}>
      {unlocked.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Unlocked ({unlocked.length})
          </h4>
          <div className="flex flex-wrap gap-3">
            {unlocked.map(achievement => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
      
      {locked.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Locked ({locked.length})
          </h4>
          <div className="flex flex-wrap gap-3">
            {locked.map(achievement => (
              <AchievementBadge key={achievement.id} achievement={achievement} size="sm" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
