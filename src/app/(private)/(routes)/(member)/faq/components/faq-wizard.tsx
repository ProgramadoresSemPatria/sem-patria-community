'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Icons } from '@/components/icons'
import { platformMigration } from '@/lib/constants'
import FaqAccordion from './faq-accordion'
import PlatformAccessGate from './platform-access-gate'

const STEPS = [
  'O que muda',
  'Perguntas frequentes',
  'Confirmação & acesso'
] as const

const KEY_POINTS = [
  'Cursos, mentoria e comunidade seguem na nova plataforma.',
  'Use o mesmo e-mail para entrar, sem criar nova conta.'
] as const

const FaqWizard = () => {
  const {
    discontinuationDate,
    faqMessage: message,
    supportEmail
  } = platformMigration
  const [beforeDate, afterDate = ''] = message.split('{date}')
  const [currentStep, setCurrentStep] = useState(0)

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === STEPS.length - 1
  const progressValue = ((currentStep + 1) / STEPS.length) * 100

  const handleBack = () => {
    setCurrentStep(step => Math.max(0, step - 1))
  }

  const handleNext = () => {
    setCurrentStep(step => Math.min(STEPS.length - 1, step + 1))
  }

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-medium text-muted-foreground">
              Passo {currentStep + 1} de {STEPS.length}
            </p>
            <p className="text-base font-semibold">{STEPS[currentStep]}</p>
          </div>
          <Progress
            value={progressValue}
            aria-label={`Progresso: passo ${currentStep + 1} de ${
              STEPS.length
            }`}
          />
        </div>

        <div className="min-h-[16rem]">
          {currentStep === 0 && (
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500/15 ring-1 ring-amber-500/40"
                >
                  <Icons.alertTriangle className="h-6 w-6 text-amber-600" />
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">O que está mudando</h2>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {beforeDate}
                    <span className="font-semibold text-foreground">
                      {discontinuationDate}
                    </span>
                    {afterDate} Nas próximas etapas você confere as perguntas
                    frequentes e confirma que entendeu para liberar o acesso à
                    nova plataforma.
                  </p>
                </div>
              </div>
              <ul className="flex flex-col gap-2 text-base text-muted-foreground">
                {KEY_POINTS.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <Icons.checkSimple
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <Icons.checkSimple
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    Dúvidas ou problemas no acesso? Fale com o suporte pelo
                    e-mail{' '}
                    <a
                      href={`mailto:${supportEmail}`}
                      className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                    >
                      {supportEmail}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          )}

          {currentStep === 1 && <FaqAccordion />}

          {currentStep === 2 && <PlatformAccessGate />}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          {isFirstStep ? (
            <span />
          ) : (
            <Button type="button" variant="outline" onClick={handleBack}>
              <Icons.arrowBack className="mr-1 h-4 w-4" aria-hidden="true" />
              Voltar
            </Button>
          )}
          {!isLastStep && (
            <Button type="button" onClick={handleNext}>
              Próximo
              <Icons.arrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FaqWizard
