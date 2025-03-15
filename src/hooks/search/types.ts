export type Entity =
  | 'forum'
  | 'user'
  | 'classroom'
  | 'course'
  | 'interest'
  | 'event'

export type SearchDialogResult = {
  id: string
  entity: Entity
  url?: string | null
  createdAt: string
  title?: string
  courseUrl?: string
  level?: string
  name?: string
  location?: string
  specialGuest?: string
  interest?: string
  isPaid?: boolean
  username?: string
  imageUrl?: string
  followers?: string
  users?: Array<{
    username: string
  }>
  modules?: Array<{
    videos: Array<{
      id: string
    }>
  }>
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
      classrooms: number
      courses: number
    }
  }
  meta: {
    keyword: string
    searchedAt: string
    totalRecords: number
  }
}
