import { cn } from '@/lib/utils';

interface GenreFilterProps {
  genres: string[];
  selected: string[];
  onSelect: (genre: string) => void;
}

export function GenreFilter({ genres, selected, onSelect }: GenreFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('all')}
        className={cn(
          "filter-chip",
          selected.length === 0 && "active"
        )}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className={cn(
            "filter-chip",
            selected.includes(genre) && "active"
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
