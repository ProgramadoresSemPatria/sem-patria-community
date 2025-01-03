import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { appRoutes } from '@/lib/constants'
import { Icons } from '@/components/icons'

const LeaderboardWidget = () => {
  const topUsers = [
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
    }
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <Link href={appRoutes.leaderboard}>
            <Button
              variant="link"
              className="flex items-center gap-x-2 text-violet-700 p-0"
            >
              See more <Icons.redirect className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium w-4">{index + 1}.</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarURL} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <span className="text-sm font-semibold">{user.points} pts</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LeaderboardWidget
