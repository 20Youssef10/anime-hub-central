import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Character {
  id: number;
  name: string;
  image: string;
  role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
  voiceActor?: {
    id: number;
    name: string;
    image: string;
    language: string;
  };
}

interface CharacterCardProps {
  character: Character;
  className?: string;
}

export function CharacterCard({ character, className }: CharacterCardProps) {
  return (
    <Link to={`/character/${character.id}`} className={cn("block group", className)}>
      <div className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
        <div className="flex">
          {/* Character Image */}
          <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Character Info */}
          <div className="flex-1 p-3 min-w-0">
            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {character.name}
            </h4>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full mt-1 inline-block",
              character.role === 'MAIN' ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
            )}>
              {character.role}
            </span>
          </div>

          {/* Voice Actor */}
          {character.voiceActor && (
            <>
              <div className="flex-1 p-3 text-right min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {character.voiceActor.name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {character.voiceActor.language}
                </span>
              </div>
              <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden">
                <img
                  src={character.voiceActor.image}
                  alt={character.voiceActor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
