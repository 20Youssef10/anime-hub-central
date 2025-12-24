import { Check, ChevronDown } from 'lucide-react';
import { WatchStatus } from '@/types/anime';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface WatchStatusSelectProps {
  value?: WatchStatus;
  onChange: (status: WatchStatus) => void;
}

const statusConfig: Record<WatchStatus, { label: string; color: string }> = {
  watching: { label: 'Watching', color: 'text-cyan' },
  completed: { label: 'Completed', color: 'text-green-400' },
  on_hold: { label: 'On Hold', color: 'text-yellow-400' },
  dropped: { label: 'Dropped', color: 'text-destructive' },
  plan_to_watch: { label: 'Plan to Watch', color: 'text-muted-foreground' },
};

export function WatchStatusSelect({ value, onChange }: WatchStatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48 glass-card border-border/50">
        <SelectValue placeholder="Add to List">
          {value && (
            <span className={cn("font-medium", statusConfig[value].color)}>
              {statusConfig[value].label}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-card/95 backdrop-blur-xl border-border">
        {Object.entries(statusConfig).map(([status, config]) => (
          <SelectItem 
            key={status} 
            value={status}
            className="focus:bg-secondary"
          >
            <span className={cn("font-medium", config.color)}>
              {config.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
