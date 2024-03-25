import { getAllVimeoProjects } from '@/services/vimeo'
import { useQuery } from '@tanstack/react-query'

export const useMentorshipSection = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['vimeo-projects'],
    queryFn: getAllVimeoProjects
  })
  return { data, isFetching }
}
