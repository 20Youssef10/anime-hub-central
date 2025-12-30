import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { 
  Plus, 
  Eye, 
  Check, 
  Clock, 
  Pause, 
  X, 
  Share2, 
  ExternalLink,
  FolderPlus,
  Heart,
  Trash2 
} from 'lucide-react';
import { WatchStatus } from '@/types/anime';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useCustomLists } from '@/hooks/useCustomLists';
import { toast } from 'sonner';

interface QuickActionsMenuProps {
  children: React.ReactNode;
  animeId: number;
  animeTitle: string;
  onShare?: () => void;
}

const statusOptions: { value: WatchStatus; label: string; icon: React.ReactNode }[] = [
  { value: 'watching', label: 'Watching', icon: <Eye className="w-4 h-4" /> },
  { value: 'completed', label: 'Completed', icon: <Check className="w-4 h-4" /> },
  { value: 'plan_to_watch', label: 'Plan to Watch', icon: <Clock className="w-4 h-4" /> },
  { value: 'on_hold', label: 'On Hold', icon: <Pause className="w-4 h-4" /> },
  { value: 'dropped', label: 'Dropped', icon: <X className="w-4 h-4" /> },
];

export function QuickActionsMenu({ children, animeId, animeTitle, onShare }: QuickActionsMenuProps) {
  const { addToWatchlist, updateWatchlistItem, removeFromWatchlist, isInWatchlist, getWatchlistItem } = useWatchlist();
  const { customLists, addAnimeToList, removeAnimeFromList, isAnimeInList } = useCustomLists();
  
  const inWatchlist = isInWatchlist(animeId);
  const currentItem = getWatchlistItem(animeId);

  const handleStatusChange = (status: WatchStatus) => {
    if (inWatchlist) {
      updateWatchlistItem(animeId, { status });
    } else {
      addToWatchlist(animeId, status);
    }
    toast.success(`Added to ${status.replace('_', ' ')}`);
  };

  const handleRemove = () => {
    removeFromWatchlist(animeId);
    toast.success('Removed from watchlist');
  };

  const handleAddToCustomList = (listId: string, listName: string) => {
    if (isAnimeInList(listId, animeId)) {
      removeAnimeFromList(listId, animeId);
      toast.success(`Removed from "${listName}"`);
    } else {
      addAnimeToList(listId, animeId);
      toast.success(`Added to "${listName}"`);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 glass-card">
        <ContextMenuSub>
          <ContextMenuSubTrigger className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Set Status
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 glass-card">
            {statusOptions.map((option) => (
              <ContextMenuItem
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={currentItem?.status === option.value ? 'bg-primary/20' : ''}
              >
                <span className="flex items-center gap-2">
                  {option.icon}
                  {option.label}
                </span>
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>

        {customLists.length > 0 && (
          <ContextMenuSub>
            <ContextMenuSubTrigger className="flex items-center gap-2">
              <FolderPlus className="w-4 h-4" />
              Add to List
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48 glass-card">
              {customLists.map((list) => (
                <ContextMenuItem
                  key={list.id}
                  onClick={() => handleAddToCustomList(list.id, list.name)}
                  className={isAnimeInList(list.id, animeId) ? 'bg-primary/20' : ''}
                >
                  <span className="flex items-center gap-2">
                    {list.icon || '📁'} {list.name}
                    {isAnimeInList(list.id, animeId) && <Check className="w-3 h-3 ml-auto" />}
                  </span>
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}

        <ContextMenuSeparator />

        <ContextMenuItem onClick={onShare} className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Open in AniList
        </ContextMenuItem>

        {inWatchlist && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={handleRemove}
              className="flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Remove from List
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
