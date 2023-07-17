import { useCheckoutSteps } from './checkout-provider'
import { Step1 } from './step-1'
import { Step2 } from './step-2'
import { Step3 } from './step-3'
import { CHECKOUT_STEP_KEY } from './constants'

export const CheckoutSteps = () => {
  const { step, move } = useCheckoutSteps()

  return (
    <>
      {step.key === CHECKOUT_STEP_KEY.STEP_1 && (
        <Step1 onSubmit={() => move()} />
      )}
      {step.key === CHECKOUT_STEP_KEY.STEP_2 && (
        <Step2
          onSubmit={() => {
            move()
          }}
        />
      )}
      {step.key === CHECKOUT_STEP_KEY.STEP_3 && <Step3 />}
    </>
  )
}
