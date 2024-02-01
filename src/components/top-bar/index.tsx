import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { CMSButton } from './cms-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import { MobileButton } from './mobile-button'
import NotificationsButton from './notifications-button/index'

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
      <div className="flex items-center gap-3">
        {user.isAdmin && <CMSButton />}
        <FeedbackButton />
        {user.isAdmin && <NotificationsButton />}
        <div className="hidden md:flex">
          <LogoutButton />
        </div>
      </div>
      <MobileButton />
    </div>
  )
}

export default TopBar
