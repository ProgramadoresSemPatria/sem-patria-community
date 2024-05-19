import { Checkbox } from '@/components/ui/checkbox'
import { type TodoItem } from '@/hooks/checklist/type'

type ChecklistItemProps = {
  item: TodoItem
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
      <span className="text-muted-foreground text-sm">{item.title}</span>
    </div>
  )
}
