import { useState } from 'react'

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchPosts = async (keyword: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(
        `/api/search?keyword=${encodeURIComponent(keyword)}`,
        {
          method: 'POST'
        }
      )

      if (!response.ok) {
        throw new Error('Error while searching posts')
      }

      const data = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { searchPosts, isLoading, error }
}
