import { useMemo } from 'react';
import { useWatchlist } from './useWatchlist';
import { Achievement } from '@/components/profile/AchievementBadge';

export function useAchievements() {
  const { watchlist, getStatistics } = useWatchlist();
  const stats = getStatistics();

  const achievements = useMemo<Achievement[]>(() => {
    const now = new Date().toISOString();
    
    return [
      // Watching achievements
      {
        id: 'first_anime',
        name: 'First Steps',
        description: 'Add your first anime to your watchlist',
        icon: 'star',
        tier: 'bronze',
        unlockedAt: stats.totalAnime >= 1 ? now : undefined,
        progress: Math.min(stats.totalAnime, 1),
        maxProgress: 1,
      },
      {
        id: 'anime_10',
        name: 'Getting Started',
        description: 'Add 10 anime to your watchlist',
        icon: 'star',
        tier: 'silver',
        unlockedAt: stats.totalAnime >= 10 ? now : undefined,
        progress: Math.min(stats.totalAnime, 10),
        maxProgress: 10,
      },
      {
        id: 'anime_50',
        name: 'Dedicated Viewer',
        description: 'Add 50 anime to your watchlist',
        icon: 'star',
        tier: 'gold',
        unlockedAt: stats.totalAnime >= 50 ? now : undefined,
        progress: Math.min(stats.totalAnime, 50),
        maxProgress: 50,
      },
      {
        id: 'anime_100',
        name: 'Anime Expert',
        description: 'Add 100 anime to your watchlist',
        icon: 'crown',
        tier: 'platinum',
        unlockedAt: stats.totalAnime >= 100 ? now : undefined,
        progress: Math.min(stats.totalAnime, 100),
        maxProgress: 100,
      },
      // Completion achievements
      {
        id: 'complete_1',
        name: 'Finisher',
        description: 'Complete your first anime',
        icon: 'trophy',
        tier: 'bronze',
        unlockedAt: stats.completedCount >= 1 ? now : undefined,
        progress: Math.min(stats.completedCount, 1),
        maxProgress: 1,
      },
      {
        id: 'complete_10',
        name: 'Marathoner',
        description: 'Complete 10 anime',
        icon: 'trophy',
        tier: 'silver',
        unlockedAt: stats.completedCount >= 10 ? now : undefined,
        progress: Math.min(stats.completedCount, 10),
        maxProgress: 10,
      },
      {
        id: 'complete_25',
        name: 'Binge Master',
        description: 'Complete 25 anime',
        icon: 'flame',
        tier: 'gold',
        unlockedAt: stats.completedCount >= 25 ? now : undefined,
        progress: Math.min(stats.completedCount, 25),
        maxProgress: 25,
      },
      // Episode achievements
      {
        id: 'episodes_100',
        name: 'Century Club',
        description: 'Watch 100 episodes',
        icon: 'clock',
        tier: 'bronze',
        unlockedAt: stats.totalEpisodes >= 100 ? now : undefined,
        progress: Math.min(stats.totalEpisodes, 100),
        maxProgress: 100,
      },
      {
        id: 'episodes_500',
        name: 'Dedicated Watcher',
        description: 'Watch 500 episodes',
        icon: 'clock',
        tier: 'silver',
        unlockedAt: stats.totalEpisodes >= 500 ? now : undefined,
        progress: Math.min(stats.totalEpisodes, 500),
        maxProgress: 500,
      },
      {
        id: 'episodes_1000',
        name: 'Episode Addict',
        description: 'Watch 1000 episodes',
        icon: 'zap',
        tier: 'gold',
        unlockedAt: stats.totalEpisodes >= 1000 ? now : undefined,
        progress: Math.min(stats.totalEpisodes, 1000),
        maxProgress: 1000,
      },
      // Rewatch achievements
      {
        id: 'rewatch_1',
        name: 'Nostalgia Trip',
        description: 'Rewatch an anime',
        icon: 'heart',
        tier: 'bronze',
        unlockedAt: stats.totalRewatches >= 1 ? now : undefined,
        progress: Math.min(stats.totalRewatches, 1),
        maxProgress: 1,
      },
      {
        id: 'rewatch_5',
        name: 'Rewatch Enthusiast',
        description: 'Rewatch 5 anime',
        icon: 'heart',
        tier: 'gold',
        unlockedAt: stats.totalRewatches >= 5 ? now : undefined,
        progress: Math.min(stats.totalRewatches, 5),
        maxProgress: 5,
      },
    ];
  }, [stats]);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  
  return {
    achievements,
    unlockedCount,
    totalCount: achievements.length,
  };
}
