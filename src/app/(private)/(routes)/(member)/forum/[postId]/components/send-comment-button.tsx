import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
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
      disabled={isPending}
      className="w-fit dark:bg-slate-900 bg-slate-100 dark:text-white text-black gap-1 hover:bg-slate-900/70"
      onClick={handleSendComment}
    >
      {isPending ? (
        <>
          <Icons.loader className="h-4 w-4 mr-2 animate-spin" />{' '}
          {loadingPlaceholder}
        </>
      ) : (
        <>
          <Icons.send className="w-4 h-4" /> {placeholder}
        </>
      )}
    </Button>
  )
}

export default SendCommentButton
