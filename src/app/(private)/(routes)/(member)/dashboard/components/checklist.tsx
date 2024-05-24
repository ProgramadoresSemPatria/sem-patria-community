'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { useChecklist } from '@/hooks/checklist/use-checklist'
import { ChecklistItem } from './checklist-item'

const Checklist = () => {
  const challenges = useChecklist(state => state.challenges)

  const totalItems = useMemo(
    () =>
      Object.values(challenges)
        .map(arr => arr.length)
        .reduce((sum, length) => sum + length, 0),
    [challenges]
  )

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg font-semibold">127 days challenge</h2>
      <Card>
        <CardHeader className="flex flex-col gap-y-2">
          <CardTitle className="flex items-center  gap-x-2 justify-between">
            <div className="flex items-center gap-x-2">
              <Icons.listTodo className="w-5 h-5" />
              Checklist
            </div>

            <div className="flex gap-x-2">
              <Icons.checkSquare className="w-4 h-4" />
              0/{totalItems}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-2 max-h-36 relative overflow-y-auto">
          <h2 className="text-lg font-semibold">Daily</h2>
          {challenges.daily.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}

          <h2 className="text-lg font-semibold">Weekly</h2>
          {challenges.weekly.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}

          <h2 className="text-lg font-semibold">Monthly</h2>
          {challenges.monthly.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}

          <h2 className="text-lg font-semibold">Unique Actions</h2>
          {challenges.uniqueActions.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Checklist
