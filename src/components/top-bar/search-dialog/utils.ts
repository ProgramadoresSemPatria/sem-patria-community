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

  if (item.entity === 'classroom') {
    if (!item.modules?.length || !item.modules[0].videos?.length) {
      return null
    }
  }

  switch (item.entity) {
    case 'forum':
      return `/forum/${item.id}/${item.title
        ?.toLowerCase()
        .replace(/\s+/g, '-')}`
    case 'user':
      return `/user/${item.username}`
    case 'classroom':
      return `/mentorship/${item.modules?.[0].videos?.[0].id}`
    case 'course':
      return item.courseUrl || ''
    case 'interest':
      return `/interests`
    default:
      return null
  }
}
