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
    classroom: 'fill-green-500 dark:fill-green-400',
    interest: 'fill-red-500 dark:fill-red-400',
    event: 'fill-purple-500 dark:fill-purple-400'
  }

  return entityColors[entity as keyof typeof entityColors] || ''
}
export const getItemUrl = (item: SearchDialogResult): string | null => {
  if (!item) return null

  if (
    item.entity === 'classroom' &&
    (!Array.isArray(item.modules) ||
      !item.modules.length ||
      !Array.isArray(item.modules[0].videos) ||
      !item.modules[0].videos.length)
  ) {
    return null
  }

  switch (item.entity) {
    case 'forum': {
      const { id, title } = item
      if (!id || !title) return null
      const formattedTitle = encodeURIComponent(
        title.toLowerCase().replace(/\s+/g, '-')
      )
      return `/forum/${id}/${formattedTitle}`
    }

    case 'user': {
      if (!item.username) return null
      return `/user/${encodeURIComponent(item.username)}`
    }

    case 'classroom': {
      const videoId = item.modules?.[0].videos?.[0]?.id
      if (!videoId) return null
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
