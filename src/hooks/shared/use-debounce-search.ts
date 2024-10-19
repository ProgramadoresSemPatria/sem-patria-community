import { useState, useEffect, useCallback } from 'react'
import { useDebouncedValue } from '@mantine/hooks'

interface UseDebounceSearchProps {
  initialValue: string
  delay?: number
  onSearch: (value: string) => void
}

export function useDebounceSearch({
  initialValue,
  delay = 300,
  onSearch
}: UseDebounceSearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, delay)

  const debouncedSearch = useCallback(
    (value: string) => {
      onSearch(value)
    },
    [onSearch]
  )

  useEffect(() => {
    if (debouncedSearchTerm !== initialValue) {
      debouncedSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, initialValue, debouncedSearch])

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm
  }
}
