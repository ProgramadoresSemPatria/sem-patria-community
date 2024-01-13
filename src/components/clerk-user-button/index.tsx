import { UserButton, useUser } from '@clerk/nextjs'
import { appRoutes } from '@/lib/constants'

const ClerkUserButton = () => {
  const { user } = useUser()

  return (
    <div className="flex items-center gap-x-2">
      <UserButton afterSignOutUrl={appRoutes.signIn} />
      <span className="truncate font-bold text-muted-foreground text-sm">
        {user?.fullName ?? ''}
      </span>
    </div>
  )
}

export default ClerkUserButton
