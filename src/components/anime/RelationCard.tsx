import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface AnimeRelation {
  id: number;
  title: string;
  coverImage: string;
  type: 'ANIME' | 'MANGA';
  format: string;
  relationType: string;
}

interface RelationCardProps {
  relation: AnimeRelation;
  className?: string;
}

const relationLabels: Record<string, string> = {
  PREQUEL: 'Prequel',
  SEQUEL: 'Sequel',
  PARENT: 'Parent Story',
  SIDE_STORY: 'Side Story',
  SPIN_OFF: 'Spin Off',
  ADAPTATION: 'Adaptation',
  ALTERNATIVE: 'Alternative',
  CHARACTER: 'Character',
  SUMMARY: 'Summary',
  OTHER: 'Other',
};

export function RelationCard({ relation, className }: RelationCardProps) {
  const isAnime = relation.type === 'ANIME';
  
  return (
    <Link 
      to={isAnime ? `/anime/${relation.id}` : '#'} 
      className={cn("block group", !isAnime && "pointer-events-none", className)}
    >
      <div className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
        <div className="flex">
          {/* Cover Image */}
          <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden">
            <img
              src={relation.coverImage}
              alt={relation.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Info */}
          <div className="flex-1 p-3 min-w-0 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-primary uppercase">
                {relationLabels[relation.relationType] || relation.relationType}
              </span>
              <h4 className="font-medium text-sm line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                {relation.title}
              </h4>
            </div>
            <span className="text-xs text-muted-foreground">
              {relation.format.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
