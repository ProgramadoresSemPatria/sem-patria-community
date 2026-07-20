import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { IS_READ_ONLY } from '@/lib/read-only'
interface SendCommentButtonProps {
  isPending: boolean
  handleSendComment: () => void
  isReply?: boolean
}

const SendCommentButton = ({
  isPending,
  handleSendComment,
  isReply = false
}: SendCommentButtonProps) => {
  const placeholder = isReply ? 'Send' : 'Comment'

  const loadingPlaceholder = isReply ? 'Sending' : 'Sending comment'

  return (
    <Button
      disabled={isPending || IS_READ_ONLY}
      title={IS_READ_ONLY ? 'Somente leitura durante a migração' : undefined}
      className="w-fit"
      onClick={handleSendComment}
    >
      {isPending ? (
        <>
          <Icons.loader className="h-4 w-4 mr-1 animate-spin" />{' '}
          {loadingPlaceholder}
        </>
      ) : (
        <>
          <Icons.send className="w-4 h-4 mr-1" /> {placeholder}
        </>
      )}
    </Button>
  )
}

export default SendCommentButton
