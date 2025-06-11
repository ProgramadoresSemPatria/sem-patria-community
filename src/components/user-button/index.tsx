import avatarImg from '@/assets/avatar.png'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type UserButtonProps = {
  hiddenName?: boolean
}

const UserButton = ({ hiddenName = false }: UserButtonProps) => {
  const { user } = useUser()

  return (
    <div className="flex items-center gap-x-2 m-2 w-full h-full">
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
    </div>
  )
}

export default UserButton
