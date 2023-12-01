import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { CMSButton } from './components/cms-button'
import { LogoutButton } from './components/logout-button'
import { MobileButton } from './components/mobile-button'

const TopBar = async () => {
  const { userId } = auth()
  if (!userId) return redirect(appRoutes.root)

  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  if (!user) return redirect(appRoutes.root)

  return (
    <div className="flex h-[60px] items-center justify-end border-b border-slate-6 px-6">
      <div className="hidden items-center gap-4 md:flex">
        {user.isAdmin && <CMSButton />}

        <Button disabled variant="outline" className="gap-x-2 items-center">
          <Icons.bot className="w-4 h-4" />
          Feedback
        </Button>
        <LogoutButton />
      </div>
      <MobileButton />
    </div>
  )
}

export default TopBar
