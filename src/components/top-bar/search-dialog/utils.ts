import { toast } from '@/components/ui/use-toast'
import { type SearchDialogResult } from '@/hooks/search/types'
import { format } from 'date-fns'

export const formatDateText = (entity: string, createdAt: string) => {
  if (!createdAt) return ''

  let label = ''
  switch (entity) {
    case 'user':
      label = 'Joined'
      break
    case 'forum':
      label = 'Posted'
      break
    case 'event':
      label = 'Hosted'
      break
    default:
      label = 'Created'
  }
  return `${label} on ${format(new Date(createdAt), 'MMM dd, yyyy')}`
}

export const getEntityColorClass = (entity: string) => {
  const entityColors = {
    forum: 'fill-indigo-500 dark:fill-indigo-400',
    user: 'fill-blue-500 dark:fill-blue-400',
    course: 'fill-yellow-500 dark:fill-yellow-400',
    module: 'fill-green-500 dark:fill-green-400',
    video: 'fill-red-500 dark:fill-red-400',
    interest: 'fill-primary dark:fill-primary',
    event: 'fill-sky-500 dark:fill-sky-400'
  }

  return entityColors[entity as keyof typeof entityColors] || ''
}
export const getItemUrl = (item: SearchDialogResult): string | null => {
  if (!item) return null

  switch (item.entity) {
    case 'forum': {
      const { id, title } = item
      if (!id || !title) return null
      const formattedTitle = encodeURIComponent(
        title.toLowerCase().replace(/\s+/g, '-')
      )
      return `/forum/${id}/${formattedTitle}`
    }

    case 'video': {
      const { id } = item
      if (!id) return null
      return `/mentorship/${encodeURIComponent(id)}`
    }

    case 'user': {
      if (!item.username) return null
      return `/user/${encodeURIComponent(item.username)}`
    }

    case 'module': {
      const videoId = item.videos?.[0]?.id
      if (!videoId) {
        toast({
          title: 'This module has no videos',
          description: 'Please try again later'
        })
        return null
      }
      return `/mentorship/${encodeURIComponent(videoId)}`
    }

    case 'course': {
      const category = item.category?.name
        ? encodeURIComponent(item.category.name)
        : 'all'
      const level = item.level ? encodeURIComponent(item.level) : 'all'
      const availability = item.isPaid ? '' : 'free'
      return `/courses/?category=${category}&level=${level}&availability=${availability}`
    }

    case 'interest': {
      if (!item.id) return null
      return `/interests?interestId=${encodeURIComponent(item.id)}`
    }

    default:
      return null
  }
}
