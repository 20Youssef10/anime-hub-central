import { useState } from 'react';
import { MessageSquare, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useWatchlist } from '@/hooks/useWatchlist';
import { toast } from 'sonner';

interface EpisodeNoteDialogProps {
  animeId: number;
  episode: number;
  existingNote?: string;
  trigger?: React.ReactNode;
}

export function EpisodeNoteDialog({ animeId, episode, existingNote, trigger }: EpisodeNoteDialogProps) {
  const { addEpisodeNote, removeEpisodeNote } = useWatchlist();
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState(existingNote || '');

  const handleSave = () => {
    if (note.trim()) {
      addEpisodeNote(animeId, episode, note);
      toast.success(`Note saved for Episode ${episode}`);
    } else if (existingNote) {
      removeEpisodeNote(animeId, episode);
      toast.success('Note removed');
    }
    setIsOpen(false);
  };

  const handleDelete = () => {
    removeEpisodeNote(animeId, episode);
    setNote('');
    toast.success('Note removed');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className={existingNote ? 'text-primary' : 'text-muted-foreground'}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Episode {episode} Notes
          </DialogTitle>
        </DialogHeader>

        <Textarea
          placeholder="Add your thoughts, favorite moments, or reactions..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[120px] resize-none"
        />

        <DialogFooter className="flex-row gap-2 sm:gap-2">
          {existingNote && (
            <Button variant="ghost" onClick={handleDelete} className="text-destructive hover:text-destructive">
              <X className="w-4 h-4 mr-1" />
              Delete
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="glow" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
