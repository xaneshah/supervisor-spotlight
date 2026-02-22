import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: string[];
  toggle: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggle: (id) => set((s) => ({
        bookmarks: s.bookmarks.includes(id)
          ? s.bookmarks.filter(b => b !== id)
          : [...s.bookmarks, id],
      })),
      isBookmarked: (id) => get().bookmarks.includes(id),
    }),
    { name: 'supervisor-bookmarks' }
  )
);
