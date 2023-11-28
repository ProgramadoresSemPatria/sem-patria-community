import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { Suspense } from 'react'

const SettingsPage = () => {
  return (
    <>
      <Suspense fallback={<Icons.loader className="h-6 w-6 animate-spin" />}>
        <Header title="User" />
      </Suspense>
    </>
  )
}

export default SettingsPage
