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
