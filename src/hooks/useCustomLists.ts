import { useState, useEffect, useCallback } from 'react';

const CUSTOM_LISTS_KEY = 'anime_custom_lists';

export interface CustomList {
  id: string;
  name: string;
  description?: string;
  animeIds: number[];
  createdAt: string;
  updatedAt: string;
  color?: string;
  icon?: string;
}

export function useCustomLists() {
  const [customLists, setCustomLists] = useState<CustomList[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CUSTOM_LISTS_KEY);
    if (stored) {
      setCustomLists(JSON.parse(stored));
    }
  }, []);

  const save = (lists: CustomList[]) => {
    localStorage.setItem(CUSTOM_LISTS_KEY, JSON.stringify(lists));
    setCustomLists(lists);
  };

  const createList = useCallback((name: string, description?: string, color?: string, icon?: string) => {
    const newList: CustomList = {
      id: crypto.randomUUID(),
      name,
      description,
      animeIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color,
      icon,
    };
    save([...customLists, newList]);
    return newList;
  }, [customLists]);

  const deleteList = useCallback((listId: string) => {
    save(customLists.filter(list => list.id !== listId));
  }, [customLists]);

  const updateList = useCallback((listId: string, updates: Partial<Omit<CustomList, 'id' | 'createdAt'>>) => {
    save(customLists.map(list => 
      list.id === listId 
        ? { ...list, ...updates, updatedAt: new Date().toISOString() }
        : list
    ));
  }, [customLists]);

  const addAnimeToList = useCallback((listId: string, animeId: number) => {
    save(customLists.map(list => 
      list.id === listId && !list.animeIds.includes(animeId)
        ? { ...list, animeIds: [...list.animeIds, animeId], updatedAt: new Date().toISOString() }
        : list
    ));
  }, [customLists]);

  const removeAnimeFromList = useCallback((listId: string, animeId: number) => {
    save(customLists.map(list => 
      list.id === listId 
        ? { ...list, animeIds: list.animeIds.filter(id => id !== animeId), updatedAt: new Date().toISOString() }
        : list
    ));
  }, [customLists]);

  const isAnimeInList = useCallback((listId: string, animeId: number) => {
    const list = customLists.find(l => l.id === listId);
    return list?.animeIds.includes(animeId) ?? false;
  }, [customLists]);

  const getListsContainingAnime = useCallback((animeId: number) => {
    return customLists.filter(list => list.animeIds.includes(animeId));
  }, [customLists]);

  return {
    customLists,
    createList,
    deleteList,
    updateList,
    addAnimeToList,
    removeAnimeFromList,
    isAnimeInList,
    getListsContainingAnime,
  };
}
