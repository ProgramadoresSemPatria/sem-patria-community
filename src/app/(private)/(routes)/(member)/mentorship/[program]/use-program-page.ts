'use client'

import { mentorshipPrograms } from '@/lib/constants'
import { formatTitle } from '@/lib/utils'
import { getVimeoVideos } from '@/services/vimeo'
import {
  type GetVimeoVideoResponse,
  type VimeoVideoProps
} from '@/services/vimeo/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type UseProgramPageProps = {
  program: string
}

export const useProgramPage = ({ program }: UseProgramPageProps) => {
  const [videoSelected, setVideoSelected] = useState<VimeoVideoProps>()

  const projectSelectedProps = mentorshipPrograms().find(
    value => value.title === formatTitle(program)
  )

  const { data: videos } = useQuery<GetVimeoVideoResponse>({
    queryKey: ['vimeo-videos', program],
    queryFn: async () => {
      return await getVimeoVideos({
        projectId: projectSelectedProps?.vimeoProjectId ?? ''
      })
    }
  })

  useEffect(() => {
    if (videos) {
      console.log('oi')
      setVideoSelected(videos.data.find(video => video.name === program))
    }
  }, [program, videos])

  return { formatTitle, videos, videoSelected }
}
