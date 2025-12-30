import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number | null;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ current, total, className, showLabel = true, size = 'sm' }: ProgressBarProps) {
  const percentage = total ? Math.min((current / total) * 100, 100) : 0;
  
  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && total && (
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{current}/{total}</span>
        </div>
      )}
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            percentage === 100 
              ? "bg-gradient-to-r from-green-500 to-emerald-500" 
              : "bg-gradient-to-r from-primary to-accent"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
