import { useState } from 'react';
import { Plus, Minus, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressTrackerProps {
  currentProgress: number;
  totalEpisodes: number | null;
  onProgressChange: (progress: number) => void;
  onComplete?: () => void;
  className?: string;
}

export function ProgressTracker({
  currentProgress,
  totalEpisodes,
  onProgressChange,
  onComplete,
  className,
}: ProgressTrackerProps) {
  const [inputValue, setInputValue] = useState(currentProgress.toString());
  
  const maxEpisodes = totalEpisodes || 9999;
  const progressPercent = totalEpisodes ? (currentProgress / totalEpisodes) * 100 : 0;
  const isComplete = totalEpisodes && currentProgress >= totalEpisodes;

  const handleIncrement = () => {
    const newProgress = Math.min(currentProgress + 1, maxEpisodes);
    onProgressChange(newProgress);
    setInputValue(newProgress.toString());
  };

  const handleDecrement = () => {
    const newProgress = Math.max(currentProgress - 1, 0);
    onProgressChange(newProgress);
    setInputValue(newProgress.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0 && num <= maxEpisodes) {
      onProgressChange(num);
    }
  };

  const handleInputBlur = () => {
    setInputValue(currentProgress.toString());
  };

  const handleMarkComplete = () => {
    if (totalEpisodes) {
      onProgressChange(totalEpisodes);
      setInputValue(totalEpisodes.toString());
    }
    onComplete?.();
  };

  const handleReset = () => {
    onProgressChange(0);
    setInputValue('0');
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress Bar */}
      {totalEpisodes && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Episode Progress</span>
            <span className="font-medium">
              {currentProgress} / {totalEpisodes}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={currentProgress <= 0}
          className="h-10 w-10"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="relative">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={0}
            max={maxEpisodes}
            className={cn(
              "w-20 h-12 text-center text-lg font-bold rounded-lg",
              "bg-secondary border-2 border-transparent",
              "focus:outline-none focus:border-primary",
              "transition-colors"
            )}
          />
          {totalEpisodes && (
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              of {totalEpisodes}
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={currentProgress >= maxEpisodes}
          className="h-10 w-10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 pt-2">
        {!isComplete && totalEpisodes && (
          <Button
            variant="glow"
            className="flex-1 gap-2"
            onClick={handleMarkComplete}
          >
            <Check className="w-4 h-4" />
            Mark Complete
          </Button>
        )}
        
        {currentProgress > 0 && (
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
