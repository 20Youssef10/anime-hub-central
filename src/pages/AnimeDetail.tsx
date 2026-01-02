import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Calendar, 
  Play, 
  Share2,
  Building,
  Heart,
  MessageSquare,
  Users,
  Film,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StreamingBadge } from '@/components/anime/StreamingBadge';
import { WatchStatusSelect } from '@/components/anime/WatchStatusSelect';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { EpisodeList, Episode } from '@/components/anime/EpisodeList';
import { CharacterCard, Character } from '@/components/anime/CharacterCard';
import { StaffCard, Staff } from '@/components/anime/StaffCard';
import { RelationCard, AnimeRelation } from '@/components/anime/RelationCard';
import { ReviewCard, Review } from '@/components/anime/ReviewCard';
import { ShareModal } from '@/components/anime/ShareModal';
import { WriteReviewDialog } from '@/components/anime/WriteReviewDialog';
import { ProgressTracker } from '@/components/anime/ProgressTracker';
import { ScoreSlider } from '@/components/anime/ScoreSlider';
import { useAnimeById, useRecommendations } from '@/hooks/useAnime';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

// Mock data for characters, staff, etc.
const mockCharacters: Character[] = [
  { id: 1, name: 'Protagonist', image: 'https://via.placeholder.com/100', role: 'MAIN' },
  { id: 2, name: 'Supporting Character', image: 'https://via.placeholder.com/100', role: 'SUPPORTING' },
];

const mockStaff: Staff[] = [
  { id: 1, name: 'Director Name', image: 'https://via.placeholder.com/100', role: 'Director' },
  { id: 2, name: 'Writer Name', image: 'https://via.placeholder.com/100', role: 'Original Creator' },
];

const mockReviews: Review[] = [
  {
    id: 1,
    author: { name: 'AnimeReviewer' },
    score: 9,
    summary: 'A masterpiece of storytelling',
    body: 'This anime exceeded all my expectations. The character development is phenomenal, the animation quality is top-tier, and the story keeps you engaged from start to finish.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    likes: 124,
  },
  {
    id: 2,
    author: { name: 'CasualViewer' },
    score: 7,
    summary: 'Good but not perfect',
    body: 'Enjoyed it overall, though the pacing could have been better in the middle episodes. The ending was satisfying.',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    likes: 45,
  },
];

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const animeId = parseInt(id || '0');
  
  const { data: anime, isLoading, error } = useAnimeById(animeId);
  const { data: recommendations = [] } = useRecommendations(animeId, 10);
  const { getWatchlistItem, addToWatchlist, updateWatchlistItem, isInWatchlist, toggleFavorite } = useWatchlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const watchlistItem = anime ? getWatchlistItem(anime.id) : undefined;
  const inList = anime ? isInWatchlist(anime.id) : false;
  
  const [activeTab, setActiveTab] = useState('overview');
  const [shareOpen, setShareOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  // Add to recently viewed
  useEffect(() => {
    if (anime) {
      addToRecentlyViewed({
        id: anime.id,
        title: anime.title,
        coverImage: anime.coverImage,
      });
    }
  }, [anime, addToRecentlyViewed]);

  // Generate mock episodes
  const episodes: Episode[] = anime?.episodes 
    ? Array.from({ length: anime.episodes }, (_, i) => ({
        number: i + 1,
        title: `Episode ${i + 1}`,
        duration: 24 * 60,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="h-[50vh] bg-secondary animate-pulse" />
        <div className="container mx-auto px-4 -mt-40 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-48 md:w-64 aspect-[2/3] rounded-xl mx-auto md:mx-0" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !anime) {
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

  const handleProgressChange = (progress: number) => {
    if (!inList) {
      addToWatchlist(anime.id, 'watching');
    }
    updateWatchlistItem(anime.id, { progress });
  };

  const handleScoreChange = (score: number) => {
    if (!inList) {
      addToWatchlist(anime.id, 'watching');
    }
    updateWatchlistItem(anime.id, { score });
  };

  const getTimeUntilAiring = () => {
    if (!anime.nextAiringEpisode) return null;
    const now = Date.now() / 1000;
    const diff = anime.nextAiringEpisode.airingAt - now;
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Soon';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        
        <Link to="/" className="absolute top-20 left-4 md:left-8 z-10">
          <Button variant="glass" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-40 relative z-10 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0 space-y-4">
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-48 md:w-64 rounded-xl shadow-2xl mx-auto md:mx-0"
            />
            
            {/* Quick Actions (Mobile) */}
            <div className="flex md:hidden gap-2 justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(anime.id)}
                className={cn(watchlistItem?.favorite && "text-destructive")}
              >
                <Heart className={cn("w-5 h-5", watchlistItem?.favorite && "fill-current")} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShareOpen(true)}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
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

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold text-lg">{anime.score.toFixed(1)}</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {anime.episodes || '?'} Episodes
                </span>
                {anime.season && anime.seasonYear && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {anime.season} {anime.seasonYear}
                  </span>
                )}
                {anime.studios.length > 0 && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Building className="w-4 h-4" />
                    {anime.studios.join(', ')}
                  </span>
                )}
              </div>
            </div>

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

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" variant="glow" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
              
              <WatchStatusSelect
                value={watchlistItem?.status}
                onChange={handleStatusChange}
              />
              
              <Button
                variant={watchlistItem?.favorite ? "default" : "outline"}
                size="icon"
                className={cn("h-12 w-12", watchlistItem?.favorite && "bg-destructive/20 text-destructive border-destructive/50")}
                onClick={() => toggleFavorite(anime.id)}
              >
                <Heart className={cn("w-5 h-5", watchlistItem?.favorite && "fill-current")} />
              </Button>
              
              <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => setShareOpen(true)}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="bg-secondary/50 p-1 rounded-xl mb-8">
            <TabsTrigger value="overview" className="rounded-lg px-6">Overview</TabsTrigger>
            <TabsTrigger value="episodes" className="rounded-lg px-6 gap-2">
              <Film className="w-4 h-4" />
              Episodes
            </TabsTrigger>
            <TabsTrigger value="characters" className="rounded-lg px-6 gap-2">
              <Users className="w-4 h-4" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg px-6 gap-2">
              <MessageSquare className="w-4 h-4" />
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Synopsis */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
              <div className="relative">
                <p className={cn(
                  "text-muted-foreground leading-relaxed max-w-3xl transition-all",
                  !synopsisExpanded && "line-clamp-4"
                )}>
                  {anime.synopsis || 'No synopsis available.'}
                </p>
                {anime.synopsis && anime.synopsis.length > 300 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                    className="mt-2 gap-1"
                  >
                    {synopsisExpanded ? (
                      <>Show less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Read more <ChevronDown className="w-4 h-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </section>

            {/* Progress & Score */}
            {inList && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6">
                  <ProgressTracker
                    currentProgress={watchlistItem?.progress || 0}
                    totalEpisodes={anime.episodes}
                    onProgressChange={handleProgressChange}
                    onComplete={() => updateWatchlistItem(anime.id, { 
                      status: 'completed',
                      completedAt: new Date().toISOString()
                    })}
                  />
                </div>
                <div className="glass-card rounded-xl p-6">
                  <ScoreSlider
                    value={watchlistItem?.score}
                    onChange={handleScoreChange}
                  />
                </div>
              </div>
            )}

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
                      Airing in {getTimeUntilAiring()}
                    </p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Clock className="w-4 h-4" />
                    Set Reminder
                  </Button>
                </div>
              </section>
            )}

            {/* Trailer */}
            {anime.trailer && anime.trailer.site === 'youtube' && (
              <section>
                <h2 className="text-xl font-semibold mb-4">Trailer</h2>
                <div className="aspect-video max-w-3xl rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                    title={`${anime.title} Trailer`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <section className="pt-8">
                <AnimeCarousel title="You Might Also Like" anime={recommendations} />
              </section>
            )}
          </TabsContent>

          {/* Episodes Tab */}
          <TabsContent value="episodes">
            <EpisodeList
              episodes={episodes}
              watchedEpisodes={Array.from({ length: watchlistItem?.progress || 0 }, (_, i) => i + 1)}
              currentEpisode={(watchlistItem?.progress || 0) + 1}
              onEpisodeClick={(ep) => {
                if (!inList) addToWatchlist(anime.id, 'watching');
                updateWatchlistItem(anime.id, { progress: ep });
              }}
            />
          </TabsContent>

          {/* Characters Tab */}
          <TabsContent value="characters" className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Characters</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockCharacters.map(character => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Staff</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockStaff.map(staff => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <Button variant="glow" onClick={() => setReviewOpen(true)} className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Write Review
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20" />
      <Footer />
      
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={anime.title}
        url={window.location.href}
      />
      
      <WriteReviewDialog
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        animeTitle={anime.title}
        animeId={anime.id}
        onSubmit={(review) => console.log('Review submitted:', review)}
      />
    </div>
  );
};

export default AnimeDetail;
