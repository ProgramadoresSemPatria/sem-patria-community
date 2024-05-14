'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { type Video } from '@prisma/client'
import { useButtonMarkAsWatched } from './use-button-mark-as-watched'

type ButtonMarkAsWatchedProps = {
  videoProps: Video
}

export const ButtonMarkAsWatched = ({
  videoProps
}: ButtonMarkAsWatchedProps) => {
  const { onAddVideosWatched, onRemoveVideosWatched, isVideoWatched } =
    useButtonMarkAsWatched({ videoProps })

  return (
    <>
      {isVideoWatched ? (
        <Button
          onClick={() => {
            onRemoveVideosWatched(videoProps)
          }}
          variant="ghost"
          className="flex items-center transition-colors hover:stroke-[#d1d5db] stroke-emerald-400 text-emerald-400 hover:text-primary"
        >
          <Icons.check className="h-4 w-4 mr-2" />
          <span>Mark as unwatched</span>
        </Button>
      ) : (
        <Button
          onClick={() => {
            onAddVideosWatched(videoProps)
          }}
          variant="ghost"
          className="flex items-center transition-colors hover:text-emerald-400 stroke-[#d1d5db] hover:stroke-emerald-400"
        >
          <Icons.check className="h-4 w-4 mr-2" />
          <span>Mark as watched</span>
        </Button>
      )}
    </>
  )
}
