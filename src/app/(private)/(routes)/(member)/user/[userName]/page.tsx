import { DefaultLayout } from '@/components/default-layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import prismadb from '@/lib/prismadb'
import { Github, Linkedin, Facebook, Mail } from 'lucide-react'
import React from 'react'
import Post from '../../forum/components/post'
// const FollowButton = ({ isFollowing }: { isFollowing: boolean }) => {
//   const [following, setFollowing] = React.useState(isFollowing)

//   const handleFollowToggle = () => {
//     setFollowing(!following)
//     // You can add your API call here to follow/unfollow the user
//   }

//   return (
//     <Button onClick={handleFollowToggle}>
//       {following ? 'Unfollow' : 'Follow'}
//     </Button>
//   )
// }

type PublicProfileProps = {
  params: {
    userName: string
  }
}
const interests = ['python', 'javascript', 'viagens', 'carros', 'jogos']

const PublicProfile = async ({ params }: PublicProfileProps) => {
  const user = await prismadb.user?.findFirst({
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
  const isFollowing = false
  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
        <div className="flex items-center gap-6 mb-6 border-b pb-4">
          <Avatar className="h-36 w-36">
            {user?.imageUrl ? (
              <AvatarImage src={user?.imageUrl} />
            ) : (
              <AvatarFallback>U</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">@{user?.username}</p>
            <div className="mt-2">
              <Button variant="outline" className="text-sm">
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-around text-center mt-6 mb-4">
          <div>
            <p className="text-xl font-semibold">{user?.followers ?? 0}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{user?.followings ?? 0}</p>
            <p className="text-gray-500">Following</p>
          </div>
          <div>
            <p className="text-xl font-semibold">1999</p>
            <p className="text-gray-500">Points</p>
          </div>
        </div>

        <div className="mt-6 mb-4">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-gray-600">
            Role: <span className="font-semibold">Builder</span>
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Interests</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map((interest, index) => (
              <Badge key={index} className="bg-slate-800 text-white">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" className="flex items-center space-x-2">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="space-y-4">
            {user?.posts.map(post => (
              <Post
                key={post.id}
                categoryName={post.category.name}
                commentAmount={post.comments.length}
                likesAmount={post.likes.length}
                post={post}
                userId={user.id}
              />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default PublicProfile
