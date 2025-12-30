import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  const shortcuts: ShortcutConfig[] = [
    { key: '/', action: () => navigate('/search'), description: 'Open search' },
    { key: 'h', action: () => navigate('/'), description: 'Go to home' },
    { key: 'b', action: () => navigate('/browse'), description: 'Go to browse' },
    { key: 'w', action: () => navigate('/watchlist'), description: 'Go to watchlist' },
    { key: 'p', action: () => navigate('/profile'), description: 'Go to profile' },
    { key: 's', action: () => navigate('/seasonal'), description: 'Go to seasonal' },
    { key: 'Escape', action: () => document.activeElement instanceof HTMLElement && document.activeElement.blur(), description: 'Close/blur' },
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if typing in input/textarea
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !(event.ctrlKey || event.metaKey);
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;

      if (event.key === shortcut.key && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault();
        shortcut.action();
        return;
      }
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { shortcuts };
}

export function useShortcutsHelp() {
  return [
    { key: '/', description: 'Open search' },
    { key: 'H', description: 'Go to home' },
    { key: 'B', description: 'Go to browse' },
    { key: 'W', description: 'Go to watchlist' },
    { key: 'P', description: 'Go to profile' },
    { key: 'S', description: 'Go to seasonal' },
    { key: 'ESC', description: 'Close modal/blur' },
  ];
}
