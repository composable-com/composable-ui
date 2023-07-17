import { forwardRef } from 'react'
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react'
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'

export const Carousel = forwardRef<HTMLDivElement, FlexProps>(function Carousel(
  props,
  ref
) {
  return (
    <Flex
      ref={ref}
      className="chakra-carousel"
      overflow="hidden"
      position="relative"
      userSelect="none"
      {...props}
    />
  )
})

export const CarouselSlide = (props: BoxProps) => (
  <Box
    className="chakra-carousel__slide"
    position="relative"
    overflow="hidden"
    minW="calc(90% + 0px)"
    maxW="calc(90% + 0px)"
    transform="translate3d(0, 0, 0)"
    {...props}
  />
)

export const CarouselIconButton = (props: IconButtonProps) => (
  <IconButton
    variant="unstyled"
    boxSize="auto"
    minW="auto"
    display="inline-flex"
    fontSize="2xl"
    color="gray.600"
    _hover={{
      color: 'blue.500',
      _disabled: { color: 'gray.600' },
    }}
    _active={{ color: 'blue.600' }}
    _focus={{ boxShadow: 'none' }}
    _focusVisible={{ boxShadow: 'outline' }}
    {...props}
  />
)

export const useCarousel = (options?: KeenSliderOptions) => {
  const defaultOptions = { selector: '.chakra-carousel__slide' }
  return useKeenSlider<HTMLDivElement>({ ...defaultOptions, ...options })
}
