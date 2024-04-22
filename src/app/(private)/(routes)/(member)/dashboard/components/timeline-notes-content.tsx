import NoteEditor from '@/components/editor/editor'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

const TimelineNotesContent = ({
  content
}: {
  content: string | null | undefined
}) => {
  return (
    <Collapsible className="flex-1">
      <div className="flex justify-center">
        <CollapsibleTrigger asChild>
          <Button className="p-2 gap-1" variant="ghost">
            View note
            <Icons.caretSort className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mb-4">
        {content ? (
          <NoteEditor
            editable={false}
            initialValue={JSON.parse(content) || '{}'}
          />
        ) : (
          <div className="text-center text-gray-500">No content available</div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default TimelineNotesContent
