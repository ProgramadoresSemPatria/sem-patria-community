import { DefaultLayout } from '@/components/default-layout'
import Header from '@/components/header'
import NavOptions from '@/components/nav-options'
import { settingOptions } from '@/lib/constants'

type ProfileLayoutProps = {
  children?: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <>
      <DefaultLayout>
        <Header title="Profile" />

        <NavOptions options={settingOptions} />
        <div className="mt-8">{children}</div>
      </DefaultLayout>
    </>
  )
}
