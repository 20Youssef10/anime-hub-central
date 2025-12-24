export interface Anime {
  id: number;
  title: string;
  titleEnglish?: string;
  titleJapanese?: string;
  coverImage: string;
  bannerImage?: string;
  synopsis: string;
  episodes: number | null;
  status: 'RELEASING' | 'FINISHED' | 'NOT_YET_RELEASED' | 'CANCELLED';
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  seasonYear?: number;
  score: number;
  popularity: number;
  genres: string[];
  studios: string[];
  trailer?: {
    id: string;
    site: string;
  };
  nextAiringEpisode?: {
    episode: number;
    airingAt: number;
  };
  streamingLinks?: StreamingLink[];
}

export interface StreamingLink {
  platform: 'crunchyroll' | 'netflix' | 'funimation' | 'hulu';
  url: string;
}

export interface WatchlistItem {
  animeId: number;
  status: WatchStatus;
  progress: number;
  score?: number;
  startedAt?: string;
  completedAt?: string;
}

export type WatchStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

export interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
  watchlist: WatchlistItem[];
}

export type Genre = 
  | 'Action'
  | 'Adventure'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Slice of Life'
  | 'Sports'
  | 'Supernatural'
  | 'Thriller';

export type Season = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
