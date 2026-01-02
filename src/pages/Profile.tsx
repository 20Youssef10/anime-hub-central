import { useState } from 'react';
import { 
  User, 
  Settings, 
  LogIn, 
  Link as LinkIcon, 
  BarChart3, 
  Trophy,
  Clock,
  Star,
  Heart,
  TrendingUp,
  Flame
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useAchievements } from '@/hooks/useAchievements';
import { useAnimeStats } from '@/hooks/useAnimeStats';
import { AchievementGrid } from '@/components/profile/AchievementBadge';
import { GenreChart, WatchTimeChart } from '@/components/profile/GenreChart';
import { WatchStreak, DayActivity } from '@/components/profile/WatchStreak';
import { StatsCard, ScoreDistribution, StatusDistribution } from '@/components/anime/StatsCard';

const Profile = () => {
  const { watchlist, getWatchlistByStatus } = useWatchlist();
  const { achievements, unlockedCount, totalCount } = useAchievements();
  const stats = useAnimeStats();
  const [activeTab, setActiveTab] = useState('overview');

  const watchStats = {
    watching: getWatchlistByStatus('watching').length,
    completed: getWatchlistByStatus('completed').length,
    planToWatch: getWatchlistByStatus('plan_to_watch').length,
    onHold: getWatchlistByStatus('on_hold').length,
    dropped: getWatchlistByStatus('dropped').length,
  };

  const statusDistribution = [
    { status: 'Watching', amount: watchStats.watching, color: 'hsl(190, 90%, 50%)' },
    { status: 'Completed', amount: watchStats.completed, color: 'hsl(142, 76%, 36%)' },
    { status: 'Plan to Watch', amount: watchStats.planToWatch, color: 'hsl(220, 20%, 50%)' },
    { status: 'On Hold', amount: watchStats.onHold, color: 'hsl(45, 93%, 47%)' },
    { status: 'Dropped', amount: watchStats.dropped, color: 'hsl(0, 84%, 60%)' },
  ];

  // Mock score distribution
  const scoreDistribution = [
    { score: 10, amount: 5 },
    { score: 9, amount: 12 },
    { score: 8, amount: 25 },
    { score: 7, amount: 30 },
    { score: 6, amount: 15 },
    { score: 5, amount: 8 },
    { score: 4, amount: 3 },
    { score: 3, amount: 1 },
    { score: 2, amount: 0 },
    { score: 1, amount: 1 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg">
                12
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold">Guest User</h1>
              <p className="text-muted-foreground">Sign in to sync your watchlist across devices</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">{stats.totalHours}h</span>
                  <span className="text-muted-foreground">watched</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-accent" />
                  <span className="font-medium">{stats.averageScore}</span>
                  <span className="text-muted-foreground">avg score</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">{stats.currentStreak}</span>
                  <span className="text-muted-foreground">day streak</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="glow" className="gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg px-6">
              Overview
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-lg px-6">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-lg px-6">
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <p className="text-3xl font-bold text-cyan">{watchStats.watching}</p>
                <p className="text-sm text-muted-foreground">Watching</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <p className="text-3xl font-bold text-green-400">{watchStats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <p className="text-3xl font-bold text-muted-foreground">{watchStats.planToWatch}</p>
                <p className="text-sm text-muted-foreground">Plan to Watch</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <p className="text-3xl font-bold text-yellow-400">{watchStats.onHold}</p>
                <p className="text-sm text-muted-foreground">On Hold</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <p className="text-3xl font-bold text-destructive">{watchStats.dropped}</p>
                <p className="text-sm text-muted-foreground">Dropped</p>
              </div>
            </div>

            {/* Activity & Streak */}
            <div className="grid md:grid-cols-2 gap-6">
              <WatchStreak 
                currentStreak={stats.currentStreak}
                longestStreak={stats.longestStreak}
                lastWatched={new Date().toISOString()}
              />
              <DayActivity days={stats.activityDays} />
            </div>

            {/* Connect Services */}
            <section className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-primary" />
                Connect Services
              </h2>
              <p className="text-muted-foreground mb-6">
                Link your accounts to sync your watchlist and get personalized recommendations.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">AL</span>
                    </div>
                    <div>
                      <p className="font-medium">AniList</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <span className="text-blue-500 font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-medium">MyAnimeList</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            {/* Main Stats */}
            <StatsCard
              stats={[
                { label: 'Total Anime', value: watchlist.length, color: 'text-primary' },
                { label: 'Episodes', value: stats.totalEpisodes, color: 'text-accent' },
                { label: 'Hours Watched', value: `${stats.totalHours}h`, color: 'text-cyan' },
                { label: 'Days Watched', value: `${stats.totalDays}d`, color: 'text-purple' },
              ]}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <GenreChart data={stats.genreData} />
              <WatchTimeChart data={stats.watchTimeByMonth} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <StatusDistribution distribution={statusDistribution} />
              <ScoreDistribution distribution={scoreDistribution} />
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  Achievements
                </h2>
                <span className="text-sm text-muted-foreground">
                  {unlockedCount} / {totalCount} unlocked
                </span>
              </div>
              
              <AchievementGrid achievements={achievements} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
