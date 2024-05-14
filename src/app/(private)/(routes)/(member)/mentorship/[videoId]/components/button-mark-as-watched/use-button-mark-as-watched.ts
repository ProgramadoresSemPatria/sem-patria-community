import { useMentorshipStore } from '@/hooks/mentorship/use-mentorship-store'
import { type Video } from '@prisma/client'
import { useEffect, useState } from 'react'

type UseButtonMarkAsWatchedProps = {
  videoProps: Video
}

export const useButtonMarkAsWatched = ({
  videoProps
}: UseButtonMarkAsWatchedProps) => {
  const { onAddVideosWatched, onRemoveVideosWatched, videosWatched } =
    useMentorshipStore()

  const [isVideoWatched, setIsVideoWatched] = useState(false)

  useEffect(() => {
    setIsVideoWatched(videosWatched.some(video => video.id === videoProps.id))
  }, [videoProps, videosWatched])

  return { isVideoWatched, onAddVideosWatched, onRemoveVideosWatched }
}
