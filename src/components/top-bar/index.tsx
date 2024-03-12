import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import MainLogo from '../main-logo'
import { CMSButton } from './cms-button'
import { FeedbackButton } from './feedback-button'
import { LogoutButton } from './logout-button'
import { MobileButton } from './mobile-button'
import NotificationsButton from './notifications-button/index'
import { Roles } from '@prisma/client'

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
      <MainLogo isMobile />
      <div className="flex items-center gap-3">
        {user.role === Roles.Admin && <CMSButton />}
        <FeedbackButton />
        {user.role === Roles.Admin && <NotificationsButton />}
        <div className="hidden md:flex">
          <LogoutButton />
        </div>
      </div>
      <MobileButton />
    </div>
  )
}

export default TopBar
