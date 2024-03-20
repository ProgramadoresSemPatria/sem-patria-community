import { appRoutes } from '@/lib/constants'
import { UserButton, useUser } from '@clerk/nextjs'

type ClerkUserButtonProps = {
  hiddenName?: boolean
}

const ClerkUserButton = ({ hiddenName = false }: ClerkUserButtonProps) => {
  const { user } = useUser()

  return (
    <div className="flex items-center gap-x-2">
      <UserButton afterSignOutUrl={appRoutes.signIn} />
      {!hiddenName && (
        <span className="truncate font-bold text-muted-foreground text-sm">
          {user?.fullName ?? ''}
        </span>
      )}
    </div>
  )
}

export default ClerkUserButton
