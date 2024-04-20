import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import React from 'react'
import CreatePostCommentComponent from './components/create-post'
import ForumFeed from './components/forum-feed'
import ForumFilters from './components/filters'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'

const ForumPage = async ({ params }: { params: { category: string } }) => {
  const user = await currentUser()
  // console.log('category', params)
  const posts = await prismadb.post.findMany({
    include: {
      category: true,
      comments: true,
      likes: true,
      user: true
    }
  })
  // console.log(category?.posts)
  return (
    <DefaultLayout>
      <Header title="Forum" />
      <CreatePostCommentComponent />
      <ForumFilters />
      <ForumFeed
        userId={user?.id}
        initialPosts={posts || []}
        categoryName={params.category}
      />
    </DefaultLayout>
  )
}

export default ForumPage
