import avatarImg from '@/assets/avatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { type Followers, type Followings } from './useFollowersAndFollowings'

type FollowersAndFollowingModalProps = {
  children: ReactNode
  title: string
  followersOrFollowing: Followers | Followings
}

export const FollowersAndFollowingModal = ({
  children,
  title,
  followersOrFollowing
}: FollowersAndFollowingModalProps) => {
  if (!followersOrFollowing?.length) {
    return children
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
          {followersOrFollowing?.map(user => (
            <li id={user.id} key={user.id}>
              <Link
                href={`/user/${user.username}`}
                className="flex gap-2 items-center group rounded-md py-2 hover:bg-muted transition-all"
              >
                <Avatar className="ml-4">
                  <AvatarImage src={user.imageUrl || ''} />
                  <AvatarFallback>
                    <Image
                      src={avatarImg.src}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  </AvatarFallback>
                </Avatar>

                <span>@{user.username}</span>
              </Link>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
