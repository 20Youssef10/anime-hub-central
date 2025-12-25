import { useQuery } from '@tanstack/react-query';
import {
  fetchTrendingAnime,
  fetchPopularAnime,
  fetchTopRatedAnime,
  fetchAiringAnime,
  fetchAnimeById,
  searchAnime,
  browseAnime,
  fetchRecommendations,
  BrowseFilters,
} from '@/lib/anilist';

export function useTrendingAnime(perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'trending', perPage],
    queryFn: () => fetchTrendingAnime(1, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePopularAnime(perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'popular', perPage],
    queryFn: () => fetchPopularAnime(1, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTopRatedAnime(perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'top-rated', perPage],
    queryFn: () => fetchTopRatedAnime(1, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAiringAnime(perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'airing', perPage],
    queryFn: () => fetchAiringAnime(1, perPage),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAnimeById(id: number) {
  return useQuery({
    queryKey: ['anime', 'detail', id],
    queryFn: () => fetchAnimeById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id,
  });
}

export function useAnimeSearch(query: string, perPage = 20) {
  return useQuery({
    queryKey: ['anime', 'search', query, perPage],
    queryFn: () => searchAnime(query, 1, perPage),
    staleTime: 5 * 60 * 1000,
    enabled: query.length >= 2,
  });
}

export function useBrowseAnime(filters: BrowseFilters) {
  return useQuery({
    queryKey: ['anime', 'browse', filters],
    queryFn: () => browseAnime(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecommendations(id: number, perPage = 10) {
  return useQuery({
    queryKey: ['anime', 'recommendations', id, perPage],
    queryFn: () => fetchRecommendations(id, perPage),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
