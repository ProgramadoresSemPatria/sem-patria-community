import { type GetVimeoVideoResponse } from '@/services/vimeo/types'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export enum TabTypes {
  VIDEOS = 'videos',
  PROGRAMS = 'programs',
  ASSETS = 'assets'
}

type UseMentorshipTabProps = {
  program: string
}

export const useMentorshipTab = ({ program }: UseMentorshipTabProps) => {
  const queryClient = useQueryClient()
  const videos = queryClient.getQueryData<GetVimeoVideoResponse>([
    'vimeo-videos',
    program
  ])

  const [tab, setTab] = useState<TabTypes>(TabTypes.VIDEOS)

  const handleSetTab = useCallback((tab: TabTypes) => {
    setTab(tab)
  }, [])

  const assets = [
    {
      title: 'Resume example'
    },
    {
      title: 'Link to Something'
    },
    {
      title: 'PDF Dowload'
    }
  ]

  return { tab, handleSetTab, videos, assets }
}
