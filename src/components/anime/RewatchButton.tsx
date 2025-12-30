import { RotateCcw, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/useWatchlist';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface RewatchButtonProps {
  animeId: number;
  animeTitle: string;
  rewatchCount?: number;
  variant?: 'icon' | 'full';
}

export function RewatchButton({ animeId, animeTitle, rewatchCount = 0, variant = 'icon' }: RewatchButtonProps) {
  const { incrementRewatch } = useWatchlist();

  const handleRewatch = () => {
    incrementRewatch(animeId);
    toast.success(`Started rewatch #${rewatchCount + 1} of "${animeTitle}"`);
  };

  if (variant === 'icon') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <RefreshCw className="w-4 h-4" />
            {rewatchCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {rewatchCount}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-card sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-primary" />
              Start Rewatch?
            </DialogTitle>
            <DialogDescription>
              This will reset your progress and increase your rewatch count to {rewatchCount + 1}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="glow" onClick={handleRewatch}>
              Start Rewatch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Rewatch {rewatchCount > 0 && `(${rewatchCount})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-primary" />
            Start Rewatch?
          </DialogTitle>
          <DialogDescription>
            You've watched "{animeTitle}" {rewatchCount} time{rewatchCount !== 1 ? 's' : ''}.
            Starting a rewatch will reset your episode progress.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="glow" onClick={handleRewatch}>
            Start Rewatch #{rewatchCount + 1}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
