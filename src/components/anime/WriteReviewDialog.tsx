import { useState } from 'react';
import { Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WriteReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle: string;
  animeId: number;
  onSubmit: (review: { score: number; summary: string; body: string }) => void;
}

export function WriteReviewDialog({ 
  isOpen, 
  onClose, 
  animeTitle,
  animeId,
  onSubmit 
}: WriteReviewDialogProps) {
  const [score, setScore] = useState(7);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!summary.trim()) {
      toast.error('Please add a summary');
      return;
    }
    if (!body.trim()) {
      toast.error('Please write your review');
      return;
    }
    
    onSubmit({ score, summary, body });
    toast.success('Review submitted!');
    onClose();
    
    // Reset form
    setScore(7);
    setSummary('');
    setBody('');
  };

  const displayScore = hoveredScore ?? score;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg glass-card border-border">
        <DialogHeader>
          <DialogTitle>Write a Review for "{animeTitle}"</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Score */}
          <div>
            <label className="text-sm font-medium mb-3 block">Your Score</label>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setScore(n)}
                    onMouseEnter={() => setHoveredScore(n)}
                    onMouseLeave={() => setHoveredScore(null)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "w-6 h-6 transition-colors",
                        n <= displayScore
                          ? "text-accent fill-accent"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="text-2xl font-bold text-primary">{displayScore}/10</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="text-sm font-medium mb-2 block">Summary</label>
            <Input
              placeholder="A brief summary of your review..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground mt-1">{summary.length}/100</p>
          </div>

          {/* Body */}
          <div>
            <label className="text-sm font-medium mb-2 block">Review</label>
            <Textarea
              placeholder="Share your thoughts about this anime..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
            />
            <p className="text-xs text-muted-foreground mt-1">{body.length} characters</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="glow" onClick={handleSubmit}>
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
