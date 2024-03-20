import MainLogo from '@/components/main-logo'
import { ShortMenu } from '@/components/short-menu'
import { formatTitle } from '@/lib/utils'

type MentorshipHeaderProps = {
  program: string
}

export const MentorshipHeader = ({ program }: MentorshipHeaderProps) => {
  return (
    <header className="grid grid-cols-3 h-[72px] px-4 lg:pr-8 bg-gray-850 border border-transparent items-center border-b-muted">
      <div className="flex items-center">
        <ShortMenu />
        <MainLogo />
      </div>
      <div className="flex">
        <h1 className="text-muted-foreground font-semibold mx-auto text-center text-lg">
          {formatTitle(program)}
        </h1>
      </div>
      <div className="flex justify-end">
        <div className="h-3 w-3 bg-muted-foreground rounded-full" />
      </div>
    </header>
  )
}
