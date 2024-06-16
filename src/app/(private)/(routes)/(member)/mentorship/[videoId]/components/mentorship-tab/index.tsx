'use client'
import { Icons } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { appRoutes } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { type Video } from '@prisma/client'
import Link from 'next/link'
import { TabTypes, useMentorshipTab } from './use-mentorship-tab'
import { Reorder } from 'framer-motion'
import { useState } from 'react'
import { AbilityContext } from '@/hooks/use-ability'
import { useAbility } from '@casl/react'
import { Button } from '@/components/ui/button'

type MentorshipTabProps = {
  videoProps: Video
  moduleVideos: Video[]
}

const MentorshipTab = ({ videoProps, moduleVideos }: MentorshipTabProps) => {
  const { tab, handleSetTab, videosAlreadyWatched, handleSaveOrder } =
    useMentorshipTab()
  const ability = useAbility(AbilityContext)
  const canManageVideos = ability.can('manage', 'all')

  const [videos, setVideos] = useState(moduleVideos)

  return (
    <div className="flex flex-col self-stretch w-full md:w-[360px] min-[1441px]:w-[384px] min-[1921px]:w-[432px] h-full border-l border-l-gray-800 transition-all">
      <div className="flex py-4">
        <div
          className={cn(
            'hover:cursor-pointer border-b-2 pb-3 w-full flex justify-center',
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
      </div>
      <div className="flex flex-col p-3 gap-y-3">
        {tab === TabTypes.VIDEOS && (
          <>
            <h1 className="font-bold text-xl pl-3">Content</h1>
            <Reorder.Group values={videos} onReorder={setVideos}>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <h1 className="font-light p-4 pl-0 whitespace-nowrap overflow-hidden text-ellipsis">
                      {videoProps.title}
                    </h1>
                    {canManageVideos && (
                      <Button
                        onClick={() => {
                          handleSaveOrder(videos)
                        }}
                        size="sm"
                      >
                        Save order
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-x-2 items-center text-sm text-muted-foreground">
                    <span>{videos.length} Videos</span>
                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>
                      {videos
                        .find(item => item.title === videoProps.title)
                        ?.createdAt.toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    {videos.map((video, index) => {
                      const isVideoWatched = videosAlreadyWatched.some(
                        item => item === video.id
                      )
                      return (
                        <Reorder.Item
                          value={video}
                          key={video.id}
                          drag={canManageVideos}
                        >
                          <TooltipProvider key={video.url}>
                            <Tooltip>
                              <TooltipTrigger className="flex w-full">
                                <Link
                                  className="flex p-2 w-full items-center justify-between gap-6 cursor-pointer rounded transition-colors hover:bg-gray-800 text-success-light hover:text-success-light"
                                  href={`${appRoutes.mentorship}/${video.id}`}
                                >
                                  <div className="flex flex-1 items-center gap-3 overflow-hidden">
                                    <Icons.video
                                      className={cn(
                                        isVideoWatched && 'stroke-emerald-400'
                                      )}
                                    />
                                    <span
                                      className={cn(
                                        isVideoWatched && 'text-emerald-400',
                                        'w-full text-ellipsis text-sm line-clamp-2 text-left'
                                      )}
                                    >
                                      {video.title}
                                    </span>
                                  </div>
                                </Link>
                                {canManageVideos && (
                                  <Icons.grip className="cursor-grab" />
                                )}
                              </TooltipTrigger>
                              <TooltipContent>{video.title}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Reorder.Item>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </Reorder.Group>
          </>
        )}
      </div>
    </div>
  )
}

export default MentorshipTab
