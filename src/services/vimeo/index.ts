import { vimeoApi } from '@/lib/api'
import { type GetVimeoVideoProps, type GetVimeoVideoResponse } from './types'

export const getVimeoVideos = async (
  props: GetVimeoVideoProps
): Promise<GetVimeoVideoResponse> => {
  const url = `/me/projects/${props.projectId}/videos`

  const params = {
    per_page: 100
  }

  const { data } = await vimeoApi.get<GetVimeoVideoResponse>(url, { params })

  return data
}
