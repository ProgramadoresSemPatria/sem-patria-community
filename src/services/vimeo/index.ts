import { vimeoApi } from '@/lib/api'
import { type VimeoProjectApiResponse, type VimeoProjectProps } from './types'

export const getAllVimeoProjects = async (): Promise<VimeoProjectProps[]> => {
  const url = '/me/projects'

  const { data } = await vimeoApi.get<VimeoProjectApiResponse>(url)

  const extractNumberAfterLastSlash = (value: string) => {
    const regex = /\/(\d+)$/
    const match = value.match(regex)
    if (match) {
      return parseInt(match[1], 10)
    }
  }

  const formattedData: VimeoProjectProps[] = data.data.map(project => ({
    id: extractNumberAfterLastSlash(project.uri)?.toString() ?? '',
    name: project.name,
    videosAmount: project.metadata.connections.videos.total
  }))

  return formattedData
}
