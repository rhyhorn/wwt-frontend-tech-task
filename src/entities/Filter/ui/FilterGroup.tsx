import { FilterItem } from '@/shared/api'
import { Checkbox } from '@/shared/ui'

interface FilterGroupProps {
	filter: FilterItem
	selectedOptionIds: string[]
	onToggleOption: (optionId: string) => void
}

export const FilterGroup = ({
	filter,
	selectedOptionIds,
	onToggleOption
}: FilterGroupProps) => {
	return (
		<div className="border-b border-divider py-6 first:pt-0">
			<fieldset>
				<legend className="float-left mb-4 w-full text-lg">
					{filter.name}
				</legend>
				<div className="clear-both grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
					{filter.options.map(option => (
						<Checkbox
							key={option.id}
							label={option.name}
							description={option.description}
							checked={selectedOptionIds.includes(option.id)}
							onChange={() => onToggleOption(option.id)}
						/>
					))}
				</div>
			</fieldset>
		</div>
	)
}
