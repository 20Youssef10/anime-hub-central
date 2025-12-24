import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/anime/HeroSection';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { mockAnime } from '@/data/mockAnime';

const Index = () => {
  const featuredAnime = mockAnime.slice(0, 4);
  const trendingAnime = [...mockAnime].sort((a, b) => b.popularity - a.popularity);
  const topRatedAnime = [...mockAnime].sort((a, b) => b.score - a.score);
  const airingNow = mockAnime.filter(a => a.status === 'RELEASING');
  const recentlyFinished = mockAnime.filter(a => a.status === 'FINISHED').slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <HeroSection featuredAnime={featuredAnime} />

      {/* Content Sections */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Trending */}
        <AnimeCarousel 
          title="🔥 Trending Now" 
          anime={trendingAnime}
          showRank
        />

        {/* Currently Airing */}
        <AnimeCarousel 
          title="📺 Currently Airing" 
          anime={airingNow}
        />

        {/* Top Rated */}
        <AnimeCarousel 
          title="⭐ Top Rated" 
          anime={topRatedAnime}
          showRank
        />

        {/* Recently Finished */}
        <AnimeCarousel 
          title="✅ Recently Finished" 
          anime={recentlyFinished}
        />

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
              Track your anime journey • Powered by AniList & MyAnimeList
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

export default Index;
