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
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { LeaderboardSkeleton } from './skeleton'
// import { mockLeaderboardData, mockSearchResults } from './mock-data'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  const router = useRouter()
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

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  )

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  const isSearchLoading = isLoadingSearch || isFetchingSearch
  const isRefreshLoading = isLoadingRefresh

  const renderSearchInput = () => (
    <div className="mb-6 relative">
      <Input
        type="text"
        className="w-full pr-10"
        placeholder="🔎  Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Icons.close className="h-4 w-4" />
        </button>
      )}
      {isSearchLoading && searchTerm && (
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <Icons.loader className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  )

  const renderTopThree = useMemo(() => {
    if (!seasonData?.scores) return null

    const topThree = [...seasonData.scores]
      .slice(0, 3)
      .sort((a, b) => b.points - a.points)

    if (topThree.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.users className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">
            Nobody scored
          </h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Be the first to join the leaderboard
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
        {topThree.map((score, index) => {
          const medalIcon =
            index === 0 ? (
              <Icons.award className="w-6 h-6 text-yellow-500" />
            ) : index === 1 ? (
              <Icons.award className="w-6 h-6 text-gray-400" />
            ) : (
              <Icons.award className="w-6 h-6 text-orange-500" />
            )

          return (
            <Card
              key={index}
              onClick={() => {
                router.push(`/user/${score.user.username}`)
              }}
              className={cn(
                'p-4 text-center transition-all duration-500 ease-in-out hover:shadow-xl cursor-pointer transform',
                index === 0
                  ? 'bg-yellow-100 dark:bg-amber-500/20 order-first sm:order-2 sm:scale-110 hover:scale-105 sm:hover:scale-125 hover:bg-yellow-200 dark:hover:bg-amber-500/30'
                  : index === 1
                    ? 'bg-gray-100 dark:bg-gray-900/20 order-2 sm:order-1 sm:self-end hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-900/30'
                    : 'bg-orange-100 dark:bg-orange-900/20 order-3 sm:order-3 sm:self-end hover:scale-105 hover:bg-orange-200 dark:hover:bg-orange-900/30'
              )}
            >
              <span className="relative inline-block mb-1 transition-transform duration-300 hover:scale-110">
                <Avatar className="h-16 w-16 mx-auto ring-2 ring-gray-500/10 transition-all duration-300 hover:ring-4 hover:ring-primary/20">
                  <AvatarImage
                    src={score.user.imageUrl || ''}
                    alt={score.user.name}
                  />
                  <AvatarFallback>{score.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 right-0 block transition-transform duration-300 hover:scale-110">
                  {medalIcon}
                </span>
              </span>

              <div>
                {isLoading ? (
                  <Skeleton className="w-24 h-4 rounded-full" />
                ) : (
                  <h2 className="text-lg font-bold text-primary transition-colors duration-300 hover:text-primary/80">
                    {score.user.name}
                  </h2>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {isLoading ? (
                  <>
                    <Skeleton className="w-24 h-6 rounded-md" />
                    <Skeleton className="w-14 h-6 rounded-md" />
                  </>
                ) : (
                  <>
                    <span className="capitalize inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 transition-all duration-300 hover:bg-gray-100">
                      {score.user.position || 'Member'}
                    </span>
                    <span className="capitalize inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 transition-all duration-300 hover:bg-blue-100">
                      {score.user.level}
                    </span>
                  </>
                )}
              </div>

              {isLoading ? (
                <>
                  <Skeleton className="w-24 h-6 rounded-md" />
                  <Skeleton className="w-8 h-4 rounded-md" />
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold mt-2 text-primary dark:text-primary-foreground transition-all duration-300 hover:scale-105">
                    {score.points} pts
                  </p>
                  <p className="text-sm mt-1 text-muted-foreground dark:text-gray-800 transition-opacity duration-300 hover:opacity-80">
                    {index + 1}º
                  </p>
                </>
              )}
            </Card>
          )
        })}
      </div>
    )
  }, [seasonData, isLoading, router])

  const renderRemainingUsers = useMemo(() => {
    if (!filteredLeaderboardData.length) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Icons.search className="h-10 w-10 text-muted-foreground/50 mb-3" />
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
        <div className="flex flex-col items-center justify-center py-8 text-center">
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
      <CardContent className="px-2 py-0 pb-2 flex flex-col gap-y-4">
        {usersToShow.map((score, index) => {
          const position =
            searchTerm && seasonData?.scores
              ? seasonData.scores.findIndex(s => s.user.id === score.user.id) +
                  1 || index + 1
              : index + 4

          return (
            <Link
              key={score.user.id}
              href={`/user/${score.user.username}`}
              className="flex items-center justify-between p-2 rounded-lg transition-all duration-300 hover:bg-muted/50 group"
            >
              <div className="flex items-center gap-x-3">
                <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                  <span className="text-xs sm:text-sm text-primary dark:text-muted-foreground font-medium transition-colors duration-300 group-hover:text-primary">
                    {position}
                  </span>
                </div>
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-500/10 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/20 group-hover:scale-105">
                  <AvatarImage
                    src={score.user.imageUrl || ''}
                    alt={score.user.name}
                  />
                  <AvatarFallback>{score.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base text-primary dark:text-muted-foreground font-medium transition-colors duration-300 group-hover:text-primary">
                    {score.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80">
                    @{score.user.username}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="flex flex-wrap gap-1 justify-end">
                  <span className="capitalize inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 transition-all duration-300 group-hover:bg-gray-400/20 group-hover:text-gray-300">
                    {score.user.position || 'Member'}
                  </span>
                  <span className="capitalize inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 transition-all duration-300 group-hover:bg-blue-400/20 group-hover:text-blue-300">
                    {score.user.level}
                  </span>
                </div>
                <span className="text-primary dark:text-muted-foreground text-sm sm:text-base font-bold transition-all duration-300 group-hover:scale-105 group-hover:text-primary">
                  {score.points} pts
                </span>
              </div>
            </Link>
          )
        })}
      </CardContent>
    )
  }, [seasonData, filteredLeaderboardData, searchTerm])

  const handleRefresh = async () => {
    await refetch()
  }

  if (isLoading) {
    return <LeaderboardSkeleton />
  }

  return (
    <Card className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-2">
          <h1 className="text-primary dark:text-muted-foreground text-lg sm:text-xl font-semibold">
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
              'w-5 h-5 text-primary dark:text-muted-foreground',
              isRefreshLoading && 'animate-spin'
            )}
          />
        </Button>
      </div>
      <Separator className="my-4" />
      {renderTopThree}
      <Separator className="my-4" />
      {renderSearchInput()}
      <div className="overflow-y-auto flex-1">{renderRemainingUsers}</div>
    </Card>
  )
}
