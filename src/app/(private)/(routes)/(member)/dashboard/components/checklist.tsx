'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { useTodos } from '@/hooks/checklist/use-todos'
import { ChecklistItem } from './checklist-item'

const Checklist = () => {
  const todos = useTodos(state => state.todos)

  const totalItems = useMemo(
    () =>
      Object.values(todos)
        .map(arr => arr.length)
        .reduce((sum, length) => sum + length, 0),
    [todos]
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
          <h2 className="text-lg font-semibold">Diária</h2>
          {todos.daily.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}

          <h2 className="text-lg font-semibold">Semanal</h2>
          {todos.weekly.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}

          <h2 className="text-lg font-semibold">Mensal</h2>
          {todos.monthly.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}

          <h2 className="text-lg font-semibold">Ação Única</h2>
          {todos.uniqueActions.map((todo, idx) => (
            <ChecklistItem key={idx} item={todo} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Checklist
