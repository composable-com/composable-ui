import { RadioGroup, Stack } from '@chakra-ui/react'
import { ShippingOption } from '@composable/ui'
import { useCheckout } from '../../../hooks'

export const ShippingOptions = () => {
  const {
    shippingOptions: { options, selected, __setSelectedId },
  } = useCheckout()

  return (
    <RadioGroup name="shipping-option" value={selected?.id}>
      <Stack spacing={2}>
        {options.map((shippingOption) => {
          return (
            <ShippingOption
              {...shippingOption}
              key={shippingOption.id}
              onSelect={() => __setSelectedId(shippingOption.id)}
              selected={selected?.id === shippingOption.id}
            />
          )
        })}
      </Stack>
    </RadioGroup>
  )
}
