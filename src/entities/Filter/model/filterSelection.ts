import { produce } from 'immer'

import { FilterType, SearchRequestFilter } from '@/shared/api'

export const getSelectedOptionIds = (
	filters: SearchRequestFilter,
	filterId: string
): string[] => filters.find(filter => filter.id === filterId)?.optionsIds ?? []

export const toggleFilterOption = (
	filters: SearchRequestFilter,
	filterId: string,
	optionId: string
): SearchRequestFilter =>
	produce(filters, draft => {
		const filter = draft.find(item => item.id === filterId)

		if (!filter) {
			draft.push({
				id: filterId,
				type: FilterType.OPTION,
				optionsIds: [optionId]
			})
			return
		}

		const optionIndex = filter.optionsIds.indexOf(optionId)

		if (optionIndex === -1) {
			filter.optionsIds.push(optionId)
		} else {
			filter.optionsIds.splice(optionIndex, 1)
		}

		if (!filter.optionsIds.length) {
			draft.splice(draft.indexOf(filter), 1)
		}
	})
