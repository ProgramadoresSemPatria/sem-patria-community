import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import React from 'react'
import UserPosts from './components/UserPosts'
import Loading from '@/app/loading'
import UserInterests from './components/UserInterests'
import FollowStats from './components/FollowStats'
import SocialLinks from './components/SocialLinks'
import Header from './components/Header'

type PublicProfileProps = {
  params: {
    userName: string
  }
}

const PublicProfile = async ({ params }: PublicProfileProps) => {
  const user = await prismadb.user?.findFirst({
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
  if (!user) return <Loading />
  return (
    <DefaultLayout>
      <Header user={user} />
      <FollowStats
        followers={user.followers}
        followings={user.followings}
        points={1999}
      />
      <UserInterests
        userInterests={user.interests}
        allInterests={interests}
        userId={user?.id}
      />
      <SocialLinks
        email={user.email}
        linkedin={user.linkedin || ''}
        github={user.github || ''}
      />
      <UserPosts posts={user?.posts} userId={user?.id} />
    </DefaultLayout>
  )
}

export default PublicProfile
