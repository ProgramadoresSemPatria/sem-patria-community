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
      className="gap-x-2 items-center text-red-600 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 focus:text-red-700 active:bg-red-200 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/60 dark:focus:bg-red-900/60 dark:focus:text-red-300 dark:active:bg-red-800/60 transition-all duration-200"
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
