import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/anime/HeroSection';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  useTrendingAnime, 
  useTopRatedAnime, 
  useAiringAnime,
  usePopularAnime 
} from '@/hooks/useAnime';

const Index = () => {
  const { data: trendingAnime = [], isLoading: loadingTrending } = useTrendingAnime(15);
  const { data: topRatedAnime = [], isLoading: loadingTopRated } = useTopRatedAnime(15);
  const { data: airingAnime = [], isLoading: loadingAiring } = useAiringAnime(15);
  const { data: popularAnime = [], isLoading: loadingPopular } = usePopularAnime(15);

  const featuredAnime = trendingAnime.slice(0, 4);
  const isLoading = loadingTrending || loadingTopRated || loadingAiring || loadingPopular;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      {loadingTrending ? (
        <div className="h-[70vh] md:h-[80vh] bg-secondary animate-pulse" />
      ) : (
        <HeroSection featuredAnime={featuredAnime} />
      )}

      {/* Content Sections */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Trending */}
        {loadingTrending ? (
          <CarouselSkeleton title="🔥 Trending Now" />
        ) : (
          <AnimeCarousel 
            title="🔥 Trending Now" 
            anime={trendingAnime}
            showRank
          />
        )}

        {/* Currently Airing */}
        {loadingAiring ? (
          <CarouselSkeleton title="📺 Currently Airing" />
        ) : (
          <AnimeCarousel 
            title="📺 Currently Airing" 
            anime={airingAnime}
          />
        )}

        {/* Top Rated */}
        {loadingTopRated ? (
          <CarouselSkeleton title="⭐ Top Rated" />
        ) : (
          <AnimeCarousel 
            title="⭐ Top Rated" 
            anime={topRatedAnime}
            showRank
          />
        )}

        {/* Most Popular */}
        {loadingPopular ? (
          <CarouselSkeleton title="🏆 Most Popular" />
        ) : (
          <AnimeCarousel 
            title="🏆 Most Popular" 
            anime={popularAnime}
          />
        )}

        {/* Recommendations Section */}
        <section className="py-8">
          <div className="glass-card rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Get Personalized Recommendations</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Sign in to sync your watchlist and get AI-powered recommendations based on your viewing history.
            </p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Sign In
              </button>
              <button className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-semibold gradient-text">AniTrack</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Track your anime journey • Powered by AniList
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function CarouselSkeleton({ title }: { title: string }) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-36 md:w-44">
            <Skeleton className="aspect-[2/3] rounded-xl" />
            <Skeleton className="h-4 mt-2 w-3/4" />
            <Skeleton className="h-3 mt-1 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Index;
