'use client'

import EmptyNotesDarkImg from '@/assets/documents-dark.png'
import EmptyNotesImg from '@/assets/documents.png'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { CreateNoteButton } from './create-note-button'

export const EmptyNotes = () => {
  const { resolvedTheme } = useTheme()

  return (
    <Card className="gap-y-4 w-full h-[500px] flex flex-col justify-center items-center">
      <Image
        src={resolvedTheme === 'dark' ? EmptyNotesDarkImg : EmptyNotesImg}
        alt="Empty Note"
        width={300}
        height={300}
      />
      <p className="font-bold">There aren&apos;t notes created yet.</p>
      <CreateNoteButton />
    </Card>
  )
}
