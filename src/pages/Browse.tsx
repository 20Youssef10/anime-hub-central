import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { GenreFilter } from '@/components/anime/GenreFilter';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAnime, genres, seasons, years, sortOptions } from '@/data/mockAnime';

const Browse = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const handleGenreSelect = (genre: string) => {
    if (genre === 'all') {
      setSelectedGenres([]);
    } else {
      setSelectedGenres(prev =>
        prev.includes(genre)
          ? prev.filter(g => g !== genre)
          : [...prev, genre]
      );
    }
  };

  const filteredAnime = useMemo(() => {
    let result = [...mockAnime];

    // Filter by genres
    if (selectedGenres.length > 0) {
      result = result.filter(anime =>
        selectedGenres.some(genre => anime.genres.includes(genre))
      );
    }

    // Filter by season
    if (selectedSeason) {
      result = result.filter(anime => anime.season === selectedSeason);
    }

    // Filter by year
    if (selectedYear) {
      result = result.filter(anime => anime.seasonYear === parseInt(selectedYear));
    }

    // Sort
    switch (sortBy) {
      case 'score':
        result.sort((a, b) => b.score - a.score);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        result.sort((a, b) => (b.seasonYear || 0) - (a.seasonYear || 0));
        break;
      default:
        result.sort((a, b) => a.popularity - b.popularity);
    }

    return result;
  }, [selectedGenres, selectedSeason, selectedYear, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Browse Anime</h1>
            <p className="text-muted-foreground mt-1">
              {filteredAnime.length} anime found
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 glass-card border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border">
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className={`space-y-4 mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          {/* Genre Filter */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Genres</h3>
            <GenreFilter
              genres={genres}
              selected={selectedGenres}
              onSelect={handleGenreSelect}
            />
          </div>

          {/* Season & Year Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-36 glass-card border-border/50">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border">
                <SelectItem value="">All Seasons</SelectItem>
                {seasons.map(season => (
                  <SelectItem key={season} value={season}>
                    {season.charAt(0) + season.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 glass-card border-border/50">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-xl border-border">
                <SelectItem value="">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(selectedGenres.length > 0 || selectedSeason || selectedYear) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedGenres([]);
                  setSelectedSeason('');
                  setSelectedYear('');
                }}
                className="text-muted-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredAnime.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAnime.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No anime found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
