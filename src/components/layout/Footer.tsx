import { Link } from 'react-router-dom';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold gradient-text">AniTrack</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              Track your anime journey. Discover new favorites. Connect with the community.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-foreground transition-colors">Browse Anime</Link>
              </li>
              <li>
                <Link to="/seasonal" className="hover:text-foreground transition-colors">Seasonal Charts</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-foreground transition-colors">Search</Link>
              </li>
              <li>
                <Link to="/studios" className="hover:text-foreground transition-colors">Studios</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/watchlist" className="hover:text-foreground transition-colors">My Watchlist</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-foreground transition-colors">Profile</Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AniTrack. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> using AniList API
          </p>
        </div>
      </div>
    </footer>
  );
}
