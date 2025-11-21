import { create } from 'zustand'
import type { SortOrder } from '../types/domain'

interface UIState {
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
  
  // View mode could be grid or list
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
}

export const useUIStore = create<UIState>(set => ({
  sortOrder: 'name-asc',
  setSortOrder: order => set({ sortOrder: order }),
  
  viewMode: 'grid',
  setViewMode: mode => set({ viewMode: mode }),
}))

