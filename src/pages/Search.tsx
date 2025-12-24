import { useState, useMemo } from 'react';
import { Search as SearchIcon, X, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { Button } from '@/components/ui/button';
import { mockAnime } from '@/data/mockAnime';

const Search = () => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return mockAnime.filter(anime =>
      anime.title.toLowerCase().includes(lowerQuery) ||
      anime.titleEnglish?.toLowerCase().includes(lowerQuery) ||
      anime.titleJapanese?.includes(query) ||
      anime.genres.some(g => g.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  const trendingSearches = ['Jujutsu Kaisen', 'Attack on Titan', 'One Piece', 'Demon Slayer', 'Spy x Family'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime by title, genre..."
              className="w-full h-14 pl-12 pr-12 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {!query ? (
          /* Trending Searches */
          <div className="max-w-2xl mx-auto">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Recent Popular */}
            <h2 className="text-lg font-semibold mt-12 mb-4">Popular Right Now</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mockAnime.slice(0, 8).map(anime => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          </div>
        ) : (
          /* Search Results */
          <div>
            <p className="text-muted-foreground mb-6">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
            </p>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {searchResults.map(anime => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <SearchIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
