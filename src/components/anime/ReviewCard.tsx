import { useState } from 'react';
import { Star, ThumbsUp, ChevronDown, ChevronUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Review {
  id: number;
  author: {
    name: string;
    avatar?: string;
  };
  score: number;
  summary: string;
  body: string;
  createdAt: string;
  likes: number;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={cn("glass-card rounded-xl p-5 space-y-4", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            {review.author.avatar ? (
              <img src={review.author.avatar} alt={review.author.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <h4 className="font-medium text-sm">{review.author.name}</h4>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        
        {/* Score */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <span className="font-semibold text-sm">{review.score}/10</span>
        </div>
      </div>

      {/* Summary */}
      <p className="font-medium">{review.summary}</p>

      {/* Body */}
      <div className={cn(
        "text-sm text-muted-foreground transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-[1000px]" : "max-h-24"
      )}>
        <p className="leading-relaxed">{review.body}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground gap-1"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLiked(!liked)}
          className={cn(
            "gap-1.5",
            liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ThumbsUp className={cn("w-4 h-4", liked && "fill-primary")} />
          <span>{review.likes + (liked ? 1 : 0)}</span>
        </Button>
      </div>
    </div>
  );
}
