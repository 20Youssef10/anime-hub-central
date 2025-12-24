import { User, Settings, LogIn, Link as LinkIcon, BarChart3 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/useWatchlist';

const Profile = () => {
  const { watchlist, getWatchlistByStatus } = useWatchlist();

  const stats = {
    watching: getWatchlistByStatus('watching').length,
    completed: getWatchlistByStatus('completed').length,
    planToWatch: getWatchlistByStatus('plan_to_watch').length,
    onHold: getWatchlistByStatus('on_hold').length,
    dropped: getWatchlistByStatus('dropped').length,
  };

  const totalEpisodes = 0; // Would calculate from actual data

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold">Guest User</h1>
              <p className="text-muted-foreground">Sign in to sync your watchlist across devices</p>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-cyan">{stats.watching}</p>
            <p className="text-sm text-muted-foreground">Watching</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-muted-foreground">{stats.planToWatch}</p>
            <p className="text-sm text-muted-foreground">Plan to Watch</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-yellow-400">{stats.onHold}</p>
            <p className="text-sm text-muted-foreground">On Hold</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-destructive">{stats.dropped}</p>
            <p className="text-sm text-muted-foreground">Dropped</p>
          </div>
        </div>

        {/* Connect Services */}
        <section className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary" />
            Connect Services
          </h2>
          <p className="text-muted-foreground mb-6">
            Link your accounts to sync your watchlist and get personalized recommendations.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* AniList */}
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

            {/* MyAnimeList */}
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

        {/* Watch Stats */}
        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Your Stats
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <p className="text-4xl font-bold gradient-text">{watchlist.length}</p>
              <p className="text-muted-foreground">Total Anime</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold gradient-text">0</p>
              <p className="text-muted-foreground">Episodes Watched</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold gradient-text">0h</p>
              <p className="text-muted-foreground">Time Spent</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
