export type Entity =
  | 'forum'
  | 'user'
  | 'course'
  | 'interest'
  | 'event'
  | 'module'
  | 'video'

export type SearchDialogResult = {
  id: string
  entity: Entity
  url?: string | null
  date?: string
  createdAt: string
  classroomModule?: {
    title: string
    videos: Array<{
      id: string
    }>
  }
  videos?: Array<{
    id: string
  }>
  classroom?: {
    title: string
  }
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
