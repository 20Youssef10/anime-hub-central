import { useMemo } from 'react';
import { useWatchlist } from './useWatchlist';
import { mockAnime } from '@/data/mockAnime';

export function useAnimeStats() {
  const { watchlist } = useWatchlist();

  return useMemo(() => {
    // Get genre distribution
    const genreCount: Record<string, number> = {};
    watchlist.forEach(item => {
      const anime = mockAnime.find(a => a.id === item.animeId);
      if (anime) {
        anime.genres.forEach(genre => {
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
      }
    });

    const genreData = Object.entries(genreCount)
      .map(([name, value]) => ({ name, value, color: '' }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    // Calculate watch time (estimate 24 min per episode)
    const totalEpisodes = watchlist.reduce((acc, item) => acc + item.progress, 0);
    const totalMinutes = totalEpisodes * 24;
    const totalHours = Math.round(totalMinutes / 60);
    const totalDays = Math.round(totalHours / 24 * 10) / 10;

    // Mock watch time by month (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const watchTimeByMonth = months.map(month => ({
      month,
      hours: Math.floor(Math.random() * 50) + 10,
    }));

    // Calculate average score
    const scoredItems = watchlist.filter(item => item.score);
    const averageScore = scoredItems.length > 0
      ? scoredItems.reduce((acc, item) => acc + (item.score || 0), 0) / scoredItems.length
      : 0;

    // Status distribution
    const statusCount = {
      watching: watchlist.filter(i => i.status === 'watching').length,
      completed: watchlist.filter(i => i.status === 'completed').length,
      plan_to_watch: watchlist.filter(i => i.status === 'plan_to_watch').length,
      on_hold: watchlist.filter(i => i.status === 'on_hold').length,
      dropped: watchlist.filter(i => i.status === 'dropped').length,
    };

    // Mock activity data (last 30 days)
    const activityDays = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString(),
        count: Math.floor(Math.random() * 5),
      };
    });

    // Mock streak data
    const currentStreak = Math.floor(Math.random() * 10);
    const longestStreak = Math.max(currentStreak, Math.floor(Math.random() * 30) + 5);

    return {
      genreData,
      totalEpisodes,
      totalHours,
      totalDays,
      watchTimeByMonth,
      averageScore: averageScore.toFixed(1),
      statusCount,
      activityDays,
      currentStreak,
      longestStreak,
      favoriteCount: watchlist.filter(i => i.favorite).length,
    };
  }, [watchlist]);
}
