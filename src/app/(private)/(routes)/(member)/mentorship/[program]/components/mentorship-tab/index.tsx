'use client'
import { Icons } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { mentorshipPhases } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useProgramPage } from '../../use-program-page'
import { TabTypes, useMentorshipTab } from './use-mentorship-tab'

type MentorshipTabProps = {
  title: string
}

const MentorshipTab = ({ title }: MentorshipTabProps) => {
  const { tab, handleSetTab, assets, videos } = useMentorshipTab()
  const { formatTitle } = useProgramPage()

  return (
    <div className="flex flex-col self-stretch w-full md:w-[360px] min-[1441px]:w-[384px] min-[1921px]:w-[432px] h-full border-l border-l-gray-800 transition-all">
      <div className="flex py-4">
        <div
          className={cn(
            'hover:cursor-pointer border-b-2 pb-3 w-1/2 flex justify-center',
            tab === TabTypes.VIDEOS ? 'border-violet-600' : 'border-gray-600'
          )}
          onClick={() => {
            handleSetTab(TabTypes.VIDEOS)
          }}
        >
          <Icons.play
            className="w-5 h-5"
            color={`${tab === TabTypes.VIDEOS ? '#7c3aed' : '#94a3b8'}`}
          />
        </div>
        <div
          className={cn(
            'hover:cursor-pointer border-b-2 pb-3 w-1/2 flex justify-center',
            tab === TabTypes.PROGRAMS ? 'border-violet-600' : 'border-gray-600'
          )}
          onClick={() => {
            handleSetTab(TabTypes.PROGRAMS)
          }}
        >
          <Icons.mentorship
            className="w-5 h-5"
            color={`${tab === TabTypes.PROGRAMS ? '#7c3aed' : '#94a3b8'}`}
          />
        </div>
        <div
          className={cn(
            'hover:cursor-pointer border-b-2 pb-3 w-1/2 flex justify-center',
            tab === TabTypes.ASSETS ? 'border-violet-600' : 'border-gray-600'
          )}
          onClick={() => {
            handleSetTab(TabTypes.ASSETS)
          }}
        >
          <Icons.asset
            className="w-5 h-5"
            color={`${tab === TabTypes.ASSETS ? '#7c3aed' : '#94a3b8'}`}
          />
        </div>
      </div>
      <div className="flex flex-col p-3 gap-y-3">
        {tab === TabTypes.VIDEOS && (
          <>
            <h1 className="font-bold text-xl pl-3">Content</h1>
            <Card>
              <CardContent>
                <h1 className="font-light p-4 pl-0">
                  {formatTitle(title)}
                  <div className="flex gap-x-2 items-center text-sm text-muted-foreground">
                    <span>3 Classes</span>
                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>04:33:59</span>
                  </div>
                </h1>

                <div className="flex flex-col">
                  {videos.map(video => (
                    <Link
                      className="flex p-2 items-center gap-6 cursor-pointer rounded transition-colors hover:bg-gray-800 text-success-light hover:text-success-light"
                      key={video.title}
                      href={`${video.href}`}
                    >
                      <div className="flex flex-1 items-center gap-3 overflow-hidden">
                        <Icons.video />
                        <span className="w-full overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                          {video.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-300 font-normal tabular-nums">
                        01:16:22
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {tab === TabTypes.PROGRAMS && (
          <>
            <h1 className="font-bold text-xl pl-3">Programs</h1>
            <Card>
              <CardContent>
                <h1 className="font-light p-4 pl-0">
                  Level Programs
                  <div className="flex gap-x-2 items-center text-sm text-muted-foreground">
                    <span>{mentorshipPhases.length} Programs</span>
                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  </div>
                </h1>

                <div className="flex flex-col pt-4 gap-y-4">
                  {mentorshipPhases.map(phase => (
                    <Link
                      key={phase.title}
                      href={`${phase.href}`}
                      className="flex items-center"
                    >
                      <Image
                        alt={phase.title}
                        width={48}
                        height={48}
                        src={phase.src}
                        className="object-cover rounded-md"
                      />
                      <h2 className="ml-2 w-4/6 overflow-hidden text-ellipsis text-sm font-medium whitespace-nowrap">
                        {phase.title}
                      </h2>
                      <Icons.redirect className="ml-auto h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {tab === TabTypes.ASSETS && (
          <>
            <h1 className="font-bold text-xl pl-3">Extra Assets</h1>
            {assets.length ? (
              <Card>
                <CardContent>
                  <div className="flex flex-col pt-4 gap-y-2">
                    {assets.map(asset => (
                      <div
                        className="flex p-2 items-center gap-6 cursor-pointer rounded transition-colors hover:bg-gray-800 text-success-light hover:text-success-light"
                        key={asset.title}
                      >
                        <div className="flex flex-1 items-center gap-3 overflow-hidden">
                          <Icons.asset />
                          <span className="w-full overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                            {asset.title}
                          </span>
                        </div>
                        <Icons.redirect className="ml-auto h-5 w-5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="mt-8 flex flex-col justify-center items-center gap-y-3">
                <Icons.asset className="h-8 w-8" color="#94a3b8" />
                <span className="text-muted-foreground text-center text-sm w-1/2">
                  There is not extra assets relacted for this class
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MentorshipTab
