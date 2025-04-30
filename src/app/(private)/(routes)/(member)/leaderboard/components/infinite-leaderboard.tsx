import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useInView } from 'react-intersection-observer'
import { useSeason } from '@/hooks/season/use-season'
import { useDebounce } from '@/hooks/use-debounce'
import { UserListItem } from './user-list-item'
import { SearchInput } from './search-input'
import { Icons } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { SearchLeaderboardUsersApiProps } from '@/hooks/season/types'
import type { Positions } from '@prisma/client'

interface InfiniteLeaderboardProps {
  initialData: SearchLeaderboardUsersApiProps
}

export const InfiniteLeaderboard = ({
  initialData
}: InfiniteLeaderboardProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 600)
  const { useInfiniteLeaderboardUsers } = useSeason()
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteLeaderboardUsers(debouncedSearchTerm, 10, {
    initialData: {
      pages: [initialData],
      pageParams: [0]
    }
  })

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px'
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  const allUsers = data?.pages.flatMap(page => page.users) || []
  const usersToShow = searchTerm ? allUsers : allUsers.slice(3)

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Icons.help className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-base font-medium text-destructive">
          Error loading leaderboard
        </h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Please try again later
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
        className="flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden flex-1 max-h-[400px]"
      >
        {usersToShow.map((score, index) => (
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
        {isFetchingNextPage && (
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
        )}
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
        {!hasNextPage && usersToShow.length > 0 && (
          <div className="flex items-center justify-center py-4 text-muted-foreground/70">
            <span className="text-xs">No more users to load</span>
          </div>
        )}
        {!isLoading && usersToShow.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icons.search className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-base font-medium text-muted-foreground">
              No users found
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
