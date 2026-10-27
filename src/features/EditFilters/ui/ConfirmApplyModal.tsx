import { t } from 'i18next'

import { Button, Modal } from '@/shared/ui'

interface ConfirmApplyModalProps {
	open: boolean
	onClose: () => void
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmApplyModal = ({
	open,
	onClose,
	onConfirm,
	onCancel
}: ConfirmApplyModalProps) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			title={t('filter:apply-title')}
			footer={
				<>
					<Button
						variant="secondary"
						onClick={onCancel}
					>
						{t('filter:use-old')}
					</Button>
					<Button onClick={onConfirm}>{t('filter:apply-new')}</Button>
				</>
			}
		/>
	)
}
