import { InputHTMLAttributes, ReactNode, useId } from 'react'

interface CheckboxProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type'
> {
	label: ReactNode
	description?: ReactNode
}

export const Checkbox = ({
	label,
	description,
	className = '',
	...props
}: CheckboxProps) => {
	const descriptionId = useId()

	return (
		<>
			<label
				className={`group inline-flex cursor-pointer items-center gap-3 text-sm text-foreground has-disabled:cursor-not-allowed has-disabled:opacity-50 ${className}`}
			>
				<span className="relative flex size-4 shrink-0">
					<input
						type="checkbox"
						aria-describedby={description ? descriptionId : undefined}
						className="peer size-4 cursor-pointer appearance-none rounded-sm border-[1.5px] border-foreground bg-background transition-colors checked:border-primary checked:bg-primary enabled:group-hover:border-primary enabled:checked:group-hover:border-primary-hover enabled:checked:group-hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed"
						{...props}
					/>
					<svg
						viewBox="0 0 16 16"
						className="pointer-events-none absolute inset-0 hidden size-4 text-primary-foreground peer-checked:block"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden
					>
						<path d="M4 8.5l2.5 2.5L12 5.5" />
					</svg>
				</span>
				{label}
			</label>
			{description && (
				<span
					id={descriptionId}
					className="sr-only"
				>
					{description}
				</span>
			)}
		</>
	)
}
