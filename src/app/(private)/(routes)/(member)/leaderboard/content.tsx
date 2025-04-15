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
// import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { LeaderboardSkeleton } from './skeleton'
import { motion } from 'framer-motion'
// import { mockLeaderboardData, mockSearchResults } from './mock-data'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  // const router = useRouter()
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
        className="w-full pr-10 bg-white/5 backdrop-blur-sm border-primary/20 focus:border-primary/40 transition-all duration-300 focus:scale-[1.01] focus:shadow-lg"
        placeholder="🔎  Search users..."
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
      <div className="relative py-6 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
          {topThree.map((score, index) => (
            <motion.div
              key={score.user.id}
              className={cn('relative', index === 0 && 'md:z-10 md:scale-110')}
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              whileHover={{
                scale: index === 0 ? 1.15 : 1.05,
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              transition={{
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100
              }}
            >
              <div
                className={cn(
                  'relative w-64 h-96 rounded-xl p-4',
                  'bg-gradient-to-br',
                  index === 0
                    ? 'from-yellow-400/20 to-amber-600/20 border-yellow-500/30'
                    : index === 1
                      ? 'from-gray-400/20 to-gray-600/20 border-gray-500/30'
                      : 'from-orange-400/20 to-orange-600/20 border-orange-500/30',
                  'border-2 backdrop-blur-lg'
                )}
              >
                {/* Holographic Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />

                <div className="relative flex flex-col items-center gap-4">
                  <div className="text-xs font-mono opacity-50">
                    #{index + 1}
                  </div>
                  <div className="relative">
                    <Avatar className="w-24 h-24 ring-2 ring-gray-600/20 dark:ring-4 dark:ring-white/10">
                      <AvatarImage
                        src={score.user.imageUrl || ''}
                        alt={score.user.name}
                      />
                      <AvatarFallback className="bg-muted">
                        {score.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        'absolute -bottom-0 -right-0 p-1 rounded-full',
                        index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                            ? 'bg-gray-400'
                            : 'bg-orange-500'
                      )}
                    >
                      <Icons.award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="font-bold text-xl">{score.user.name}</div>
                    <div className="text-sm opacity-70">
                      @{score.user.username}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="text-3xl font-mono font-bold">
                      {score.points}
                      <span className="text-sm ml-1 opacity-70">pts</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="w-full mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Level</span>
                      <span>{score.user.level || 'Member'}</span>
                    </div>
                    {score.user.position && (
                      <div className="flex justify-between text-xs">
                        <span>Position</span>
                        <span>{score.user.position}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }, [seasonData])

  const renderRemainingUsers = useMemo(() => {
    if (
      !filteredLeaderboardData.length ||
      filteredLeaderboardData.length <= 3
    ) {
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
            <motion.div
              key={score.user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{
                x: 10,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                href={`/user/${score.user.username}`}
                className="flex items-center justify-between p-2 rounded-lg transition-all duration-300 hover:bg-muted/90 group"
              >
                <div className="flex items-center gap-x-3">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                    <span className="text-xs sm:text-sm text-primary dark:text-muted-foreground font-medium transition-colors duration-300 group-hover:text-primary">
                      {position}
                    </span>
                  </div>
                  <div className="relative">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-500/10 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/20 group-hover:scale-105">
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
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base text-primary dark:text-white font-medium transition-colors duration-300 group-hover:text-primary">
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
                  <span className="text-primary dark:text-muted-foreground text-sm sm:text-base font-bold transition-all duration-300 group-hover:scale-105 group-hover:text-primary group-hover:rotate-[2deg]">
                    {score.points} pts
                  </span>
                </div>
              </Link>
            </motion.div>
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
