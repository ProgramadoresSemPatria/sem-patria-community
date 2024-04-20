import prismadb from '@/lib/prismadb'
import React from 'react'
import Post from '../components/post'
import { ExtendedPost } from '@/lib/types'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { CommentComponent } from '../../mentorship/[videoId]/components/comments/comment-component'

interface PostPageProps {
    params:{
        postId: string
    }
}

const PostPage = async ({params}: PostPageProps) => {
    const user = await currentUser() as User
    const post = await prismadb.post.findFirst({
        where:{
            id: params.postId
        },
        include:{
            category: true,
            comments: {
                include:{
                    likes:true,
                    post:true,
                    replies: true,
                    replyTo: true,
                    user: true,
                    video: true
                }
            },
            likes: true,
            user: true
        }
    })
  return (
    <div className='p-8'>
        <Post categoryName={post?.category.name as string} commentAmount={post?.comments.length as number} likesAmount={post?.likes.length as number} post={post as ExtendedPost} userId={user.id} />
        {post?.comments.map((comment) => (
            <CommentComponent comment={comment} />
        ))}
    </div>
  )
}

export default PostPage
