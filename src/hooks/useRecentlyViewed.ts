import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'anime_recently_viewed';
const MAX_ITEMS = 20;

interface RecentlyViewedItem {
  animeId: number;
  viewedAt: string;
  title: string;
  coverImage: string;
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const save = (items: RecentlyViewedItem[]) => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
    setRecentlyViewed(items);
  };

  const addToRecentlyViewed = useCallback((anime: { id: number; title: string; coverImage: string }) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.animeId !== anime.id);
      
      const newItem: RecentlyViewedItem = {
        animeId: anime.id,
        viewedAt: new Date().toISOString(),
        title: anime.title,
        coverImage: anime.coverImage,
      };
      
      const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
    setRecentlyViewed([]);
  }, []);

  const removeFromRecentlyViewed = useCallback((animeId: number) => {
    setRecentlyViewed(prev => {
      const updated = prev.filter(item => item.animeId !== animeId);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    removeFromRecentlyViewed,
  };
}
