import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import UserPosts from './components/UserPosts'
import Loading from '@/app/loading'
import SocialLinks from './components/SocialLinks'
import Header from './components/Header'
import CreatePostCommentComponent from '@/app/(private)/(routes)/(member)/forum/components/create-post'
import { currentUser, type User } from '@clerk/nextjs/server'
import UserInterests from './components/UserInterests'

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
        userInterests={profileUser?.interests}
        allInterests={interests}
        profileUserId={profileUser.id}
        currentUserId={user.id}
      />
      <SocialLinks
        email={profileUser.email}
        linkedin={profileUser.linkedin || ''}
        github={profileUser.github || ''}
        showEmail={profileUser.isPublicEmail || false}
      />
      <CreatePostCommentComponent />
      <UserPosts posts={profileUser?.posts} userId={profileUser?.id} />
    </DefaultLayout>
  )
}

export default PublicProfile
