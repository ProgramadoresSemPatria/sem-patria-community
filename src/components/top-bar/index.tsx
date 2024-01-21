import React from 'react'
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
      <div className="hidden items-center gap-4 md:flex">
        {user.isAdmin && <CMSButton data-testid="cms" />}
        <FeedbackButton />
        {user.isAdmin && <NotificationsButton />}
        <LogoutButton />
      </div>
      <MobileButton />
    </div>
  )
}

export default TopBar
