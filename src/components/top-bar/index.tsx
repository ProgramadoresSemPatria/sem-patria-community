import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { CMSButton } from './components/cms-button'
import { FeedbackButton } from './components/feedback-button'
import { LogoutButton } from './components/logout-button'
import { MobileButton } from './components/mobile-button'
import NotificationsButton from './components/notifications-button/index'

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
        {user.isAdmin && (
          <>
            <NotificationsButton />
            <CMSButton />
          </>
        )}
        <FeedbackButton />
        <LogoutButton />
      </div>
      <MobileButton />
    </div>
  )
}

export default TopBar
