import { useState } from 'react';
import { Check, X, Trash2, FolderPlus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWatchlist } from '@/hooks/useWatchlist';
import { WatchStatus } from '@/types/anime';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BulkEditModeProps {
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onExitEditMode: () => void;
  allIds: number[];
}

const statusOptions: { value: WatchStatus; label: string }[] = [
  { value: 'watching', label: 'Watching' },
  { value: 'completed', label: 'Completed' },
  { value: 'plan_to_watch', label: 'Plan to Watch' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'dropped', label: 'Dropped' },
];

export function BulkEditToolbar({ selectedIds, onSelectionChange, onExitEditMode, allIds }: BulkEditModeProps) {
  const { bulkUpdateStatus, bulkRemove } = useWatchlist();

  const handleSelectAll = () => {
    if (selectedIds.length === allIds.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allIds);
    }
  };

  const handleBulkStatus = (status: WatchStatus) => {
    bulkUpdateStatus(selectedIds, status);
    toast.success(`Updated ${selectedIds.length} anime to "${status.replace('_', ' ')}"`);
    onExitEditMode();
  };

  const handleBulkDelete = () => {
    bulkRemove(selectedIds);
    toast.success(`Removed ${selectedIds.length} anime from watchlist`);
    onExitEditMode();
  };

  if (selectedIds.length === 0) {
    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 mb-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedIds.length === allIds.length && allIds.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">Select anime to edit</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onExitEditMode}>
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={selectedIds.length === allIds.length}
          onCheckedChange={handleSelectAll}
        />
        <span className="text-sm font-medium">
          {selectedIds.length} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="w-4 h-4 mr-1" />
              Set Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-card">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleBulkStatus(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleBulkDelete}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Remove
        </Button>

        <Button variant="ghost" size="icon" onClick={onExitEditMode}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

interface SelectableItemProps {
  isSelected: boolean;
  onToggle: () => void;
  isEditMode: boolean;
  children: React.ReactNode;
}

export function SelectableItem({ isSelected, onToggle, isEditMode, children }: SelectableItemProps) {
  return (
    <div className={cn("relative", isEditMode && "cursor-pointer")} onClick={isEditMode ? onToggle : undefined}>
      {isEditMode && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Checkbox checked={isSelected} onCheckedChange={onToggle} />
        </div>
      )}
      <div className={cn(isEditMode && "pl-10")}>
        {children}
      </div>
    </div>
  );
}
