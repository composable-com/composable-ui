import { ImageBannerProps } from '@composable/ui'
import { FormControl, Input } from '@chakra-ui/react'

export const ImageBanner = (props: ImageBannerProps) => {
  return <div>{props.image?.src}</div>
}

export const InputField = () => {
  return (
    <FormControl>
      <Input />
    </FormControl>
  )
}
