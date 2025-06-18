import CreatePostCommentComponent from '@/app/(private)/(routes)/(member)/forum/components/create-post'
import Loading from '@/app/loading'
import { DefaultLayout } from '@/components/default-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import prismadb from '@/lib/prismadb'
import { currentUser, type User } from '@clerk/nextjs/server'
import Header from './components/Header'
import ScoreActivity from './components/score-activity'
import SocialLinks from './components/SocialLinks'
import UserInterests from './components/UserInterests'
import UserPosts from './components/UserPosts'

type PublicProfileProps = {
  params: {
    userName: string
  }
}

const PublicProfile = async ({ params }: PublicProfileProps) => {
  const profileUser = await prismadb.user?.findFirst({
    where: {
      username: params.userName
    },
    include: {
      interests: true,
      posts: {
        include: {
          category: true,
          likes: true,
          comments: true,
          user: true
        }
      }
    }
  })

  const interests = await prismadb.interest.findMany()

  const user: User = JSON.parse(JSON.stringify(await currentUser()))

  if (!profileUser || !user) return <Loading />

  return (
    <DefaultLayout>
      <Header user={profileUser} currentUser={user} />

      <UserInterests
        allInterests={interests}
        profileUserId={profileUser.id}
        currentUserId={user.id}
      />
      <SocialLinks
        email={profileUser.email}
        linkedIn={profileUser.linkedin || ''}
        github={profileUser.github || ''}
        showEmail={profileUser.isPublicEmail || false}
      />
      {user.id === profileUser.id ? (
        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts" className="w-32">
              Posts
            </TabsTrigger>
            <TabsTrigger value="score-activity" className="w-32">
              Score Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <CreatePostCommentComponent />
            <UserPosts posts={profileUser?.posts} loggedInUserId={user.id} />
          </TabsContent>
          <TabsContent value="score-activity">
            <ScoreActivity userId={user.id} />
          </TabsContent>
        </Tabs>
      ) : (
        <UserPosts posts={profileUser?.posts} loggedInUserId={user.id} />
      )}
    </DefaultLayout>
  )
}

export default PublicProfile
