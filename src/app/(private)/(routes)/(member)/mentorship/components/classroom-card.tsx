import { Icons } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link'

type ClassroomCardProps = {
  title: string
  src: string
  chapters: number
  progress?: number
}

export const ClassroomCard = ({
  title,
  src,
  chapters,
  progress
}: ClassroomCardProps) => {
  const formattedHref = (title: string) => {
    const href: Record<string, string> = {
      'A Base': 'a-base',
      'Programador Sem Pátria': 'psp',
      'Programador Prime': 'prime',
      'Perfil Fechado': 'perfil-fechado'
    }

    return href[title]
  }
  return (
    <Link href={`/mentorship/${formattedHref(title)}`}>
      <Card className="group hover:bg-muted transition overflow-hidden rounded-lg h-80 flex flex-col">
        <CardContent className="flex flex-col h-full p-0">
          <div className="h-1/2">
            <Image
              src={src}
              alt={`${title} image`}
              width={1024}
              height={1024}
              className="h-full w-full rounded-t-lg object-cover"
            />
          </div>
          <div className="h-full p-4 flex flex-col gap-y-2">
            <h1 className="font-semibold flex-wrap overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </h1>
            <div className="flex items-center gap-x-2">
              <Icons.video className="h-4 w-4" color="#6d28d9" />
              <p className="text-sm font-medium text-muted-foreground">
                {chapters} Chapters
              </p>
            </div>
            <div className="mt-auto pb-2 flex items-center gap-x-3">
              <span className="text-muted-foreground text-sm font-medium">
                Progress
              </span>
              <Progress value={progress ?? 0} />
              <span className="text-muted-foreground text-sm font-medium">
                {progress ?? 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
