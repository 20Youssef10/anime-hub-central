import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Clock, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface RecentlyViewedProps {
  maxItems?: number;
  showClear?: boolean;
}

export function RecentlyViewed({ maxItems = 10, showClear = true }: RecentlyViewedProps) {
  const { recentlyViewed, removeFromRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  const displayItems = recentlyViewed.slice(0, maxItems);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="w-5 h-5 text-primary" />
          Recently Viewed
        </h3>
        {showClear && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentlyViewed}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3">
          {displayItems.map((item) => (
            <div key={item.animeId} className="relative group flex-shrink-0">
              <Link to={`/anime/${item.animeId}`}>
                <div className="w-24 space-y-2">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs font-medium truncate">{item.title}</p>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromRecentlyViewed(item.animeId);
                }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
