import { useQuery } from '@tanstack/react-query'

import { getFilterItems } from '@/shared/api'

export const useFilterItemsQuery = () =>
	useQuery({
		queryKey: ['filter', 'items'],
		queryFn: getFilterItems
	})
