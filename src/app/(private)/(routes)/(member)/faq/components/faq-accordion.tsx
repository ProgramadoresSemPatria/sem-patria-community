'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Icons } from '@/components/icons'
import { faqItems } from '@/lib/constants'
import { cn } from '@/lib/utils'

const FaqAccordion = () => {
  return (
    <div className="flex flex-col gap-3">
      {faqItems.map(item => (
        <Collapsible
          key={item.question}
          className={cn(
            'rounded-lg border transition-colors',
            item.highlight
              ? 'border-amber-400 bg-amber-50 hover:border-amber-500 dark:border-amber-500/40 dark:bg-amber-500/10 dark:hover:border-amber-500/60'
              : 'border-border bg-card hover:border-foreground/20'
          )}
        >
          <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <span className="text-base font-semibold leading-snug">
              {item.question}
            </span>
            <Icons.arrowDown
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="whitespace-pre-line px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

export default FaqAccordion
