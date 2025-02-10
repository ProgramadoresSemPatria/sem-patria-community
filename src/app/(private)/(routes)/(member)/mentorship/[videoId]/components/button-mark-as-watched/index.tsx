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
          className="flex items-center transition-colors stroke-brand-green-400 text-brand-green-400 hover:text-brand-green-400 hover:bg-muted"
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
          className="flex items-center transition-colors hover:text-brand-green-400 hover:bg-brand-green-950"
        >
          <Icons.check className="h-4 w-4 mr-2" />
          <span>Mark as watched</span>
        </Button>
      )}
    </>
  )
}
