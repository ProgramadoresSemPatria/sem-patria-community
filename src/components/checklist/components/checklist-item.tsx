'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
  type ChallengeSections,
  type ChallengeItem
} from '@/hooks/checklist/type'
import { useChecklist } from '@/hooks/checklist/use-checklist'
import { cn } from '@/lib/utils'

type ChecklistItemProps = {
  item: ChallengeItem
  sectionName: keyof ChallengeSections
}

export const ChecklistItem = ({ item, sectionName }: ChecklistItemProps) => {
  const { toggleComplete } = useChecklist()

  return (
    <div className="flex items-center gap-x-2 py-1">
      <Checkbox
        checked={item.completed}
        onCheckedChange={newValue => {
          toggleComplete(sectionName, item.id, newValue)
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
