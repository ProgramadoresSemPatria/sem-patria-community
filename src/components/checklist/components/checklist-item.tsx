import { Checkbox } from '@/components/ui/checkbox'
import { type ChallengeItem } from '@/hooks/checklist/type'
import { cn } from '@/lib/utils'

type ChecklistItemProps = {
  item: ChallengeItem
}

export const ChecklistItem = ({ item }: ChecklistItemProps) => {
  return (
    <div className="flex items-center gap-x-2 py-1">
      <Checkbox
        checked={item.completed}
        onCheckedChange={newValue => {
          // TODO
          console.log('🚀 ~ ChecklistItem ~ onCheckedChange:', newValue)
        }}
      />
      <span
        className={cn(
          item.completed && 'line-through',
          'text-muted-foreground text-sm'
        )}
      >
        {item.title}
      </span>
    </div>
  )
}
