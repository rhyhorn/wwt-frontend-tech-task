import { MouseEvent, ReactNode, SyntheticEvent, useEffect, useRef } from 'react'

import { t } from 'i18next'

type ModalSize = 'md' | 'lg'

interface ModalProps {
	open: boolean
	onClose: () => void
	title: ReactNode
	footer?: ReactNode
	children?: ReactNode
	size?: ModalSize
}

const sizeClassNames: Record<ModalSize, string> = {
	md: 'max-w-2xl',
	lg: 'max-w-4xl'
}

export const Modal = ({
	open,
	onClose,
	title,
	footer,
	children,
	size = 'md'
}: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current

		if (open && !dialog?.open) {
			dialog?.showModal()
		}
		if (!open && dialog?.open) {
			dialog.close()
		}
	}, [open])

	const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
		e.preventDefault()
		onClose()
	}

	return (
		<dialog
			ref={dialogRef}
			onCancel={handleCancel}
			onClick={handleClick}
			className={`m-auto w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-background p-0 text-foreground shadow-xl backdrop:bg-overlay ${sizeClassNames[size]}`}
		>
			<div className="flex max-h-[calc(100dvh-4rem)] flex-col">
				<header className="relative mx-8 mt-8 mb-6 px-10">
					<h2 className="text-center text-2xl">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label={t('common:close')}
						className="absolute top-1/2 right-0 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-primary"
					>
						<svg
							viewBox="0 0 24 24"
							className="size-5"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							aria-hidden
						>
							<path d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
				</header>

				{children && (
					<div className="min-h-0 flex-1 overflow-y-auto px-8">{children}</div>
				)}

				{footer && (
					<footer className="flex justify-center gap-4 px-8 pt-6 pb-8">
						{footer}
					</footer>
				)}
			</div>
		</dialog>
	)
}
