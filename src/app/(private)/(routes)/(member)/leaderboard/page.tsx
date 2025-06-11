import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import { getAwardResources } from '@/actions/leaderboard/get-award-resources'
import { getPositionMultipliers } from '@/actions/leaderboard/get-position-multipliers'
import { DefaultLayout } from '@/components/default-layout'
import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import { LeaderboardSkeleton } from '@/components/leaderboard/skeleton'
import { LeaderboardContent } from '@/components/leaderboard/content'
import { PointSystemInfoCard } from '@/components/leaderboard/point-system-info-card'
import { SeasonDates } from '@/components/leaderboard/season-dates'

const Leaderboard = async () => {
  const currentSeason = await getCurrentSeason()

  if (!currentSeason) {
    return (
      <DefaultLayout>
        <div className="mt-4 w-full max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden border border-border/30 rounded-xl shadow-sm">
            <div className="relative flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="relative z-10 flex flex-col items-center space-y-8">
                <div className="relative animate-bounce-slow">
                  <div className="relative rounded-full p-4">
                    <Icons.calendarClock className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <div className="max-w-md animate-fade-in">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground pb-1">
                    No Active Season
                  </h2>
                  <p className="text-base text-muted-foreground mt-2 max-w-md">
                    Check back soon for the next competition round.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }

  const awardResources = await getAwardResources()
  const positionMultipliers = await getPositionMultipliers(currentSeason.id)

  return (
    <DefaultLayout>
      <div className="mt-6 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          <div className="lg:col-span-3 order-2 lg:order-1 h-full">
            <Suspense fallback={<LeaderboardSkeleton />}>
              <LeaderboardContent data={currentSeason} />
            </Suspense>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <Card>
              <CardHeader className="px-6 pb-4">
                <CardTitle className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
                  Prizes
                </CardTitle>
              </CardHeader>

              <CardContent className="px-6 space-y-8">
                {currentSeason.metadata?.awards?.length === 0 && (
                  <div className="text-muted-foreground/70 py-2">
                    No prizes available for this season yet. Stay tuned!
                  </div>
                )}

                {currentSeason.metadata?.awards &&
                  currentSeason.metadata.awards.length > 0 && (
                    <>
                      <ul className="space-y-8">
                        {currentSeason.metadata.awards.map((award, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <Icons.award
                              className={cn(
                                'w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1',
                                award.position.includes('1')
                                  ? 'text-yellow-500'
                                  : award.position.includes('2')
                                    ? 'text-gray-400'
                                    : award.position.includes('3')
                                      ? 'text-orange-500'
                                      : 'text-green-500'
                              )}
                            />
                            <div className="flex-grow">
                              <span className="font-semibold text-lg">
                                {award.position}
                              </span>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                                {award.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <h4 className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
                          Description
                        </h4>
                        <div className="text-sm text-muted-foreground space-y-4">
                          <p>{currentSeason.metadata.description}</p>
                          <SeasonDates
                            initDate={currentSeason.initDate}
                            endDate={currentSeason.endDate}
                          />
                        </div>
                      </div>
                    </>
                  )}
              </CardContent>
            </Card>
            <PointSystemInfoCard
              awardResources={awardResources}
              positionMultipliers={positionMultipliers}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Leaderboard
