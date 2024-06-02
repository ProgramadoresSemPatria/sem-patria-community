'use client'
import useMainForm from './use-main-form'

interface MainFormProps {
  redirectUrl: string
}

const MainForm = ({ redirectUrl }: MainFormProps) => {
  const { activeStep, formSteps } = useMainForm({
    redirectUrl
  })

  return (
    <div className="flex flex-col space-y-4 text-center my-auto">
      {formSteps[activeStep]}
    </div>
  )
}

export default MainForm
