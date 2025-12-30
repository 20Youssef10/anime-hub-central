import { useState, useRef } from 'react';
import { Download, Upload, FileJson, AlertCircle, CheckCircle } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function ImportExportDialog() {
  const { exportWatchlist, importWatchlist, watchlist } = useWatchlist();
  const [isOpen, setIsOpen] = useState(false);
  const [importData, setImportData] = useState('');
  const [mergeMode, setMergeMode] = useState(true);
  const [importResult, setImportResult] = useState<'success' | 'error' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportWatchlist();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anitrack-watchlist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Watchlist exported successfully');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportWatchlist());
    toast.success('Copied to clipboard');
  };

  const handleImport = () => {
    if (!importData.trim()) {
      toast.error('Please paste your watchlist data');
      return;
    }

    const success = importWatchlist(importData, mergeMode);
    if (success) {
      setImportResult('success');
      toast.success('Watchlist imported successfully');
      setImportData('');
    } else {
      setImportResult('error');
      toast.error('Invalid data format');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImportData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileJson className="w-4 h-4 mr-2" />
          Import/Export
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-primary" />
            Import & Export
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="export" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
              <p className="text-sm text-muted-foreground">
                Export your watchlist as a JSON file. You can use this to:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>Backup your data</li>
                <li>Transfer to another device</li>
                <li>Share with friends</li>
              </ul>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Your watchlist contains <span className="text-primary font-semibold">{watchlist.length}</span> anime
            </div>

            <div className="flex gap-2">
              <Button variant="glow" className="flex-1" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Download JSON
              </Button>
              <Button variant="outline" onClick={handleCopyToClipboard}>
                Copy
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 mt-4">
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>

            <div className="relative">
              <Textarea
                placeholder="Or paste your JSON data here..."
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="min-h-[150px] font-mono text-xs"
              />
              {importResult && (
                <div className={`absolute top-2 right-2 ${importResult === 'success' ? 'text-green-500' : 'text-destructive'}`}>
                  {importResult === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="merge-mode"
                checked={mergeMode}
                onCheckedChange={setMergeMode}
              />
              <Label htmlFor="merge-mode" className="text-sm">
                Merge with existing (keep both)
              </Label>
            </div>

            <Button
              variant="glow"
              className="w-full"
              onClick={handleImport}
              disabled={!importData.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Watchlist
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
