import { useState, useEffect, useCallback } from 'react';
import { WatchlistItem, WatchStatus } from '@/types/anime';

const WATCHLIST_KEY = 'anime_watchlist';

export interface ExtendedWatchlistItem extends WatchlistItem {
  rewatchCount?: number;
  episodeNotes?: Record<number, string>;
  favorite?: boolean;
  tags?: string[];
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<ExtendedWatchlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  const saveWatchlist = (items: ExtendedWatchlistItem[]) => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
    setWatchlist(items);
  };

  const addToWatchlist = (animeId: number, status: WatchStatus = 'plan_to_watch') => {
    const exists = watchlist.find(item => item.animeId === animeId);
    if (exists) return;

    const newItem: ExtendedWatchlistItem = {
      animeId,
      status,
      progress: 0,
      startedAt: status === 'watching' ? new Date().toISOString() : undefined,
      rewatchCount: 0,
      episodeNotes: {},
      favorite: false,
      tags: [],
    };

    saveWatchlist([...watchlist, newItem]);
  };

  const updateWatchlistItem = (animeId: number, updates: Partial<ExtendedWatchlistItem>) => {
    const updatedList = watchlist.map(item =>
      item.animeId === animeId
        ? { ...item, ...updates }
        : item
    );
    saveWatchlist(updatedList);
  };

  const removeFromWatchlist = (animeId: number) => {
    saveWatchlist(watchlist.filter(item => item.animeId !== animeId));
  };

  const getWatchlistItem = (animeId: number) => {
    return watchlist.find(item => item.animeId === animeId);
  };

  const isInWatchlist = (animeId: number) => {
    return watchlist.some(item => item.animeId === animeId);
  };

  const getWatchlistByStatus = (status: WatchStatus) => {
    return watchlist.filter(item => item.status === status);
  };

  // New: Rewatch functionality
  const incrementRewatch = useCallback((animeId: number) => {
    const item = watchlist.find(i => i.animeId === animeId);
    if (item) {
      updateWatchlistItem(animeId, { 
        rewatchCount: (item.rewatchCount || 0) + 1,
        progress: 0,
        status: 'watching' as WatchStatus,
      });
    }
  }, [watchlist]);

  // New: Episode notes
  const addEpisodeNote = useCallback((animeId: number, episode: number, note: string) => {
    const item = watchlist.find(i => i.animeId === animeId);
    if (item) {
      updateWatchlistItem(animeId, {
        episodeNotes: { ...item.episodeNotes, [episode]: note },
      });
    }
  }, [watchlist]);

  const removeEpisodeNote = useCallback((animeId: number, episode: number) => {
    const item = watchlist.find(i => i.animeId === animeId);
    if (item && item.episodeNotes) {
      const { [episode]: _, ...rest } = item.episodeNotes;
      updateWatchlistItem(animeId, { episodeNotes: rest });
    }
  }, [watchlist]);

  // New: Bulk operations
  const bulkUpdateStatus = useCallback((animeIds: number[], status: WatchStatus) => {
    const updated = watchlist.map(item =>
      animeIds.includes(item.animeId)
        ? { ...item, status, completedAt: status === 'completed' ? new Date().toISOString() : item.completedAt }
        : item
    );
    saveWatchlist(updated);
  }, [watchlist]);

  const bulkRemove = useCallback((animeIds: number[]) => {
    saveWatchlist(watchlist.filter(item => !animeIds.includes(item.animeId)));
  }, [watchlist]);

  // New: Toggle favorite
  const toggleFavorite = useCallback((animeId: number) => {
    const item = watchlist.find(i => i.animeId === animeId);
    if (item) {
      updateWatchlistItem(animeId, { favorite: !item.favorite });
    }
  }, [watchlist]);

  // New: Import/Export
  const exportWatchlist = useCallback(() => {
    return JSON.stringify(watchlist, null, 2);
  }, [watchlist]);

  const importWatchlist = useCallback((data: string, merge: boolean = false) => {
    try {
      const imported = JSON.parse(data) as ExtendedWatchlistItem[];
      if (merge) {
        const existingIds = watchlist.map(i => i.animeId);
        const newItems = imported.filter(i => !existingIds.includes(i.animeId));
        saveWatchlist([...watchlist, ...newItems]);
      } else {
        saveWatchlist(imported);
      }
      return true;
    } catch {
      return false;
    }
  }, [watchlist]);

  // Statistics
  const getStatistics = useCallback(() => {
    const totalEpisodes = watchlist.reduce((acc, item) => acc + item.progress, 0);
    const completedCount = watchlist.filter(i => i.status === 'completed').length;
    const watchingCount = watchlist.filter(i => i.status === 'watching').length;
    const totalRewatches = watchlist.reduce((acc, item) => acc + (item.rewatchCount || 0), 0);
    
    return {
      totalAnime: watchlist.length,
      totalEpisodes,
      completedCount,
      watchingCount,
      totalRewatches,
      averageScore: watchlist.filter(i => i.score).reduce((acc, i) => acc + (i.score || 0), 0) / 
                    (watchlist.filter(i => i.score).length || 1),
    };
  }, [watchlist]);

  return {
    watchlist,
    addToWatchlist,
    updateWatchlistItem,
    removeFromWatchlist,
    getWatchlistItem,
    isInWatchlist,
    getWatchlistByStatus,
    incrementRewatch,
    addEpisodeNote,
    removeEpisodeNote,
    bulkUpdateStatus,
    bulkRemove,
    toggleFavorite,
    exportWatchlist,
    importWatchlist,
    getStatistics,
  };
}
