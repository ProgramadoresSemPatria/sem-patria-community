'use client'

import { Card } from '@/components/ui/card'

type ChecklistProps = {
  isWidget?: boolean
}

export const Checklist = ({ isWidget = false }: ChecklistProps) => {
  if (isWidget) {
    return <div>IS WIDGET</div>
  }

  return <Card>src/components/checklist/index.tsx</Card>
}
