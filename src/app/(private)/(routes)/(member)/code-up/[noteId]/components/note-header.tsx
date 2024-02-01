'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useNote } from '@/hooks/note/use-note'
import { useNoteStore } from '@/hooks/note/use-note-store'
import { type Note } from '@prisma/client'
import { useRouter } from 'next/navigation'

type NoteHeaderProps = {
  note: Note
}

export const NoteHeader = ({ note }: NoteHeaderProps) => {
  const router = useRouter()
  const { title, content } = useNoteStore()
  const { useSaveChangesNote } = useNote()

  const { mutateAsync: onSaveChangesNote, isPending } = useSaveChangesNote(
    note.id,
    {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Your changes have been saved successfully,'
        })
        router.refresh()
      },
      onError: () => {
        toast({
          title: 'Something went wrong',
          description: 'Please try again.',
          variant: 'destructive'
        })
      }
    }
  )

  const handleSaveChanges = async () => {
    if (!note.id) return

    if (title === '') {
      toast({
        title: 'Title is required',
        description: 'Please enter a title for your note'
      })
      return
    }

    const props = {
      title: title ?? note.title,
      content
    }

    await onSaveChangesNote(props)
  }
  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="ghost"
        disabled={isPending}
        onClick={() => {
          router.back()
          router.refresh()
        }}
      >
        <Icons.arrowBack className="h-4 w-4 mr-1" /> Back
      </Button>
      <Button
        variant="secondary"
        disabled={isPending}
        onClick={handleSaveChanges}
      >
        {isPending && <Icons.loader className="h-4 w-4 mr-2 animate-spin" />}
        Save Changes
      </Button>
    </div>
  )
}
