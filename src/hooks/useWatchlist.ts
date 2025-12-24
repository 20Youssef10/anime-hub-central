import { useState, useEffect } from 'react';
import { WatchlistItem, WatchStatus } from '@/types/anime';

const WATCHLIST_KEY = 'anime_watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  const saveWatchlist = (items: WatchlistItem[]) => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
    setWatchlist(items);
  };

  const addToWatchlist = (animeId: number, status: WatchStatus = 'plan_to_watch') => {
    const exists = watchlist.find(item => item.animeId === animeId);
    if (exists) return;

    const newItem: WatchlistItem = {
      animeId,
      status,
      progress: 0,
      startedAt: status === 'watching' ? new Date().toISOString() : undefined
    };

    saveWatchlist([...watchlist, newItem]);
  };

  const updateWatchlistItem = (animeId: number, updates: Partial<WatchlistItem>) => {
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

  return {
    watchlist,
    addToWatchlist,
    updateWatchlistItem,
    removeFromWatchlist,
    getWatchlistItem,
    isInWatchlist,
    getWatchlistByStatus
  };
}
