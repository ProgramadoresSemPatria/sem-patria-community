'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Icons } from '../icons'
import Link from 'next/link'
import { Button } from '../ui/button'
import { appRoutes } from '@/lib/constants'
import { ScrollArea } from '../ui/scroll-area'
import { useChecklist } from '@/hooks/checklist/use-checklist'
import { ChecklistItem } from './components/checklist-item'
import { useEffect, useMemo } from 'react'
import { type ChallengeItem } from '@/hooks/checklist/type'
import { addDays, addMonths, addWeeks, isAfter, parseISO } from 'date-fns'

type ChecklistProps = {
  isWidget?: boolean
}

export const Checklist = ({ isWidget = false }: ChecklistProps) => {
  const { challenges, toggleComplete } = useChecklist()

  const completedItems = useMemo(
    () =>
      (Object.values(challenges).flat() as ChallengeItem[])
        .flat()
        .filter(item => item.completed).length || 0,
    [challenges]
  )

  const totalItems = useMemo(
    () =>
      Object.values(challenges)
        .map(arr => arr.length)
        .reduce((sum, length) => sum + length, 0),
    [challenges]
  )

  const resetChallengesByTime = () => {
    const now = new Date()

    const { daily, weekly, monthly } = challenges

    daily.forEach(challenge => {
      if (challenge.updatedAt) {
        const updatedAt = parseISO(challenge.updatedAt)
        const nextDay = addDays(updatedAt, 1)

        if (isAfter(now, nextDay)) {
          toggleComplete('daily', challenge.id, false)
        }
      } else {
        challenge.updatedAt = now.toISOString()
      }
    })

    weekly.forEach(challenge => {
      if (challenge.updatedAt) {
        const updatedAt = parseISO(challenge.updatedAt)
        const nextWeek = addWeeks(updatedAt, 1)

        if (isAfter(now, nextWeek)) {
          toggleComplete('weekly', challenge.id, false)
        }
      } else {
        challenge.updatedAt = now.toISOString()
      }
    })

    monthly.forEach(challenge => {
      if (challenge.updatedAt) {
        const updatedAt = parseISO(challenge.updatedAt)
        const nextMonth = addMonths(updatedAt, 1)

        if (isAfter(now, nextMonth)) {
          toggleComplete('monthly', challenge.id, false)
        }
      } else {
        challenge.updatedAt = now.toISOString()
      }
    })
  }

  useEffect(() => {
    resetChallengesByTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isWidget) {
    return (
      <div className="flex flex-col gap-y-2 h-full">
        <h2 className="text-lg font-semibold">127 days challenge</h2>
        <Card>
          <CardHeader className="flex flex-col gap-y-2">
            <CardTitle className="flex items-center gap-x-2 justify-between">
              <div className="flex items-center gap-x-2">
                <Icons.listTodo className="w-5 h-5" />
                Checklist
              </div>

              <div>
                <Link href={appRoutes.checklist}>
                  <Button
                    variant="link"
                    className="flex items-center gap-x-2 text-violet-700 p-0"
                  >
                    See more <Icons.redirect className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>

          <ScrollArea className="max-h-96 overflow-y-auto">
            <CardContent className="flex flex-col gap-y-2 relative">
              <h2 className="text-lg font-semibold">Daily</h2>
              {challenges.daily.map(todo => (
                <ChecklistItem key={todo.id} item={todo} sectionName="daily" />
              ))}

              <h2 className="text-lg font-semibold">Weekly</h2>
              {challenges.weekly.map(todo => (
                <ChecklistItem key={todo.id} item={todo} sectionName="weekly" />
              ))}

              <h2 className="text-lg font-semibold">Monthly</h2>
              {challenges.monthly.map(todo => (
                <ChecklistItem
                  key={todo.id}
                  item={todo}
                  sectionName="monthly"
                />
              ))}

              <h2 className="text-lg font-semibold">Unique Actions</h2>
              {challenges.uniqueActions.map(todo => (
                <ChecklistItem
                  key={todo.id}
                  item={todo}
                  sectionName="uniqueActions"
                />
              ))}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 h-full">
      <Card>
        <CardHeader className="flex flex-col gap-y-2">
          <CardTitle className="flex items-center gap-x-2 justify-between">
            <div className="flex items-center gap-x-2">
              <Icons.listTodo className="w-5 h-5" />
              Checklist
            </div>

            <div className="flex gap-x-2">
              <Icons.checkSquare className="w-4 h-4" />
              {completedItems}/{totalItems}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-2 relative">
          <h2 className="text-lg font-semibold mb-2">Daily</h2>
          {challenges.daily.map(todo => (
            <ChecklistItem key={todo.id} item={todo} sectionName="daily" />
          ))}

          <h2 className="text-lg font-semibold mb-2">Weekly</h2>
          {challenges.weekly.map(todo => (
            <ChecklistItem key={todo.id} item={todo} sectionName="weekly" />
          ))}

          <h2 className="text-lg font-semibold mb-2">Monthly</h2>
          {challenges.monthly.map(todo => (
            <ChecklistItem key={todo.id} item={todo} sectionName="monthly" />
          ))}

          <h2 className="text-lg font-semibold mb-2">Unique Actions</h2>
          {challenges.uniqueActions.map(todo => (
            <ChecklistItem
              key={todo.id}
              item={todo}
              sectionName="uniqueActions"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
