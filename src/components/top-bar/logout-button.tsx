'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()
  const { signOut } = useClerk()
  return (
    <Button
      variant="ghost"
      className="gap-x-2 items-center ml-2"
      onClick={async () => {
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
