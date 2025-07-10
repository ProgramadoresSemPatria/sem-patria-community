import Loading from '@/app/loading'
import { AppSidebar } from '@/components/app-sidebar'
import MainLogo from '@/components/main-logo'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { currentUser } from '@clerk/nextjs/server'

type MentorshipHeaderProps = {
  videoTitle: string
}

export const MentorshipHeader = async ({
  videoTitle
}: MentorshipHeaderProps) => {
  const user = await currentUser()
  if (!user?.username) return <Loading />

  return (
    <header className="grid grid-cols-3 h-[72px] px-4 lg:pr-8 bg-gray-850 border border-transparent items-center border-b-muted">
      <div className="flex items-center gap-x-4">
        <SidebarTrigger />
        <AppSidebar userName={user?.username} mentorship />
        <MainLogo />
      </div>
      <div className="flex">
        <h1 className="text-muted-foreground font-semibold mx-auto text-center text-lg text-ellipsis whitespace-nowrap overflow-hidden">
          {videoTitle}
        </h1>
      </div>
    </header>
  )
}
