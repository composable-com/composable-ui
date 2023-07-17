import { Flex, HStack } from '@chakra-ui/react'
import { CheckoutStepLink } from './checkout-step-link'
import { useCheckoutSteps } from '../checkout-provider'

export const CheckoutSteps = () => {
  const { goTo, step, steps } = useCheckoutSteps()

  return (
    <Flex ml={{ base: 'none', md: '2rem' }}>
      <HStack
        spacing={{ base: 4, sm: 10, md: 4 }}
        justifyContent={'center'}
        w={'full'}
        px={{ base: 1, md: 'none' }}
      >
        {steps.map((s) => {
          const isPreviousOrEqual = step.position >= s.position
          return (
            <CheckoutStepLink
              key={s.position}
              active={step.key === s.key}
              done={step.position > s.position}
              title={`${s.position}.  ${s.title}`}
              onClick={() => goTo(s.hash)}
              isAllowed={s.isAllowed && isPreviousOrEqual}
            />
          )
        })}
      </HStack>
    </Flex>
  )
}
