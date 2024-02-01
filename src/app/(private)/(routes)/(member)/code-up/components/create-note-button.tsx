'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useNote } from '@/hooks/note/use-note'
import { usePathname, useRouter } from 'next/navigation'

export const CreateNoteButton = () => {
  const { useCreateNewNote } = useNote()
  const router = useRouter()
  const pathname = usePathname()

  const { mutateAsync: createNewNote, isPending } = useCreateNewNote({
    onSuccess: data => {
      router.push(`${pathname}/${data.id}`)
      toast({
        title: 'Success',
        description: 'The note was created successfully.'
      })
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
    <Button
      disabled={isPending}
      onClick={async () => await handleCreateNewNote()}
    >
      {isPending ? (
        <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Icons.plusCircle className="w-4 h-4 mr-2" />
      )}
      Create a note
    </Button>
  )
}
