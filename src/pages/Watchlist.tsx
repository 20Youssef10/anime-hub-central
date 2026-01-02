import { useState } from 'react';
import { List, Play, Trash2, Star, FileUp, Edit, Heart, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWatchlist } from '@/hooks/useWatchlist';
import { mockAnime } from '@/data/mockAnime';
import { WatchStatus } from '@/types/anime';
import { ImportExportDialog } from '@/components/anime/ImportExportDialog';
import { CustomListManager } from '@/components/anime/CustomListManager';
import { RewatchButton } from '@/components/anime/RewatchButton';
import { BulkEditToolbar, SelectableItem } from '@/components/anime/BulkEditMode';
import { ViewModeToggle } from '@/components/ui/view-mode-toggle';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ViewMode = 'grid' | 'list' | 'compact';

const statusTabs: { value: WatchStatus | 'all' | 'favorites'; label: string; icon?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'watching', label: 'Watching', icon: '📺' },
  { value: 'completed', label: 'Completed', icon: '✅' },
  { value: 'plan_to_watch', label: 'Plan to Watch', icon: '📋' },
  { value: 'on_hold', label: 'On Hold', icon: '⏸️' },
  { value: 'dropped', label: 'Dropped', icon: '❌' },
  { value: 'favorites', label: 'Favorites', icon: '❤️' },
];

const Watchlist = () => {
  const [activeTab, setActiveTab] = useState<WatchStatus | 'all' | 'favorites'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [customListOpen, setCustomListOpen] = useState(false);
  
  const { 
    watchlist, 
    removeFromWatchlist, 
    toggleFavorite,
    incrementRewatch 
  } = useWatchlist();

  const filteredList = activeTab === 'all' 
    ? watchlist 
    : activeTab === 'favorites'
    ? watchlist.filter(item => item.favorite)
    : watchlist.filter(item => item.status === activeTab);

  const getAnimeById = (id: number) => mockAnime.find(a => a.id === id);

  const handleSelectItem = (animeId: number) => {
    setSelectedIds(prev => 
      prev.includes(animeId) 
        ? prev.filter(id => id !== animeId)
        : [...prev, animeId]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-muted-foreground mt-1">
              {watchlist.length} anime in your list
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
            
            <Button 
              variant={bulkMode ? "glow" : "outline"} 
              size="sm" 
              onClick={() => {
                setBulkMode(!bulkMode);
                setSelectedIds([]);
              }}
              className="gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              Bulk Edit
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => setCustomListOpen(true)} className="gap-2">
              <Edit className="w-4 h-4" />
              Custom Lists
            </Button>
            
            <ImportExportDialog />
          </div>
        </div>

        {/* Bulk Edit Toolbar */}
        {bulkMode && (
          <BulkEditToolbar
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onExitEditMode={() => {
              setSelectedIds([]);
              setBulkMode(false);
            }}
            allIds={filteredList.map(item => item.animeId)}
          />
        )}

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
              <div className={cn(
                viewMode === 'grid' && "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
                viewMode === 'list' && "space-y-3",
                viewMode === 'compact' && "grid grid-cols-1 md:grid-cols-2 gap-2"
              )}>
                {filteredList.map(item => {
                  const anime = getAnimeById(item.animeId);
                  if (!anime) return null;

                  const content = (
                    <div 
                      className="glass-card rounded-xl p-4 flex items-center gap-4 group hover:bg-secondary/40 transition-colors"
                    >
                      <Link to={`/anime/${anime.id}`} className="flex-shrink-0">
                        <img
                          src={anime.coverImage}
                          alt={anime.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link to={`/anime/${anime.id}`}>
                            <h3 className="font-semibold truncate hover:text-primary transition-colors">
                              {anime.title}
                            </h3>
                          </Link>
                          {item.favorite && (
                            <Heart className="w-4 h-4 text-destructive fill-destructive flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                            {anime.score.toFixed(1)}
                          </span>
                          <span>{anime.episodes || '?'} eps</span>
                          <span>{anime.seasonYear}</span>
                        </div>

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

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(anime.id)}
                          className={cn("h-9 w-9", item.favorite && "text-destructive")}
                        >
                          <Heart className={cn("w-4 h-4", item.favorite && "fill-current")} />
                        </Button>
                        
                        {item.status === 'completed' && (
                          <RewatchButton
                            animeId={anime.id}
                            animeTitle={anime.title}
                            rewatchCount={item.rewatchCount || 0}
                          />
                        )}
                        
                        <Button variant="glow" size="sm" className="gap-1">
                          <Play className="w-4 h-4" />
                          <span className="hidden sm:inline">Continue</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromWatchlist(anime.id)}
                          className="text-muted-foreground hover:text-destructive h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );

                  if (bulkMode) {
                    return (
                      <SelectableItem
                        key={item.animeId}
                        isSelected={selectedIds.includes(item.animeId)}
                        onToggle={() => handleSelectItem(item.animeId)}
                        isEditMode={bulkMode}
                      >
                        {viewMode === 'grid' ? <AnimeCard anime={anime} /> : content}
                      </SelectableItem>
                    );
                  }

                  if (viewMode === 'grid') {
                    return <AnimeCard key={anime.id} anime={anime} />;
                  }

                  return <div key={item.animeId}>{content}</div>;
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <List className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {activeTab === 'all' ? 'Your watchlist is empty' : 
                   activeTab === 'favorites' ? 'No favorites yet' :
                   `No anime ${activeTab.replace('_', ' ')}`}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === 'all' 
                    ? 'Start adding anime to track your progress'
                    : activeTab === 'favorites'
                    ? 'Heart your favorite anime to see them here'
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

      <Footer />
      
      <Dialog open={customListOpen} onOpenChange={setCustomListOpen}>
        <DialogContent className="glass-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Custom Lists</DialogTitle>
          </DialogHeader>
          <CustomListManager />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Watchlist;
