import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { AnimeGridSkeleton } from '@/components/anime/AnimeCardSkeleton';
import { SeasonalCalendar } from '@/components/anime/SeasonalCalendar';
import { useBrowseAnime } from '@/hooks/useAnime';

const SEASONS = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const;

function getCurrentSeason(): { season: typeof SEASONS[number]; year: number } {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  if (month <= 2) return { season: 'WINTER', year };
  if (month <= 5) return { season: 'SPRING', year };
  if (month <= 8) return { season: 'SUMMER', year };
  return { season: 'FALL', year };
}

const Seasonal = () => {
  const current = getCurrentSeason();
  const [season, setSeason] = useState(current.season);
  const [year, setYear] = useState(current.year);

  const { data: animeList = [], isLoading } = useBrowseAnime({
    season,
    seasonYear: year,
    sort: 'popularity',
    perPage: 30,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Seasonal Charts</h1>
          <p className="text-muted-foreground">
            Discover anime by season
          </p>
        </div>

        <SeasonalCalendar className="mb-8" />

        {isLoading ? (
          <AnimeGridSkeleton count={18} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {animeList.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Seasonal;
