'use client'

import type { CurrentSeasonResponse } from '@/actions/leaderboard/types'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useSeason } from '@/hooks/season/use-season'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  type ChangeEvent
} from 'react'
import { LeaderboardSkeleton } from './skeleton'
import { motion } from 'framer-motion'
// import { mockLeaderboardData, mockSearchResults } from './mock-data'
import { TopThree } from './components/top-three'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  const { useGetCurrentSeason, useSearchLeaderboardUsers } = useSeason()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300) // 300ms debounce
  const [currentPage, setCurrentPage] = useState(1)
  const USERS_PER_PAGE = 7 // Since we show 3 in top, this makes it 10 total

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

  const renderSearchInput = () => (
    <div className="mb-6 relative">
      <Input
        type="text"
        className="w-full pr-10 bg-white/5 backdrop-blur-sm transition-all duration-300 focus:scale-[1.01] focus:shadow-lg"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Icons.close className="h-4 w-4" />
        </button>
      )}
      {isSearchLoading && searchTerm && (
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <Icons.loader className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}
    </div>
  )

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

    // Pagination logic
    const totalPages = Math.ceil(usersToShow.length / USERS_PER_PAGE)
    const startIndex = (currentPage - 1) * USERS_PER_PAGE
    const paginatedUsers = usersToShow.slice(
      startIndex,
      startIndex + USERS_PER_PAGE
    )

    return (
      <div className="flex flex-col h-full">
        <CardContent className="px-2 py-0 pb-2 flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden flex-1">
          {paginatedUsers.map((score, index) => {
            const position =
              searchTerm && seasonData?.scores
                ? seasonData.scores.findIndex(
                    s => s.user.id === score.user.id
                  ) + 1 || index + 1
                : index + 4

            return (
              <motion.div
                key={score.user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  x: 5,
                  scale: 1.01,
                  transition: { type: 'spring', stiffness: 300, damping: 25 }
                }}
                transition={{ duration: 0.15, delay: index * 0.03 }}
              >
                <Link
                  href={`/user/${score.user.username}`}
                  className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-muted/90 group flex-wrap"
                >
                  <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-400 dark:bg-slate-800/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-primary/10">
                      <span className="text-xs sm:text-sm text-white dark:text-muted-foreground transition-colors duration-200 group-hover:text-primary">
                        {position}
                      </span>
                    </div>
                    <div className="relative">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-500/10 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/20">
                        <AvatarImage
                          src={score.user.imageUrl || ''}
                          alt={score.user.name}
                        />
                        <AvatarFallback className="bg-muted">
                          {score.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {position <= 10 && (
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-primary/80">
                          <Icons.award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium transition-colors duration-200 group-hover:text-primary truncate">
                        {score.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80 truncate">
                        @{score.user.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="flex flex-wrap gap-1 justify-end">
                      <span className="capitalize inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-400/20 transition-all duration-200 group-hover:bg-gray-400/20 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        {score.user.position || 'Member'}
                      </span>
                      <span className="capitalize inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 transition-all duration-200 group-hover:bg-blue-400/20 group-hover:text-blue-300">
                        {score.user.level}
                      </span>
                    </div>
                    <span className="text-gray-900 dark:text-muted-foreground text-sm sm:text-base font-bold font-mono transition-all duration-200 group-hover:text-primary">
                      {score.points}
                      <span className="text-xs ml-1 opacity-70">pts</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </CardContent>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-4 mt-2 border-t">
            {currentPage > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1))
                }}
              >
                <Icons.arrowBack className="h-4 w-4" />
              </Button>
            )}
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1))
                }}
              >
                <Icons.arrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }, [seasonData, filteredLeaderboardData, searchTerm, currentPage])

  // Add this effect to reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

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
      {renderSearchInput()}
      <div className="overflow-y-auto flex-1">{renderRemainingUsers}</div>
    </Card>
  )
}
