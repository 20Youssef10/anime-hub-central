import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Anime } from '@/types/anime';
import { AnimeCard } from './AnimeCard';
import { Button } from '@/components/ui/button';

interface AnimeCarouselProps {
  title: string;
  anime: Anime[];
  showRank?: boolean;
}

export function AnimeCarousel({ title, anime, showRank }: AnimeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="hidden md:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
      >
        {anime.map((item, index) => (
          <div key={item.id} className="flex-shrink-0 w-36 md:w-44">
            <AnimeCard 
              anime={item} 
              showRank={showRank} 
              rank={showRank ? index + 1 : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
