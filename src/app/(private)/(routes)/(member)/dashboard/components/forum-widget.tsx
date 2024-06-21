import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { appRoutes } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import Post from '../../forum/components/post'

const ForumWidget = async () => {
  const user = await currentUser()
  const posts = await prismadb.post.findMany({
    take: 10,
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
              Recent posts
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
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-screen overflow-auto">
            <ul className="flex flex-col col-span-2 space-y-6">
              {posts.map(post => (
                <li key={post.id}>
                  <Post
                    userId={user?.id || ''}
                    commentAmount={post.comments.length}
                    post={post}
                    categoryName={post.category.name}
                    likesAmount={post.likes.length}
                    actions={false}
                  />
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForumWidget
