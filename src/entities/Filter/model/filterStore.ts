import { create } from 'zustand'

import { SearchRequestFilter } from '@/shared/api'

interface FilterState {
	filters: SearchRequestFilter
	setFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>()(set => ({
	filters: [],
	setFilters: filters => set({ filters })
}))
