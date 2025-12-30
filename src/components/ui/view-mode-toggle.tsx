import { LayoutGrid, List, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list' | 'compact';

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

const modes: { value: ViewMode; icon: React.ReactNode; label: string }[] = [
  { value: 'grid', icon: <LayoutGrid className="w-4 h-4" />, label: 'Grid' },
  { value: 'list', icon: <List className="w-4 h-4" />, label: 'List' },
  { value: 'compact', icon: <LayoutList className="w-4 h-4" />, label: 'Compact' },
];

export function ViewModeToggle({ value, onChange, className }: ViewModeToggleProps) {
  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-lg bg-secondary/50", className)}>
      {modes.map((mode) => (
        <Button
          key={mode.value}
          variant="ghost"
          size="sm"
          onClick={() => onChange(mode.value)}
          className={cn(
            "px-3 py-1.5 h-auto",
            value === mode.value && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          )}
        >
          {mode.icon}
          <span className="ml-1.5 hidden sm:inline text-xs">{mode.label}</span>
        </Button>
      ))}
    </div>
  );
}
