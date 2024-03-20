export type GetVimeoVideoResponse = {
  total: number
  data: VimeoVideoProps[]
}

export type VimeoVideoProps = {
  name: string
  description?: string
  player_url: string
  duration: number
  pictures: {
    sizes: Array<{
      width: number
      height: number
      link: string
    }>
  }
}

export type GetVimeoVideoProps = {
  projectId: string
}
