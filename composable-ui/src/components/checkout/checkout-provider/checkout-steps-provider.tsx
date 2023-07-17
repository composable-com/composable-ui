import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/router'

export interface CheckoutLayoutStep {
  key: string
  hash: string
  isAllowed: boolean
  position: number
  title: string
}

export interface CheckoutLayoutContext {
  step: CheckoutLayoutStep
  move: () => void
  goTo: (step: string) => void
  steps: CheckoutLayoutStep[]
}

export interface CheckoutLayoutProps {
  children: JSX.Element
  initialSteps: CheckoutLayoutStep[]
  onStepChange?: (step: CheckoutLayoutStep) => void
}

export const CheckoutStepsProvider = ({
  children,
  initialSteps,
  onStepChange,
}: CheckoutLayoutProps) => {
  const router = useRouter()
  const [steps, setSteps] = useState(initialSteps)
  const currentStep = useMemo(
    () => steps.find((step) => step.hash === router.query.step) ?? steps[0],
    [steps, router]
  )
  const onStepChangeRef = useRef(onStepChange)
  onStepChangeRef.current = onStepChange

  const move = useCallback(async () => {
    const nextStepIndex = (steps.indexOf(currentStep) ?? 0) + 1
    const nextStep = steps[nextStepIndex] ?? undefined
    if (!nextStep) {
      return
    }

    setSteps((stepsState) => {
      const nextState = [...stepsState]
      nextState[nextStepIndex] = {
        ...nextState[nextStepIndex],
        isAllowed: true,
      }

      return nextState
    })

    router.push(
      {
        query: { step: nextStep.hash },
      },
      undefined,
      {
        shallow: true,
      }
    )

    window.scrollTo(0, 0)
  }, [router, currentStep, steps, setSteps])

  const goTo = useCallback(
    async (step: string) => {
      const targetStep = steps.find((s) => s.hash === step)
      if (!targetStep) return
      router.push(
        {
          query: { step },
        },
        undefined,
        {
          shallow: true,
        }
      )

      window.scrollTo(0, 0)
    },
    [router, steps]
  )

  // Validate the current step
  useEffect(() => {
    const index = steps.indexOf(currentStep) ?? 0

    if (index === 0) {
      return
    }

    const prevStep = steps[index - 1]
    if (!currentStep.isAllowed) {
      router.push({
        query: { step: prevStep.hash },
      })
    }
  }, [steps, currentStep, router])

  // Do not allow to go back once the last step was loaded
  useEffect(() => {
    const lastStepIndex = initialSteps.length - 1
    if (currentStep.key !== initialSteps[lastStepIndex].key) {
      return
    }

    setSteps(() => {
      const newState = [...initialSteps]
      newState[lastStepIndex].isAllowed = true
      return newState
    })
  }, [initialSteps, currentStep, setSteps])

  // Step Change handler
  useEffect(() => {
    onStepChangeRef.current?.(currentStep)
  }, [onStepChange, currentStep])

  const checkoutContext: CheckoutLayoutContext = {
    goTo,
    move,
    step: currentStep,
    steps: steps,
  }

  return (
    <CheckoutStepsContext.Provider value={checkoutContext}>
      {children}
    </CheckoutStepsContext.Provider>
  )
}

export const CheckoutStepsContext = createContext<
  CheckoutLayoutContext | undefined
>(undefined)

export const useCheckoutSteps = () => {
  const context = useContext(CheckoutStepsContext)
  if (context === undefined) {
    throw new Error('useCheckoutLayout must be used within a CheckoutLayout')
  }

  const { ...publicContext } = context

  return {
    ...publicContext,
  }
}
