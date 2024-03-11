export type VimeoProjectApiResponse = {
  data: Array<{
    name: string
    uri: string
    metadata: {
      connections: {
        videos: {
          total: number
        }
      }
    }
  }>
}

export type VimeoProjectProps = {
  id: string
  name: string
  videosAmount: number
}
