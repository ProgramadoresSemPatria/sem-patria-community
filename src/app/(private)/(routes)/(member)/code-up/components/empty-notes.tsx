'use client'

import EmptyNotesDarkImg from '@/assets/documents-dark.png'
import EmptyNotesImg from '@/assets/documents.png'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { CreateNoteButton } from './create-note-button'

export const EmptyNotes = () => {
  const { theme } = useTheme()

  return (
    <Card className="mt-4 gap-y-4 w-full h-full flex flex-col justify-center items-center">
      <Image
        src={theme === 'dark' ? EmptyNotesDarkImg : EmptyNotesImg}
        alt="Empty Note"
        width={300}
        height={300}
      />
      <p className="font-bold">There aren&apos;t notes created yet.</p>
      <CreateNoteButton />
    </Card>
  )
}
