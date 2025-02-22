import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Roles as RolesLabel } from '@/lib/types'
import { getHighestPriorityRole } from '@/lib/utils'
import { type Roles } from '@prisma/client'

type UserCellRolesProps = {
  roles: string[]
}
const UserCellRoles = ({ roles }: UserCellRolesProps) => {
  const priorityRole = RolesLabel[getHighestPriorityRole(roles as Roles[])]
  const userMappedRoles = roles
    .map(role => RolesLabel[role as Roles])
    .filter(role => role !== priorityRole)

  const remaningRolesQuantity = userMappedRoles.length

  return (
    <Popover>
      <PopoverTrigger
        disabled={remaningRolesQuantity === 0}
        className="text-xs text-gray-500"
      >
        <Badge>
          {priorityRole ?? 'Not assigned'}{' '}
          {remaningRolesQuantity > 0 && `+${remaningRolesQuantity}`}
        </Badge>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-1 max-w-full">
          {remaningRolesQuantity > 0 ? (
            userMappedRoles.map((role, index) => (
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
