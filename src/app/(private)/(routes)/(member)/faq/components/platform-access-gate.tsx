'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/icons'
import { CodeUpBackupButton } from '@/components/code-up-backup-button'
import { platformMigration } from '@/lib/constants'

const CHECKBOX_ID = 'faq-understood'
const HINT_ID = 'faq-access-hint'

const PlatformAccessGate = () => {
  const { platformUrl, linkLabel } = platformMigration
  const [hasUnderstood, setHasUnderstood] = useState(false)

  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    setHasUnderstood(checked === true)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-amber-500/40 bg-amber-100/40 p-5 dark:bg-amber-500/5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Pronto para migrar?</h2>
        <p className="text-sm text-muted-foreground">
          Confirme que leu as informações acima para liberar o acesso à nova
          plataforma.
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-md border border-border bg-background/60 p-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            Suas notas do CodeUp não serão migradas.
          </p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Opcional
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Se quiser, baixe um backup do seu conteúdo do CodeUp antes de
          concluir. É opcional e não é necessário para migrar: o arquivo é
          gerado na hora e inclui todas as suas notas.
        </p>
        <CodeUpBackupButton className="mt-1 w-fit" />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id={CHECKBOX_ID}
          checked={hasUnderstood}
          onCheckedChange={handleCheckedChange}
          aria-describedby={hasUnderstood ? undefined : HINT_ID}
        />
        <label
          htmlFor={CHECKBOX_ID}
          className="cursor-pointer select-none text-sm font-medium leading-relaxed"
        >
          Entendi as informações sobre a descontinuação da Community.
        </label>
      </div>

      {hasUnderstood ? (
        <Button asChild size="lg" className="w-fit rounded-full">
          <a href={platformUrl} target="_blank" rel="noopener noreferrer">
            {linkLabel}
            <Icons.redirect className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </Button>
      ) : (
        <div className="flex flex-col gap-1.5">
          <Button
            disabled
            size="lg"
            className="w-fit rounded-full"
            aria-describedby={HINT_ID}
          >
            <Icons.lock className="mr-2 h-4 w-4" aria-hidden="true" />
            {linkLabel}
          </Button>
          <p id={HINT_ID} className="text-xs text-muted-foreground">
            Marque a confirmação acima para liberar o link.
          </p>
        </div>
      )}
    </div>
  )
}

export default PlatformAccessGate
