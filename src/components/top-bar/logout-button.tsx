'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()
  const { signOut, user } = useClerk()
  return (
    <Button
      variant="ghost"
      className="gap-x-2 items-center"
      onClick={async () => {
        await fetch(`/api/user/${user?.id}/remove-username-cookie`, {
          method: 'POST'
        })
        await signOut(() => {
          router.push(appRoutes.signIn)
        })
      }}
    >
      <Icons.signOut className="w-4 h-4" />
      Sign out
    </Button>
  )
}
