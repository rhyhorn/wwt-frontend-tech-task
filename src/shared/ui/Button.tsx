import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
	primary:
		'bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:border-primary-hover',
	secondary:
		'bg-secondary text-secondary-foreground border-border hover:bg-secondary-hover'
}

export const Button = ({
	variant = 'primary',
	type = 'button',
	className = '',
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={`inline-flex h-10 min-w-36 items-center justify-center rounded-lg border px-6 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 ${variantClassNames[variant]} ${className}`}
			{...props}
		/>
	)
}
