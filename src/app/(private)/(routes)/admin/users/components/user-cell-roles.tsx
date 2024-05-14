import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

type UserCellRolesProps = {
  roles: string[]
}
const UserCellRoles = ({ roles }: UserCellRolesProps) => {
  const userRoles = [...roles] ?? []
  const lastRole = userRoles.pop()
  const remaningRolesQuantity = userRoles.length

  return (
    <Popover>
      <PopoverTrigger
        disabled={remaningRolesQuantity === 0}
        className="text-xs text-gray-500"
      >
        <Badge>
          {lastRole ?? 'Not assigned'}{' '}
          {remaningRolesQuantity > 0 && `+${remaningRolesQuantity}`}
        </Badge>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-1 max-w-full">
          {remaningRolesQuantity > 0 ? (
            userRoles.map((role, index) => (
              <Badge key={index} className="text-xs w-fit text-center">
                {role}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-gray-500">
              User has not been assigned any role
            </span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserCellRoles
