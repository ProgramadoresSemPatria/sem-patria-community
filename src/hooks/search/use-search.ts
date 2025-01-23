import { useState, useCallback } from 'react'
import { type SearchDialogResult, type SearchApiResponse } from './types'

const useSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchDialogResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?keyword=${encodeURIComponent(value)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data: SearchApiResponse = await response.json()
      const normalizedResults: SearchDialogResult[] = data.data.items.map(
        item => {
          return {
            ...item,
            entity: item.title ? 'forum' : 'user',
            url: item.title
              ? `/forum/${item.id}/${item.title
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`
              : `/user/${item.username}`
          }
        }
      )
      setSearchResults(normalizedResults)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, searchResults, setSearchResults, handleSearch }
}

export default useSearch
