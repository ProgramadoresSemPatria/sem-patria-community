import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Icons } from '@/components/icons'

interface ErrorStateProps {
  title: string
  description: string
  retry?: () => void
}

export const ErrorState = ({ title, description, retry }: ErrorStateProps) => {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="text-destructive">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {retry && (
        <CardContent>
          <Button variant="outline" onClick={retry}>
            <Icons.rotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
