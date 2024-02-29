import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useMemo } from 'react'

interface AdminActionsProps {
  commentId: string
}
export const AdminActions = ({ commentId }: AdminActionsProps) => {
  const adminActions = useMemo(() => {
    return [
      {
        label: 'Delete comment',
        icon: <Icons.trash className="h-4" />,
        onClick: () => {
          console.log('delete')
        }
      }
    ]
  }, [])

  return (
    <div className="flex gap-2 items-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="group rounded-full">
            <Icons.moreMenu className="transition-colors text-slate-600 group-hover:text-white h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          {adminActions.map(action => (
            <DropdownMenuItem key={action.label}>
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
