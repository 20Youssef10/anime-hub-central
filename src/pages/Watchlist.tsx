import { useState } from 'react';
import { List, Play, Trash2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWatchlist } from '@/hooks/useWatchlist';
import { mockAnime } from '@/data/mockAnime';
import { WatchStatus } from '@/types/anime';
import { cn } from '@/lib/utils';

const statusTabs: { value: WatchStatus | 'all'; label: string; icon?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'watching', label: 'Watching', icon: '📺' },
  { value: 'completed', label: 'Completed', icon: '✅' },
  { value: 'plan_to_watch', label: 'Plan to Watch', icon: '📋' },
  { value: 'on_hold', label: 'On Hold', icon: '⏸️' },
  { value: 'dropped', label: 'Dropped', icon: '❌' },
];

const Watchlist = () => {
  const [activeTab, setActiveTab] = useState<WatchStatus | 'all'>('all');
  const { watchlist, removeFromWatchlist, updateWatchlistItem } = useWatchlist();

  const filteredList = activeTab === 'all' 
    ? watchlist 
    : watchlist.filter(item => item.status === activeTab);

  const getAnimeById = (id: number) => mockAnime.find(a => a.id === id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Watchlist</h1>
          <p className="text-muted-foreground mt-1">
            {watchlist.length} anime in your list
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-8 bg-secondary/50 p-1 rounded-xl flex-wrap h-auto gap-1">
            {statusTabs.map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2"
              >
                {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* List Content */}
          <div>
            {filteredList.length > 0 ? (
              <div className="space-y-4">
                {filteredList.map(item => {
                  const anime = getAnimeById(item.animeId);
                  if (!anime) return null;

                  return (
                    <div 
                      key={item.animeId}
                      className="glass-card rounded-xl p-4 flex items-center gap-4 group hover:bg-secondary/40 transition-colors"
                    >
                      {/* Cover */}
                      <Link to={`/anime/${anime.id}`} className="flex-shrink-0">
                        <img
                          src={anime.coverImage}
                          alt={anime.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/anime/${anime.id}`}>
                          <h3 className="font-semibold truncate hover:text-primary transition-colors">
                            {anime.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                            {anime.score.toFixed(1)}
                          </span>
                          <span>{anime.episodes || '?'} eps</span>
                          <span>{anime.seasonYear}</span>
                        </div>

                        {/* Progress */}
                        {item.status === 'watching' && anime.episodes && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{item.progress}/{anime.episodes}</span>
                            </div>
                            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                                style={{ width: `${(item.progress / anime.episodes) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="glow" size="sm" className="gap-1">
                          <Play className="w-4 h-4" />
                          <span className="hidden sm:inline">Continue</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromWatchlist(anime.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <List className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'all' ? 'Your watchlist is empty' : `No anime ${activeTab.replace('_', ' ')}`}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === 'all' 
                    ? 'Start adding anime to track your progress'
                    : 'Move anime here to track them'}
                </p>
                <Link to="/browse">
                  <Button variant="glow">Browse Anime</Button>
                </Link>
              </div>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Watchlist;
