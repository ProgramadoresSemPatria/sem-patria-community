import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import Link from 'next/link'

const TimelineNotesContent = ({
  content,
  noteId
}: {
  content: string | null | undefined
  noteId: string
}) => {
  return (
    <Collapsible className="relative max-w-lg">
      <div className="flex justify-center">
        <CollapsibleTrigger asChild>
          <Button className="p-2 gap-1" variant="ghost">
            Preview note
            <Icons.caretSort className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mb-4">
        {content ? (
          <div className="flex flex-col gap-2">
            <div className="relative max-h-[600px] overflow-hidden">
              <NoteEditor
                editable={false}
                initialValue={JSON.parse(content) || '{}'}
                variant="readonly"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 from-10% to-50%" />
            </div>
            <Link
              href={`/code-up/${noteId}/public-note`}
              className="p-1 text-muted-foreground underline self-center"
            >
              View full note
            </Link>
          </div>
        ) : (
          <div className="text-center text-gray-500">No content available</div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default TimelineNotesContent
