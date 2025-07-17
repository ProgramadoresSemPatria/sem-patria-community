import { toast } from "@/components/ui/use-toast"
import { useNote } from "@/hooks/note/use-note"
import { type ExtendedNote } from "@/lib/types"
import { useReducer } from "react"

type UseNoteSupportsProps = {
    note: ExtendedNote
    loggedInUserId: string
}


export const useNoteSupports = ({ note, loggedInUserId }: UseNoteSupportsProps) => {
    const { useSupportNote } = useNote()

    const [supportState, dispatch] = useReducer(
        (state: { supports: number; supported: boolean }, action: { type: string }) => {
            switch (action.type) {
                case 'SUPPORT':
                    return { ...state, supported: true, supports: state.supports + 1 }
                case 'UNSUPPORT':
                    return { ...state, supported: false, supports: state.supports - 1 }
                default:
                    return state
            }
        },
        {
            supports: note.supports.length,
            supported: note.supports.some(
                support => support.userId === loggedInUserId && support.noteId === note.id
            )
        }
    )

    const { mutateAsync: onSupportNote, isPending } = useSupportNote(note.id, {
        onSuccess: () => {
            dispatch({ type: supportState.supported ? 'UNSUPPORT' : 'SUPPORT' })
        },
        onError: (error) => {
            console.error('Error toggling support', error)
            toast({
                title: 'Error',
                description: 'An error occurred while toggling support, try again.',
                variant: 'destructive'
            })
        }
    })

    const handleSupport = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        try {
            await onSupportNote()
        } catch (error) {
            console.error('Error toggling support', error)
        }
    }

    return { handleSupport, supportState, isPending }
}