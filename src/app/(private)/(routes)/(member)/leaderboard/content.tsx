'use client'

import type {
  CurrentSeasonResponse,
  LeaderboardScore
} from '@/actions/leaderboard/types'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useSeason } from '@/hooks/season/use-season'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import { LeaderboardSkeleton } from './skeleton'
// import { mockLeaderboardData, mockSearchResults } from './mock-data'
import { TopThree } from './components/top-three'
import { UserListItem } from './components/user-list-item'
import { SearchInput } from './components/search-input'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  const { useGetCurrentSeason, useSearchLeaderboardUsers } = useSeason()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300) // 300ms debounce

  // TEMPORARY: Use mock data instead of API calls
  const {
    data: refreshedData,
    isLoading: isLoadingRefresh,
    refetch
  } = useGetCurrentSeason({
    queryKey: ['getCurrentSeason'],
    enabled: false
  })

  // TEMPORARY: Mock implementation
  // const refreshedData = null
  // const isLoadingRefresh = false
  // const refetch = async () => {
  //   console.log('Mock refresh called')
  //   return Promise.resolve()
  // }

  // TEMPORARY: Use mock search results instead of API call
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch
  } = useSearchLeaderboardUsers(debouncedSearchTerm, {
    queryKey: ['searchLeaderboardUsers', debouncedSearchTerm],
    enabled: debouncedSearchTerm.length >= 2
  })

  // TEMPORARY: Mock implementation
  // const searchResults =
  //   debouncedSearchTerm.length >= 2 ? mockSearchResults : null
  // const isLoadingSearch = false
  // const isFetchingSearch = false

  const seasonData = useMemo(() => {
    // TEMPORARY: Use mock data instead of API data
    return refreshedData || data
    // return mockLeaderboardData || data
  }, [refreshedData, data])

  const isLoading = isLoadingRefresh || isLoadingSearch || isFetchingSearch

  const displayData = useMemo(() => {
    if (debouncedSearchTerm.length >= 2 && searchResults?.users) {
      return searchResults.users
    }

    if (!seasonData?.scores) return []

    return seasonData.scores
  }, [debouncedSearchTerm, searchResults, seasonData])

  // Filter local for short searches or while waiting for debounce
  const filteredLeaderboardData = useMemo(() => {
    if (debouncedSearchTerm.length >= 2) {
      // If we have API results, use them
      return displayData
    }

    if (!seasonData?.scores) return []

    // Local filter for short searches or while waiting for debounce
    if (searchTerm) {
      return seasonData.scores.filter(
        score =>
          score.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          score.user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return seasonData.scores
  }, [searchTerm, debouncedSearchTerm, seasonData, displayData])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  const isSearchLoading = isLoadingSearch || isFetchingSearch
  const isRefreshLoading = isLoadingRefresh

  const renderTopThree = useMemo(() => {
    if (!seasonData?.scores) return null
    return <TopThree scores={seasonData.scores} />
  }, [seasonData])

  const renderRemainingUsers = useMemo(() => {
    if (
      !filteredLeaderboardData.length ||
      filteredLeaderboardData.length <= 3
    ) {
      return (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <Icons.search className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-base font-medium text-muted-foreground">
            {searchTerm ? 'No users found' : 'No data available'}
          </h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            {searchTerm
              ? 'Try a different search term'
              : 'Check back later for updates'}
          </p>
        </div>
      )
    }

    const usersToShow = searchTerm
      ? filteredLeaderboardData
      : filteredLeaderboardData.slice(3)

    if (usersToShow.length === 0 && searchTerm) {
      return (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <Icons.search className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <h3 className="text-base font-medium text-muted-foreground">
            No users found
          </h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Try a different search term
          </p>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-full">
        <CardContent className="px-0 py-0 flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden flex-1">
          {usersToShow.map((score, index) => {
            const position =
              searchTerm && seasonData?.scores
                ? seasonData.scores.findIndex(
                    s => s.user.id === score.user.id
                  ) + 1 || index + 1
                : index + 4

            return (
              <UserListItem
                key={score.user.id}
                score={score as LeaderboardScore}
                position={position}
              />
            )
          })}
        </CardContent>
      </div>
    )
  }, [seasonData, filteredLeaderboardData, searchTerm])

  const handleRefresh = async () => {
    await refetch()
  }

  if (isLoading) {
    return <LeaderboardSkeleton />
  }

  return (
    <Card className="p-2 sm:p-4 h-full flex flex-col w-full max-w-full">
      <div className="flex items-center justify-between w-full px-1 sm:px-2">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
            Leaderboard
          </h1>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {isRefreshLoading ? (
              <Skeleton className="w-8 h-4 rounded-full" />
            ) : (
              <>
                <span className="hidden sm:inline">{seasonData?.name}</span>
                <span className="sm:hidden">{seasonData?.name}</span>
              </>
            )}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isRefreshLoading}
          onClick={handleRefresh}
        >
          <Icons.rotateCcw
            className={cn(
              'w-5 h-5 text-gray-900 dark:text-muted-foreground',
              isRefreshLoading && 'animate-spin'
            )}
          />
        </Button>
      </div>
      <Separator className="my-2 sm:my-4" />
      {renderTopThree}
      <Separator className="my-2 sm:my-4" />
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        isLoading={isSearchLoading}
      />
      <div className="overflow-y-auto flex-1">{renderRemainingUsers}</div>
    </Card>
  )
}
