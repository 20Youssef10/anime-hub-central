import { useState, useEffect, useCallback } from 'react';

const FILTERS_KEY = 'anime_browse_filters';

export interface PersistentFilters {
  genres: string[];
  season: string;
  year: string;
  sortBy: string;
  viewMode: 'grid' | 'list' | 'compact';
}

const defaultFilters: PersistentFilters = {
  genres: [],
  season: 'all',
  year: 'all',
  sortBy: 'POPULARITY_DESC',
  viewMode: 'grid',
};

export function usePersistentFilters() {
  const [filters, setFilters] = useState<PersistentFilters>(defaultFilters);

  useEffect(() => {
    const stored = localStorage.getItem(FILTERS_KEY);
    if (stored) {
      try {
        setFilters({ ...defaultFilters, ...JSON.parse(stored) });
      } catch {
        setFilters(defaultFilters);
      }
    }
  }, []);

  const updateFilters = useCallback((updates: Partial<PersistentFilters>) => {
    setFilters(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(FILTERS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetFilters = useCallback(() => {
    localStorage.removeItem(FILTERS_KEY);
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}
