import Header from '@/components/header'
import NavOptions from '@/components/nav-options'
import { Separator } from '@/components/ui/separator'
import { settingOptions } from '@/lib/constants'

type SettingsLayoutProps = {
  children?: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="container pt-6">
        <Header title="Settings" description="Manage your account settings." />
        <Separator className="my-6" />
        <NavOptions options={settingOptions} />
        <div className="mt-8">{children}</div>
      </div>
    </>
  )
}
