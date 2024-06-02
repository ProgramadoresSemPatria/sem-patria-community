import { useMemo, useState } from 'react'
import PasswordRecoveryForm from '../password-recovery-form'
import UserAuthForm from '../user-auth-form'

interface UseMainFormProps {
  redirectUrl: string
}

const useMainForm = ({ redirectUrl }: UseMainFormProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const formSteps = useMemo(
    () => [
      <UserAuthForm
        key="user-auth"
        setActiveStep={setActiveStep}
        redirectUrl={redirectUrl}
      />,
      <PasswordRecoveryForm
        key="password-recovery"
        setActiveStep={setActiveStep}
      />
    ],
    [redirectUrl]
  )

  return {
    activeStep,
    setActiveStep,
    formSteps
  }
}

export default useMainForm
