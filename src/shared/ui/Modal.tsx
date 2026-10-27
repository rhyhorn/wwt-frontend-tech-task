import { MouseEvent, ReactNode, useEffect, useRef } from 'react'

import { t } from 'i18next'

interface ModalProps {
	open: boolean
	onClose: () => void
	title: ReactNode
	footer?: ReactNode
	children?: ReactNode
}

export const Modal = ({
	open,
	onClose,
	title,
	footer,
	children
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

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			onClick={handleClick}
			className="m-auto w-full max-w-2xl rounded-2xl bg-background p-0 text-foreground shadow-xl backdrop:bg-overlay"
		>
			<div className="flex flex-col gap-12 p-8">
				<header className="relative px-10">
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

				{children && <div>{children}</div>}

				{footer && (
					<footer className="flex justify-center gap-4">{footer}</footer>
				)}
			</div>
		</dialog>
	)
}
