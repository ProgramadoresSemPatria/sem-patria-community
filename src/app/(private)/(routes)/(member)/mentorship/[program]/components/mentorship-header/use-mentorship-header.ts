export const useMentorshipHeader = () => {
  const formatTitle = (title: string) => {
    const formmatedTitle = title.split('-').join(' ')
    return formmatedTitle.toUpperCase()
  }

  return { formatTitle }
}
