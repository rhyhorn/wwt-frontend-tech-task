import filterData from './mocks/filterData.json'
import { FilterItem } from './types'

export const getFilterItems = async (): Promise<FilterItem[]> =>
	filterData.filterItems as FilterItem[]
