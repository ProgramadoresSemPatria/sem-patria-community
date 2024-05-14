import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import CreatePostCommentComponent from './components/create-post'
import ForumFilters from './components/filters'
import ForumFeed from './components/forum-feed'

const ForumPage = async () => {
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
    <DefaultLayout>
      <Header title="Forum" />
      <CreatePostCommentComponent />
      <ForumFilters />
      <ForumFeed userId={user?.id} initialPosts={posts || []} />
    </DefaultLayout>
  )
}

export default ForumPage
