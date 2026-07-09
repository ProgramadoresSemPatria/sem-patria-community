import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

const CODEUP_EXPORT_ENDPOINT = '/api/note/export'

type CodeUpBackupButtonProps = {
  label?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  className?: string
}

export const CodeUpBackupButton = ({
  label = 'Baixar backup do CodeUp',
  variant = 'outline',
  className
}: CodeUpBackupButtonProps) => {
  return (
    <Button asChild variant={variant} className={cn('gap-2', className)}>
      <a href={CODEUP_EXPORT_ENDPOINT} download>
        <Icons.download className="h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}

export default CodeUpBackupButton
