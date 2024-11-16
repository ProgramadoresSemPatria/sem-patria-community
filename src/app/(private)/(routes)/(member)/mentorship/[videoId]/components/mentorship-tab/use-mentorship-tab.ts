import { toast } from '@/components/ui/use-toast'
import { useMentorshipStore } from '@/hooks/mentorship/use-mentorship-store'
import { api } from '@/lib/api'
import { type Video } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

export enum TabTypes {
  VIDEOS = 'videos',
  ATTACHMENTS = 'attachments'
}
export interface VideoOrder {
  id: string
  order: number
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

  const { mutateAsync: saveOrder } = useMutation({
    mutationKey: ['update-order'],
    mutationFn: async (orderedVideos: VideoOrder[]) => {
      await api.patch(`/api/classroom/video`, {
        order: orderedVideos
      })
    },
    onSuccess: async () => {
      toast({
        title: 'The order was updated succesfully'
      })
    },
    onError: err => {
      console.error('Error ordering videos', err)
      toast({
        title: 'An error occurred while ordering videos'
      })
    }
  })

  const handleSaveOrder = async (videos: Video[]) => {
    const orderedVideos: VideoOrder[] = videos.map((video, index) => ({
      id: video.id,
      order: index
    }))
    try {
      await saveOrder(orderedVideos)
    } catch (error) {
      console.error('Failed to save order:', error)
    }
  }

  return { tab, handleSetTab, videosAlreadyWatched, handleSaveOrder }
}
