import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { SettingsOptions } from './components/settings-options'

type SettingsLayoutProps = {
  children?: React.ReactNode
}

export default async function SettingsLayout({
  children
}: SettingsLayoutProps) {
  return (
    <>
      <div className="container">
        <Header
          title="Settings"
          description="Manage your account settings."
        />
        <Separator className="my-6" />
        <SettingsOptions />
        <div className="mt-8">{children}</div>
      </div>
    </>
  )
}
