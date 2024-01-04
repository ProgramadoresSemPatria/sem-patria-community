'use client'

import EmptyNotesDarkImg from '@/assets/documents-dark.png'
import EmptyNotesImg from '@/assets/documents.png'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export const EmptyNotes = () => {
  const { theme } = useTheme()
  return (
    <Card className="mt-4 gap-y-4 w-full h-[calc(100%-5rem)] flex flex-col justify-center items-center">
      <Image
        src={theme === 'dark' ? EmptyNotesDarkImg : EmptyNotesImg}
        alt="Empty Note"
        width={300}
        height={300}
      />
      <p className="font-bold">There aren&apos;t notes created yet.</p>
      <Button>
        <Icons.plus className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </Card>
  )
}
