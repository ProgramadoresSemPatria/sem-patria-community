import { AppSidebar } from '@/components/app-sidebar'
import MainLogo from '@/components/main-logo'
import { SidebarTrigger } from '@/components/ui/sidebar'

type MentorshipHeaderProps = {
  videoTitle: string
}

export const MentorshipHeader = async ({
  videoTitle
}: MentorshipHeaderProps) => {
  return (
    <header className="grid grid-cols-3 h-[72px] px-4 lg:pr-8 bg-gray-850 border border-transparent items-center border-b-muted">
      <div className="flex items-center">
        <SidebarTrigger />
        <AppSidebar mentorship />
        <MainLogo />
      </div>
      <div className="flex">
        <h1 className="text-muted-foreground font-semibold mx-auto text-center text-lg text-ellipsis whitespace-nowrap overflow-hidden">
          {videoTitle}
        </h1>
      </div>
      <div className="flex justify-end">
        <div className="h-3 w-3 bg-muted-foreground rounded-full" />
      </div>
    </header>
  )
}
