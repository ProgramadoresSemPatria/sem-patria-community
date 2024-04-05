import SetPasswordForm from './components/set-password-form'

const SetPassword = ({ params }: { params: { token: string } }) => {
  return (
    <div className="p-8">
      <div className="mx-auto flex w-full flex-col sm:w-[550px] h-[70vh] ">
        <div className="flex flex-col  my-auto border rounded-lg p-8 pt-1.5">
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
