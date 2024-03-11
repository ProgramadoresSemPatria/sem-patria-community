import ClerkUserButton from '@/components/clerk-user-button'
import MainLogo from '@/components/main-logo'
import { ShortMenu } from '@/components/short-menu'
import { useMentorshipHeader } from './use-mentorship-header'

type MentorshipHeaderProps = {
  title: string
}

export const MentorshipHeader = ({ title }: MentorshipHeaderProps) => {
  const { formatTitle } = useMentorshipHeader()
  return (
    <header className="grid grid-cols-3 h-[72px] px-4 lg:pr-8 bg-gray-850 border border-transparent items-center border-b-muted">
      <div className="flex items-center">
        <ShortMenu />
        <MainLogo />
      </div>
      <div className="flex">
        <h1 className="text-muted-foreground font-semibold mx-auto text-center text-lg">
          {formatTitle(title)}
        </h1>
      </div>
      <div className="flex justify-end">
        <ClerkUserButton hiddenName />
      </div>
    </header>
  )
}
