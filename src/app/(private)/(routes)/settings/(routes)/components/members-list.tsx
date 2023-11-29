import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import avatarImg from '@/assets/avatar.png'
import { Badge } from '@/components/ui/badge'

export const MembersList = () => {
  return (
    <div className="mt-6 w-full max-w-3xl flex flex-col gap-y-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarImg.src} />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">@sofiadev</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <Badge className="text-gray-200 bg-violet-800 hover:bg-violet-800 transition-colors ease-in">
            Junior
          </Badge>
          <Button variant="outline" disabled>
            Member
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarImg.src} />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Jackson Lee</p>
            <p className="text-sm text-muted-foreground">@jaackle</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <Badge className="text-gray-200 bg-violet-900 hover:bg-violet-900 transition-colors ease-in">
            Pleno
          </Badge>
          <Button variant="outline" disabled>
            Admin
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarImg.src} />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Jackson Lee</p>
            <p className="text-sm text-muted-foreground">@jaackle</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <Badge className="text-gray-200 bg-violet-950 hover:bg-violet-950 transition-colors ease-in">
            Senior
          </Badge>
          <Button variant="outline" disabled>
            Admin
          </Button>
        </div>
      </div>
    </div>
  )
}
