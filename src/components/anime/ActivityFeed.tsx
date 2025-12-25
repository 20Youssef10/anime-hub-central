import { Link } from 'react-router-dom';
import { Star, Play, Plus, MessageSquare, Heart, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export interface Activity {
  id: string;
  type: 'watch' | 'rate' | 'add' | 'review' | 'like';
  user: {
    name: string;
    avatar?: string;
  };
  anime: {
    id: number;
    title: string;
    coverImage: string;
  };
  data?: {
    score?: number;
    episode?: number;
    status?: string;
  };
  createdAt: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const activityIcons = {
  watch: Play,
  rate: Star,
  add: Plus,
  review: MessageSquare,
  like: Heart,
};

const activityMessages: Record<string, (a: Activity) => string> = {
  watch: (a) => `watched episode ${a.data?.episode || '?'} of`,
  rate: (a) => `rated ${a.data?.score || '?'}/10`,
  add: (a) => `added to ${a.data?.status?.replace('_', ' ') || 'list'}`,
  review: () => `wrote a review for`,
  like: () => `liked`,
};

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className={cn("text-center py-12 text-muted-foreground", className)}>
        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No recent activity</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {activities.map((activity) => {
        const Icon = activityIcons[activity.type];
        const message = activityMessages[activity.type](activity);
        
        return (
          <div 
            key={activity.id}
            className="glass-card rounded-xl p-4 flex items-start gap-4 hover:border-border transition-colors"
          >
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary flex-shrink-0">
              {activity.user.avatar ? (
                <img 
                  src={activity.user.avatar} 
                  alt={activity.user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>
                <span className="text-muted-foreground"> {message} </span>
                <Link 
                  to={`/anime/${activity.anime.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {activity.anime.title}
                </Link>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </p>
            </div>

            {/* Anime Cover */}
            <Link 
              to={`/anime/${activity.anime.id}`}
              className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                src={activity.anime.coverImage}
                alt={activity.anime.title}
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Activity Type Icon */}
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              activity.type === 'rate' && "bg-accent/20 text-accent",
              activity.type === 'watch' && "bg-primary/20 text-primary",
              activity.type === 'add' && "bg-cyan/20 text-cyan",
              activity.type === 'review' && "bg-purple/20 text-purple",
              activity.type === 'like' && "bg-destructive/20 text-destructive",
            )}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
