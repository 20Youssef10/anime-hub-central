import { useState } from 'react';
import { Plus, Edit2, Trash2, FolderPlus } from 'lucide-react';
import { useCustomLists, CustomList } from '@/hooks/useCustomLists';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const listIcons = ['📁', '🎬', '❤️', '⭐', '🔥', '🎌', '🌸', '🗡️', '🚀', '🎭'];
const listColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];

export function CustomListManager() {
  const { customLists, createList, deleteList, updateList } = useCustomLists();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingList, setEditingList] = useState<CustomList | null>(null);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📁');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');

  const handleCreate = () => {
    if (!newListName.trim()) {
      toast.error('Please enter a list name');
      return;
    }
    createList(newListName, newListDesc, selectedColor, selectedIcon);
    toast.success(`Created list "${newListName}"`);
    resetForm();
    setIsCreateOpen(false);
  };

  const handleUpdate = () => {
    if (!editingList || !newListName.trim()) return;
    updateList(editingList.id, {
      name: newListName,
      description: newListDesc,
      color: selectedColor,
      icon: selectedIcon,
    });
    toast.success('List updated');
    resetForm();
    setEditingList(null);
  };

  const handleDelete = (list: CustomList) => {
    deleteList(list.id);
    toast.success(`Deleted list "${list.name}"`);
  };

  const resetForm = () => {
    setNewListName('');
    setNewListDesc('');
    setSelectedIcon('📁');
    setSelectedColor('#3b82f6');
  };

  const openEdit = (list: CustomList) => {
    setEditingList(list);
    setNewListName(list.name);
    setNewListDesc(list.description || '');
    setSelectedIcon(list.icon || '📁');
    setSelectedColor(list.color || '#3b82f6');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-primary" />
          Custom Lists
        </h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="glow" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              New List
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="List name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <Textarea
                placeholder="Description (optional)"
                value={newListDesc}
                onChange={(e) => setNewListDesc(e.target.value)}
                className="resize-none"
              />
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {listIcons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        selectedIcon === icon ? 'bg-primary/20 ring-2 ring-primary' : 'bg-secondary/50 hover:bg-secondary'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {listColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full transition-all ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button variant="glow" onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {customLists.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <FolderPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No custom lists yet</p>
          <p className="text-sm">Create lists to organize your anime</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {customLists.map((list) => (
            <div
              key={list.id}
              className="glass-card rounded-xl p-4 flex items-center gap-4 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${list.color}20` }}
              >
                {list.icon || '📁'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{list.name}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {list.description || `${list.animeIds.length} anime`}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => openEdit(list)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-card">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete "{list.name}"?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this list. Anime in the list won't be removed from your watchlist.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(list)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingList} onOpenChange={() => setEditingList(null)}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Edit List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Textarea
              placeholder="Description (optional)"
              value={newListDesc}
              onChange={(e) => setNewListDesc(e.target.value)}
              className="resize-none"
            />
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {listIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                      selectedIcon === icon ? 'bg-primary/20 ring-2 ring-primary' : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Color</label>
              <div className="flex gap-2 flex-wrap">
                {listColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full transition-all ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingList(null)}>Cancel</Button>
            <Button variant="glow" onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
