import { ExternalLink } from 'lucide-react';
import { StreamingLink } from '@/types/anime';
import { cn } from '@/lib/utils';

interface StreamingBadgeProps {
  link: StreamingLink;
  size?: 'sm' | 'md';
}

const platformConfig = {
  crunchyroll: {
    name: 'Crunchyroll',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    icon: '🍊'
  },
  netflix: {
    name: 'Netflix',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: '🎬'
  },
  funimation: {
    name: 'Funimation',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: '📺'
  },
  hulu: {
    name: 'Hulu',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: '📱'
  }
};

export function StreamingBadge({ link, size = 'md' }: StreamingBadgeProps) {
  const config = platformConfig[link.platform];

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border transition-all duration-200 hover:scale-105",
        config.color,
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'
      )}
    >
      <span>{config.icon}</span>
      <span className="font-medium">{config.name}</span>
      <ExternalLink className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
    </a>
  );
}
