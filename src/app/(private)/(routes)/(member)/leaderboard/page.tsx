import { DefaultLayout } from '@/components/default-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const Leaderboard = () => {
  const leaderboardData = [
    {
      name: 'John Doe',
      points: 100,
      username: 'johndoe',
      position: 'senior',
      avatarURL: 'https://example.com/john.jpg'
    },
    {
      name: 'Jane Smith',
      points: 85,
      username: 'janesmith',
      position: 'senior',
      avatarURL: 'https://example.com/jane.jpg'
    },
    {
      name: 'Alice Johnson',
      points: 70,
      username: 'alicejohnson',
      position: 'Pleno',
      avatarURL: 'https://example.com/alice.jpg'
    },
    {
      name: 'Bob Brown',
      points: 65,
      username: 'bobbrown',
      position: 'Pleno',
      avatarURL: 'https://example.com/bob.jpg'
    },
    {
      name: 'Charlie Davis',
      points: 50,
      username: 'charliedavis',
      position: 'junior',
      avatarURL: 'https://example.com/charlie.jpg'
    },
    {
      name: 'Arthur Morgan',
      points: 45,
      username: 'arthurmorgan',
      position: 'junior',
      avatarURL: 'https://example.com/arthur.jpg'
    }
  ]

  const renderTopThree = () => {
    const topThree = leaderboardData
      .slice(0, 3)
      .sort((a, b) => b.points - a.points)

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
        {topThree.map((user, index) => {
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
              className={`p-4 text-center transition-all duration-300 ease-in-out hover:shadow-lg ${
                index === 0
                  ? 'bg-yellow-100 order-first sm:order-2 transform sm:scale-110 hover:scale-105 sm:hover:scale-125'
                  : index === 1
                    ? 'bg-gray-100 order-2 sm:order-1 sm:self-end hover:scale-105'
                    : 'bg-orange-100 order-3 sm:order-3 sm:self-end hover:scale-105'
              }`}
            >
              <span className="relative inline-block mb-1">
                <Avatar className="h-16 w-16 mx-auto ring-2 ring-gray-500/10">
                  <AvatarImage src={user.avatarURL} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 right-0 block">
                  {medalIcon}
                </span>
              </span>

              <h2 className="text-lg font-bold text-primary dark:text-primary-foreground">
                {user.name}
              </h2>
              <span className="capitalize inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                {user.position || 'Member'}
              </span>
              <p className="text-2xl font-bold mt-2 text-primary dark:text-primary-foreground">
                {user.points} pts
              </p>
              <p className="text-sm mt-1 text-muted-foreground dark:text-gray-800">
                {index + 1}º
              </p>
            </Card>
          )
        })}
      </div>
    )
  }

  const renderRemainingUsers = () => (
    <CardContent className="px-2 py-0 pb-2 flex flex-col gap-y-4">
      {leaderboardData.slice(3).map((user, index) => (
        <div key={index + 3} className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-xs sm:text-sm text-primary dark:text-muted-foreground font-medium">
                {index + 4}
              </span>
            </div>
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-500/10">
              <AvatarImage src={user.avatarURL} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-2">
              <span className="text-sm sm:text-base text-primary dark:text-muted-foreground font-medium">
                {user.name}
              </span>
              <span className="capitalize inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                {user.position || 'Member'}
              </span>
            </div>
          </div>
          <span className="text-primary dark:text-muted-foreground text-sm sm:text-base font-bold">
            {user.points}
          </span>
        </div>
      ))}
    </CardContent>
  )

  return (
    <DefaultLayout>
      <Card className="mt-4 p-4 w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between w-full px-2 mb-4">
          <h1 className="text-primary dark:text-muted-foreground text-lg sm:text-xl font-semibold">
            Leaderboard
          </h1>
          <Button type="button" variant="ghost" size="icon">
            <Icons.rotateCcw className="w-6 h-6 text-primary dark:text-muted-foreground" />
          </Button>
        </div>
        <Separator className="my-4" />
        {renderTopThree()}
        <Separator className="my-4" />
        {renderRemainingUsers()}
      </Card>
    </DefaultLayout>
  )
}

export default Leaderboard
