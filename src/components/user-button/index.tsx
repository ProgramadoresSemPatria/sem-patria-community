import avatarImg from '@/assets/avatar.png'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type UserButtonProps = {
  hiddenName?: boolean
}

const UserButton = ({ hiddenName = false }: UserButtonProps) => {
  const { user } = useUser()

  return (
    <Link href="/profile" className="flex items-center gap-x-2 m-2">
      <Avatar className="">
        <AvatarImage src={user?.imageUrl || ''} />
        <AvatarFallback>
          <Image src={avatarImg.src} alt="avatar" width={40} height={40} />
        </AvatarFallback>
      </Avatar>
      {!hiddenName && (
        <span className="truncate font-bold text-muted-foreground text-sm">
          {user?.fullName || user?.username}
        </span>
      )}
    </Link>
  )
}

export default UserButton
