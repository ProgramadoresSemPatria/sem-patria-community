import { Icons } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import type { SearchLeaderboardUsersApiProps } from '@/hooks/season/types'
import { useSeason } from '@/hooks/season/use-season'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import type { Positions } from '@prisma/client'
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useInView } from 'react-intersection-observer'
import { InfiniteLeaderboardEmptyState } from './infinite-leaderboard-empty-state'
import { SearchInput } from './search-input'
import { SearchUsersSkeleton } from './search-users-skeleton'
import { UserListItem } from './user-list-item'

interface InfiniteLeaderboardProps {
  initialData: SearchLeaderboardUsersApiProps
}

export const InfiniteLeaderboard = ({
  initialData
}: InfiniteLeaderboardProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 600)
  const { useInfiniteLeaderboardUsers, useSearchUsersInCurrentSeason } =
    useSeason()
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
    isError: isInfiniteError,
    error: infiniteError
  } = useInfiniteLeaderboardUsers('', 10, {
    initialData: {
      pages: [initialData],
      pageParams: [0]
    },
    enabled: !debouncedSearchTerm
  })

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError
  } = useSearchUsersInCurrentSeason(debouncedSearchTerm)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px'
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !debouncedSearchTerm) {
      void fetchNextPage()
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    debouncedSearchTerm
  ])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  const allUsers = useMemo(() => {
    if (debouncedSearchTerm) {
      return searchData?.users || []
    }
    return infiniteData?.pages.flatMap(page => page.users) || []
  }, [debouncedSearchTerm, searchData?.users, infiniteData?.pages])

  const usersToShow = useMemo(
    () => (searchTerm ? allUsers : allUsers.slice(3)),
    [searchTerm, allUsers]
  )

  const isLoading = debouncedSearchTerm ? isSearchLoading : isInfiniteLoading
  const isError = debouncedSearchTerm ? isSearchError : isInfiniteError
  const error = debouncedSearchTerm ? searchError : infiniteError

  const renderSkeleton = useCallback(() => {
    return (
      <div className="flex flex-col gap-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-lg"
          >
            <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0 flex-1">
              <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    )
  }, [])

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Icons.help className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-base font-medium text-destructive">
          Error loading leaderboard
        </h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          {error instanceof Error ? error.message : 'Please try again later'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        isLoading={isLoading}
      />
      <div
        ref={containerRef}
        className="flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden flex-1"
      >
        {isLoading && debouncedSearchTerm && <SearchUsersSkeleton />}

        {!isLoading &&
          usersToShow.map((score, index) => (
            <UserListItem
              key={`${score.user.id}-${index}`}
              score={{
                id: score.userId,
                userId: score.userId,
                points: score.points,
                seasonId: '',
                user: {
                  ...score.user,
                  position: score.user.position as Positions | null
                }
              }}
              position={index + (searchTerm ? 1 : 4)}
            />
          ))}

        {isFetchingNextPage && !debouncedSearchTerm && renderSkeleton()}

        <div
          ref={ref}
          className={cn(
            'flex items-center justify-center py-4',
            !hasNextPage && 'hidden'
          )}
        >
          {hasNextPage && !isFetchingNextPage && (
            <div className="flex items-center gap-2 text-muted-foreground/70">
              <Icons.arrowDown className="h-4 w-4 animate-bounce" />
              <span className="text-xs">Scroll to load more</span>
            </div>
          )}
        </div>
        {!hasNextPage && usersToShow.length > 0 && !debouncedSearchTerm && (
          <div className="flex items-center justify-center py-4 text-muted-foreground/70">
            <span className="text-xs">No more users to load</span>
          </div>
        )}
        {!isLoading &&
          usersToShow.length === 0 &&
          (searchTerm ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Icons.search className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-base font-medium text-muted-foreground">
                User not found
              </h3>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <InfiniteLeaderboardEmptyState />
          ))}
      </div>
    </div>
  )
}
