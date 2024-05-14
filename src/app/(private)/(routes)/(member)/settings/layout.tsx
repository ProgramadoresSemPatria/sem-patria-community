import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import NavOptions from '@/components/nav-options'
import { settingOptions } from '@/lib/constants'

type SettingsLayoutProps = {
  children?: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <DefaultLayout>
        <Header title="Settings" />

        <NavOptions options={settingOptions} />
        <div className="mt-8">{children}</div>
      </DefaultLayout>
    </>
  )
}
