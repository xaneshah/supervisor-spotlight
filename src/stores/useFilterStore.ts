import { create } from 'zustand';
import type { Department, SortOption, ViewMode } from '@/types';

interface FilterStore {
  department: Department | 'all';
  setDepartment: (d: Department | 'all') => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  department: 'all',
  setDepartment: (department) => set({ department }),
  sort: 'highest',
  setSort: (sort) => set({ sort }),
  viewMode: 'grid',
  setViewMode: (viewMode) => set({ viewMode }),
}));
