'use client'

import EmptyNotesDarkImg from '@/assets/documents-dark.png'
import EmptyNotesImg from '@/assets/documents.png'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { useNote } from '@/hooks/note/use-note'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export const EmptyNotes = () => {
  const { theme } = useTheme()
  const { useCreateNewNote } = useNote()
  const router = useRouter()
  const pathname = usePathname()

  const { mutateAsync: createNewNote, isPending } = useCreateNewNote({
    onSuccess: data => {
      toast({
        title: 'Success',
        description: 'The note was created successfully.'
      })
      router.push(`${pathname}/${data.id}`)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the note, try again.',
        variant: 'destructive'
      })
    }
  })

  const handleCreateNewNote = async () => await createNewNote()

  return (
    <Card className="mt-4 gap-y-4 w-full h-[calc(100%-5rem)] flex flex-col justify-center items-center">
      <Image
        src={theme === 'dark' ? EmptyNotesDarkImg : EmptyNotesImg}
        alt="Empty Note"
        width={300}
        height={300}
      />
      <p className="font-bold">There aren&apos;t notes created yet.</p>
      <Button
        disabled={isPending}
        onClick={async () => await handleCreateNewNote()}
      >
        {isPending ? (
          <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Icons.plus className="w-4 h-4 mr-2" />
        )}
        Create a note
      </Button>
    </Card>
  )
}
