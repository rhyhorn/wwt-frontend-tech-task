import { useState } from 'react'

import { t } from 'i18next'

import { Button, Modal } from '@/shared/ui'

export const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const closeModal = () => setIsModalOpen(false)

	return (
		<section className="w-full h-dvh flex items-center justify-center flex-col">
			<h1 className="text-6xl text-foreground mb-12">{t('home:title')}</h1>
			<Button onClick={() => setIsModalOpen(true)}>
				{t('home:change-filters')}
			</Button>
			<Modal
				open={isModalOpen}
				onClose={closeModal}
				title={t('filter:apply-title')}
				footer={
					<>
						<Button
							variant="secondary"
							onClick={closeModal}
						>
							{t('filter:use-old')}
						</Button>
						<Button onClick={closeModal}>{t('filter:apply-new')}</Button>
					</>
				}
			/>
		</section>
	)
}
