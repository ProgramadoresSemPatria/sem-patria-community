import { Icons } from '@/components/icons'

const Loading = () => {
  return (
    <div className="h-screen flex w-screen items-center justify-center">
      <div className="flex gap-x-2 items-center">
        <Icons.loader className="animate-spin h-6 w-6" />
        <span className="text-sm font-medium fill-muted-foreground">
          Loading...
        </span>
      </div>
    </div>
  )
}

export default Loading
