import type { Metadata } from 'next'
import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import FaqWizard from './components/faq-wizard'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes'
}

export default function FaqPage() {
  return (
    <DefaultLayout>
      <Header title="Perguntas Frequentes" />
      <p className="text-muted-foreground max-w-2xl -mt-2 mb-6 text-sm leading-relaxed">
        Encontre respostas para as principais dúvidas sobre a migração da
        Community e a nova plataforma. Se ainda restar alguma pergunta, confira
        o checklist e as etapas abaixo.
      </p>
      <FaqWizard />
    </DefaultLayout>
  )
}
