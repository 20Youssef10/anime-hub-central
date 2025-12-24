import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Calendar, 
  Play, 
  Plus, 
  Share2,
  Building,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { StreamingBadge } from '@/components/anime/StreamingBadge';
import { WatchStatusSelect } from '@/components/anime/WatchStatusSelect';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { mockAnime } from '@/data/mockAnime';
import { useWatchlist } from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils';

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const anime = mockAnime.find(a => a.id === parseInt(id || '0'));
  const { getWatchlistItem, addToWatchlist, updateWatchlistItem, isInWatchlist } = useWatchlist();

  const watchlistItem = anime ? getWatchlistItem(anime.id) : undefined;
  const inList = anime ? isInWatchlist(anime.id) : false;

  if (!anime) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold">Anime not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusChange = (status: string) => {
    if (!inList) {
      addToWatchlist(anime.id, status as any);
    } else {
      updateWatchlistItem(anime.id, { status: status as any });
    }
  };

  const similarAnime = mockAnime
    .filter(a => a.id !== anime.id && a.genres.some(g => anime.genres.includes(g)))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={anime.bannerImage || anime.coverImage}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Back Button */}
        <Link 
          to="/"
          className="absolute top-20 left-4 md:left-8 z-10"
        >
          <Button variant="glass" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-48 md:w-64 rounded-xl shadow-2xl mx-auto md:mx-0"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
            {/* Title & Meta */}
            <div className="space-y-3">
              {anime.status === 'RELEASING' && (
                <span className="status-badge bg-primary text-primary-foreground inline-flex">
                  <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse mr-1.5" />
                  Currently Airing
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold">{anime.title}</h1>
              
              {anime.titleJapanese && (
                <p className="text-lg text-muted-foreground">{anime.titleJapanese}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold text-lg">{anime.score.toFixed(1)}</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {anime.episodes || '?'} Episodes
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {anime.season} {anime.seasonYear}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Building className="w-4 h-4" />
                  {anime.studios.join(', ')}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {anime.genres.map(genre => (
                <span 
                  key={genre}
                  className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" variant="glow" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
              
              <WatchStatusSelect
                value={watchlistItem?.status}
                onChange={handleStatusChange}
              />
              
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Streaming */}
            {anime.streamingLinks && anime.streamingLinks.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Available On</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.streamingLinks.map(link => (
                    <StreamingBadge key={link.platform} link={link} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {anime.synopsis}
            </p>
          </section>

          {/* Next Episode */}
          {anime.nextAiringEpisode && (
            <section className="glass-card rounded-xl p-6">
              <h3 className="font-semibold mb-2">Next Episode</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    Episode {anime.nextAiringEpisode.episode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Airing in {Math.ceil((anime.nextAiringEpisode.airingAt - Date.now()) / 86400000)} days
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Set Reminder
                </Button>
              </div>
            </section>
          )}

          {/* Similar Anime */}
          {similarAnime.length > 0 && (
            <section className="pt-8">
              <AnimeCarousel title="You Might Also Like" anime={similarAnime} />
            </section>
          )}
        </div>
      </div>

      {/* Spacer for footer */}
      <div className="h-20" />
    </div>
  );
};

export default AnimeDetail;
