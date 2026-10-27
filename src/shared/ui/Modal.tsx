import { MouseEvent, ReactNode, SyntheticEvent, useEffect, useRef } from 'react'

import { t } from 'i18next'

type ModalSize = 'md' | 'lg'

interface ModalProps {
	open: boolean
	onClose: () => void
	onAfterClose?: () => void
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
	onAfterClose,
	title,
	footer,
	children,
	size = 'md'
}: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const wasOpenRef = useRef(false)

	useEffect(() => {
		const dialog = dialogRef.current

		if (!dialog) {
			return
		}

		if (open) {
			wasOpenRef.current = true
			delete dialog.dataset.closing
			if (!dialog.open) {
				dialog.showModal()
			}
			return
		}

		if (!wasOpenRef.current) {
			return
		}

		const finishClose = () => {
			wasOpenRef.current = false
			delete dialog.dataset.closing
			dialog.close()
			onAfterClose?.()
		}

		if (!dialog.open) {
			finishClose()
			return
		}

		let isCancelled = false
		dialog.dataset.closing = ''

		Promise.allSettled(
			dialog
				.getAnimations({ subtree: true })
				.filter(
					animation =>
						(animation.effect as KeyframeEffect | null)?.target === dialog
				)
				.map(animation => animation.finished)
		).then(() => {
			if (!isCancelled) {
				finishClose()
			}
		})

		return () => {
			isCancelled = true
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

	const handleNativeClose = () => {
		if (open) {
			onClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			onCancel={handleCancel}
			onClose={handleNativeClose}
			onClick={handleClick}
			className={`m-auto w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-background p-0 text-foreground shadow-xl backdrop:bg-overlay motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200 motion-safe:backdrop:animate-in motion-safe:backdrop:fade-in-0 motion-safe:backdrop:duration-200 motion-safe:data-closing:animate-out motion-safe:data-closing:fade-out-0 motion-safe:data-closing:zoom-out-95 motion-safe:data-closing:fill-mode-forwards motion-safe:data-closing:backdrop:animate-out motion-safe:data-closing:backdrop:fade-out-0 motion-safe:data-closing:backdrop:fill-mode-forwards data-closing:pointer-events-none ${sizeClassNames[size]}`}
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
