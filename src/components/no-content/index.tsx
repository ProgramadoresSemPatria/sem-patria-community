import { Card, CardContent } from '@/components/ui/card'

type NoContentProps = {
  title: string
  description?: string
}

export const NoContent = ({ title, description }: NoContentProps) => {
  return (
    <Card className="flex h-80 flex-col items-center justify-center gap-8 rounded-lg p-6">
      <CardContent className="flex max-w-md flex-col gap-2 text-center">
        <h2 className="text-xl tracking-[-0.16px] font-bold">{title}</h2>
        {description && (
          <span className="text-sm font-normal">{description}</span>
        )}
      </CardContent>
    </Card>
  )
}
