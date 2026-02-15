import { create } from 'zustand';

interface SearchStore {
  query: string;
  setQuery: (q: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
