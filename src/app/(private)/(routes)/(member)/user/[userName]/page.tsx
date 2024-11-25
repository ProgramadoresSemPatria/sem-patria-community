import { DefaultLayout } from '@/components/default-layout'
import prismadb from '@/lib/prismadb'
import React from 'react'
import UserPosts from './components/UserPosts'
import Loading from '@/app/loading'
import SocialLinks from './components/SocialLinks'
import Header from './components/Header'
import { currentUser, type User } from '@clerk/nextjs/server'

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

  const user: User = JSON.parse(JSON.stringify(await currentUser()))
  if (!profileUser || !user) return <Loading />
  return (
    <DefaultLayout>
      <Header user={profileUser} currentUser={user} />
      <SocialLinks
        email={profileUser.email}
        linkedin={profileUser.linkedin || ''}
        github={profileUser.github || ''}
      />
      <UserPosts posts={profileUser?.posts} userId={profileUser?.id} />
    </DefaultLayout>
  )
}

export default PublicProfile
