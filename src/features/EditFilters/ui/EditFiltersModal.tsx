import { useState } from 'react'

import { t } from 'i18next'

import {
	FilterGroup,
	getSelectedOptionIds,
	toggleFilterOption,
	useFilterItemsQuery,
	useFilterStore
} from '@/entities/Filter'
import { Button, Modal } from '@/shared/ui'

import { ConfirmApplyModal } from './ConfirmApplyModal'

interface EditFiltersModalProps {
	onClose: () => void
}

export const EditFiltersModal = ({ onClose }: EditFiltersModalProps) => {
	const appliedFilters = useFilterStore(state => state.filters)
	const setFilters = useFilterStore(state => state.setFilters)
	const { data: filterItems, isPending, isError } = useFilterItemsQuery()

	const [draftFilters, setDraftFilters] = useState(appliedFilters)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const applyFilters = () => {
		setFilters(draftFilters)
		onClose()
	}

	const renderContent = () => {
		if (isPending) {
			return <p>{t('filter:loading')}</p>
		}
		if (isError) {
			return <p>{t('filter:error')}</p>
		}

		return filterItems.map(filter => (
			<FilterGroup
				key={filter.id}
				filter={filter}
				selectedOptionIds={getSelectedOptionIds(draftFilters, filter.id)}
				onToggleOption={optionId =>
					setDraftFilters(current =>
						toggleFilterOption(current, filter.id, optionId)
					)
				}
			/>
		))
	}

	return (
		<>
			<Modal
				open
				onClose={onClose}
				size="lg"
				title={t('filter:title')}
				footer={
					<div className="flex w-full flex-col items-center gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr]">
						<Button
							className="sm:col-start-2"
							disabled={!filterItems}
							onClick={() => setIsConfirmOpen(true)}
						>
							{t('filter:apply')}
						</Button>
						<button
							type="button"
							onClick={() => setDraftFilters([])}
							className="cursor-pointer text-sm text-primary underline hover:text-primary-hover sm:justify-self-end"
						>
							{t('filter:clear-all')}
						</button>
					</div>
				}
			>
				{renderContent()}
			</Modal>

			<ConfirmApplyModal
				open={isConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={applyFilters}
				onCancel={onClose}
			/>
		</>
	)
}
