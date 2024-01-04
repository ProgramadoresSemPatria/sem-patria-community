'use client'

import { Modal } from '@/components/ui/modal'
import { usePermissionModal } from '@/hooks/use-modal'
import { appRoutes } from '@/lib/constants'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export const PermissionModal = () => {
  const router = useRouter()
  const { signOut } = useClerk()
  const { isOpen, onClose } = usePermissionModal()

  return (
    <Modal title="" description="" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <h1 className="font-bold text-center text-3xl">Sorry</h1>
        <h3 className="font-medium text-center text-muted-foreground">
          You&apos;re not allowed to access this plataform.
        </h3>
        <p className="text-center text-muted-foreground text-sm pt-2">
          You need be a member of community Programadores Sem Pátria.
        </p>

        <div className="flex flex-col gap-y-2 mt-6">
          <Button
            variant="secondary"
            onClick={async () => {
              await signOut(() => {
                router.push(appRoutes.signIn)
              })
            }}
          >
            Ok, I get it
          </Button>
        </div>
      </div>
    </Modal>
  )
}
