'use client'

import appLogo from '@/assets/app-logo.png'
import Image from 'next/image'
import SetPasswordForm from './components/set-password-form'

const SetPassword = ({ params }: { params: { token: string } }) => {
  return (
    <div className="p-8">
      <div className="mx-auto flex w-full flex-col sm:w-[550px] h-[70vh] ">
        <div className="flex flex-col my-auto border rounded-lg p-8 pt-1.5">
          <Image
            src={appLogo}
            alt="Logo"
            height={125}
            width={125}
            priority
            className="mt-6"
          />
          <SetPasswordForm
            params={{
              token: params.token
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SetPassword
