import { type NotificationProps } from '@/components/top-bar/notifications-button/notifications-list-content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { useNotification } from '@/hooks/notification/use-notification'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type DetailsModalContentProps = {
  content?: NotificationProps
  onClose: () => void
}

const DetailsModalContent = ({
  content,
  onClose
}: DetailsModalContentProps) => {
  const router = useRouter()
  const { approveOrDeclineContent, isPending } = useNotification()

  const handleApproveOrDecline = useCallback(
    async (type: 'approve' | 'reject') => {
      const courseId = content?.courseProps.id

      if (!courseId) return

      try {
        await approveOrDeclineContent({ courseId, type })
        onClose()
        router.refresh()
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          variant: 'destructive'
        })
      }
    },
    [approveOrDeclineContent, content, onClose, router]
  )

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center space-x-8 w-full">
        <div className="space-y-0.5 w-full">
          <Label>Course Name</Label>
          <Input
            readOnly
            className="h-8 cursor-default"
            value={
              (content?.courseProps?.name ?? '').charAt(0).toUpperCase() +
              content?.courseProps?.name.slice(1)
            }
          />
        </div>
        <div className="space-y-0.5 w-full">
          <Label>Course Level</Label>
          <Input
            readOnly
            className="h-8 cursor-default"
            value={
              (content?.courseProps?.level ?? '').charAt(0).toUpperCase() +
              content?.courseProps?.level.slice(1)
            }
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <Label>Course Paid</Label>
          <span className="flex flex-wrap font-medium text-muted-foreground text-xs">
            Option showing if the course is paid or not.
          </span>
        </div>
        <Switch
          checked={content?.courseProps?.isPaid}
          onCheckedChange={() => {}}
          disabled
        />
      </div>

      <div className="space-y-0.5">
        <Label>Course URL</Label>
        <div className="flex items-center gap-x-4">
          <Input
            readOnly
            className="h-8 cursor-default"
            value={content?.courseProps?.courseUrl}
          />
          <Button variant="outline">
            <a
              href={content?.courseProps?.courseUrl}
              target="_blank"
              className="font-medium"
              rel="noreferrer"
            >
              See course
            </a>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <div className="space-y-0.5 w-full">
          <Label>Course Category</Label>
          <Input
            readOnly
            className="h-8 cursor-default"
            value={
              (content?.categoryProps?.name ?? '').charAt(0).toUpperCase() +
              content?.categoryProps?.name.slice(1)
            }
          />
        </div>
        <div className="space-y-0.5 w-full">
          <Label>Requested At</Label>
          <Input
            readOnly
            className="h-8 cursor-default"
            value={format(
              new Date(content?.courseProps?.createdAt ?? new Date()),
              'dd/MM/yyyy'
            )}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center w-full gap-x-4">
        <Button
          disabled={isPending}
          variant="destructive"
          className="ml-auto"
          onClick={async () => {
            await handleApproveOrDecline('reject')
          }}
        >
          Decline
        </Button>
        <Button
          disabled={isPending}
          onClick={async () => {
            await handleApproveOrDecline('approve')
          }}
        >
          Approve
        </Button>
      </div>
    </div>
  )
}

export default DetailsModalContent
