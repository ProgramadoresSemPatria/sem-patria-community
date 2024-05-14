import { useMentorshipStore } from '@/hooks/mentorship/use-mentorship-store'
import { useCallback, useEffect, useState } from 'react'

export enum TabTypes {
  VIDEOS = 'videos',
  PROGRAMS = 'programs'
}

export const useMentorshipTab = () => {
  const { videosWatched } = useMentorshipStore()
  const [tab, setTab] = useState<TabTypes>(TabTypes.VIDEOS)
  const [videosAlreadyWatched, setVideosAlreadyWatched] = useState<string[]>([])

  const handleSetTab = useCallback((tab: TabTypes) => {
    setTab(tab)
  }, [])

  useEffect(() => {
    setVideosAlreadyWatched(videosWatched.map(video => video.id))
  }, [videosWatched])

  return { tab, handleSetTab, videosAlreadyWatched }
}
