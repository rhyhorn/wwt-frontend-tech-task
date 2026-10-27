import { useState } from 'react'

import { t } from 'i18next'

import { useFilterStore } from '@/entities/Filter'
import { EditFiltersModal } from '@/features/EditFilters'
import { Button } from '@/shared/ui'

export const Home = () => {
	const filters = useFilterStore(state => state.filters)
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-4">
			<h1 className="text-center text-4xl text-foreground sm:text-6xl">
				{t('home:title')}
			</h1>
			<Button onClick={() => setIsFilterModalOpen(true)}>
				{t('home:change-filters')}
			</Button>

			<section className="w-full max-w-2xl">
				<h2 className="mb-2 text-lg">{t('home:selected-filters')}</h2>
				<pre className="overflow-x-auto rounded-lg border border-border p-4 text-sm">
					{JSON.stringify(filters, null, 2)}
				</pre>
			</section>

			{isFilterModalOpen && (
				<EditFiltersModal onClose={() => setIsFilterModalOpen(false)} />
			)}
		</main>
	)
}
