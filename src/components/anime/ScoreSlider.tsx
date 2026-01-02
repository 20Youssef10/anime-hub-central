import { useState } from 'react';
import { Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ScoreSliderProps {
  value?: number;
  onChange: (value: number) => void;
  className?: string;
}

const scoreLabels: Record<number, string> = {
  1: 'Appalling',
  2: 'Horrible',
  3: 'Very Bad',
  4: 'Bad',
  5: 'Average',
  6: 'Fine',
  7: 'Good',
  8: 'Very Good',
  9: 'Great',
  10: 'Masterpiece',
};

export function ScoreSlider({ value, onChange, className }: ScoreSliderProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value ?? 0;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Your Score</span>
        <div className="flex items-center gap-2">
          <Star className={cn(
            "w-5 h-5 transition-colors",
            displayValue > 0 ? "text-accent fill-accent" : "text-muted-foreground"
          )} />
          <span className="text-lg font-bold w-8 text-center">
            {displayValue || '—'}
          </span>
        </div>
      </div>

      <Slider
        value={[value ?? 0]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={10}
        step={1}
        className="cursor-pointer"
      />

      <p className={cn(
        "text-sm text-center transition-colors",
        displayValue > 0 ? "text-primary" : "text-muted-foreground"
      )}>
        {displayValue > 0 ? scoreLabels[displayValue] : 'Not rated'}
      </p>

      {/* Quick Select */}
      <div className="flex justify-between gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHoverValue(n)}
            onMouseLeave={() => setHoverValue(null)}
            className={cn(
              "flex-1 h-2 rounded-full transition-all duration-200",
              n <= displayValue ? "bg-gradient-to-r from-primary to-accent" : "bg-secondary",
              "hover:scale-y-150"
            )}
          />
        ))}
      </div>
    </div>
  );
}
