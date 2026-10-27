import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@/shared/api'
import filterData from '@/shared/temp/filterData.json'

const fetchFilterItems = async (): Promise<FilterItem[]> =>
	filterData.filterItems as FilterItem[]

export const useFilterItemsQuery = () =>
	useQuery({
		queryKey: ['filter', 'items'],
		queryFn: fetchFilterItems
	})
