export type SearchDialogResult = {
  id: string
  entity: 'forum' | 'user'
  url: string
  createdAt: string
  title?: string
  name?: string
  username?: string
  imageUrl?: string
  followers?: string
  category?: {
    name: string
  }
  user?: {
    username: string
  }
  _count?: {
    likes: number
  }
}

export type SearchApiResponse = {
  data: {
    items: SearchDialogResult[]
    counts: {
      posts: number
      users: number
    }
  }
  meta: {
    keyword: string
    searchedAt: string
    totalRecords: number
  }
}
