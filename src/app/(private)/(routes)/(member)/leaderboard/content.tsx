'use client'

import type { CurrentSeasonResponse } from '@/actions/leaderboard/types'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useSeason } from '@/hooks/season/use-season'
import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  const { useGetCurrentSeasonServer } = useSeason()
  const [searchTerm, setSearchTerm] = useState('')
  const [isRefetchSeason, setIsRefetchSeason] = useState(false)

  const { data: currentSeason, isFetched } = useGetCurrentSeasonServer({
    queryKey: ['getCurrentSeason'],
    enabled: isRefetchSeason
  })

  const seasonData = currentSeason || data

  useEffect(() => {
    if (isFetched) {
      setIsRefetchSeason(false)
    }
  }, [isFetched])

  const filteredLeaderboardData = useMemo(() => {
    if (!seasonData) return []

    return (
      seasonData.scores.filter(
        score =>
          score.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          score.user.username.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    )
  }, [searchTerm, seasonData])

  const renderSearchInput = () => (
    <div className="mb-6">
      <Input
        clearable
        type="text"
        className="w-full"
        placeholder="🔎  Search users..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value)
        }}
      />
    </div>
  )

  const renderTopThree = useMemo(() => {
    if (!seasonData) return null

    const topThree = seasonData.scores
      .slice(0, 3)
      .sort((a, b) => b.points - a.points)

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
              className={cn(
                'p-4 text-center transition-all duration-300 ease-in-out hover:shadow-lg',
                index === 0
                  ? 'bg-yellow-100 dark:bg-amber-500 order-first sm:order-2 transform sm:scale-110 hover:scale-105 sm:hover:scale-125'
                  : index === 1
                    ? 'bg-gray-100 dark:bg-gray-900 order-2 sm:order-1 sm:self-end hover:scale-105'
                    : 'bg-orange-100 dark:bg-orange-900 order-3 sm:order-3 sm:self-end hover:scale-105'
              )}
            >
              <span className="relative inline-block mb-1">
                <Avatar className="h-16 w-16 mx-auto ring-2 ring-gray-500/10">
                  <AvatarImage
                    src={score.user.imageUrl || ''}
                    alt={score.user.name}
                  />
                  <AvatarFallback>{score.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 right-0 block">
                  {medalIcon}
                </span>
              </span>

              <h2 className="text-lg font-bold text-primary">
                {score.user.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="capitalize inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {score.user.position || 'Member'}
                </span>
                <span className="capitalize inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {score.user.level}
                </span>
              </div>

              <p className="text-2xl font-bold mt-2 text-primary dark:text-primary-foreground">
                {score.points} pts
              </p>
              <p className="text-sm mt-1 text-muted-foreground dark:text-gray-800">
                {index + 1}º
              </p>
            </Card>
          )
        })}
      </div>
    )
  }, [seasonData])

  const renderRemainingUsers = useMemo(() => {
    if (!seasonData) return null

    return (
      <CardContent className="px-2 py-0 pb-2 flex flex-col gap-y-4">
        {(searchTerm
          ? filteredLeaderboardData
          : filteredLeaderboardData.slice(3)
        ).map((score, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm text-primary dark:text-muted-foreground font-medium">
                  {index + 1}
                </span>
              </div>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-500/10">
                <AvatarImage
                  src={score.user.imageUrl || ''}
                  alt={score.user.name}
                />
                <AvatarFallback>{score.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base text-primary dark:text-muted-foreground font-medium">
                  {score.user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  @{score.user.username}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="flex flex-wrap gap-1 justify-end">
                <span className="capitalize inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                  {score.user.position || 'Member'}
                </span>
                <span className="capitalize inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
                  {score.user.level}
                </span>
              </div>
              <span className="text-primary dark:text-muted-foreground text-sm sm:text-base font-bold">
                {score.points} pts
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    )
  }, [seasonData, filteredLeaderboardData, searchTerm])

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between w-full px-2 mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-primary dark:text-muted-foreground text-lg sm:text-xl font-semibold">
            Leaderboard
          </h1>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            <span className="hidden sm:inline">{data?.name}</span>
            <span className="sm:hidden">{data?.name}</span>
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsRefetchSeason(true)
          }}
        >
          <Icons.rotateCcw className="w-5 h-5 text-primary dark:text-muted-foreground" />
        </Button>
      </div>
      <Separator className="my-4" />
      {renderTopThree}
      <Separator className="my-4" />
      {renderSearchInput()}
      {renderRemainingUsers}
    </Card>
  )
}
