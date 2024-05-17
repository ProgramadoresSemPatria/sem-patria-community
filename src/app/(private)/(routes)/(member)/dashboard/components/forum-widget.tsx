import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import ForumFeed from '../../forum/components/forum-feed'

const ForumWidget = async () => {
  const user = await currentUser()
  const posts = await prismadb.post.findMany({
    include: {
      category: true,
      comments: true,
      likes: true,
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg font-semibold">Forum</h2>
      <Card className="flex-1">
        <CardHeader className="flex flex-col gap-y-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Icons.forum className="w-5 h-5" />
              Recent posts of our members
            </div>
            <div>
              <Link href={appRoutes.forum}>
                <Button
                  variant="link"
                  className="flex items-center gap-x-2 text-violet-700 p-0"
                >
                  Share something <Icons.redirect className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardTitle>
          <div className="flex items-center gap-x-2 w-full overflow-x-auto">
            <Button
              variant="outline"
              className="flex w-fit hover:bg-transparent items-center justify-between border-dashed cursor-default gap-x-2"
            >
              <Icons.layers className=" h-4 w-4 shrink-0 opacity-50" />
              <span>Category</span>
              <span className="text-xs text-muted-foreground">|</span>
              <Badge className="bg-slate-900 hover:bg-slate-900 text-white">
                All
              </Badge>
            </Button>

            <Button
              variant="outline"
              className="flex w-fit hover:bg-transparent items-center justify-between border-dashed cursor-default gap-x-2"
            >
              <Icons.arrowUpDown className="h-4 w-4 shrink-0 opacity-50" />
              <span>Order by</span>
              <span className="text-xs text-muted-foreground">|</span>
              <Badge className="bg-slate-900 hover:bg-slate-900 text-white">
                News
              </Badge>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-80 relative overflow-y-auto">
          <ForumFeed userId={user?.id} initialPosts={posts || []} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ForumWidget
