import { useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  AspectRatio,
  Box,
  IconButton,
  IconButtonProps,
  Link,
  Skeleton,
  Stack,
  StackProps,
} from '@chakra-ui/react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { Carousel, CarouselSlide, useCarousel } from './carousel'

interface GalleryProps {
  aspectRatio?: number
  href?: string
  images?: Array<{ src: string; alt: string; priority?: boolean }>
  productName?: String
  rootProps?: StackProps
}

export const Gallery = (props: GalleryProps) => {
  const { images, aspectRatio = 3 / 4, rootProps, productName = '' } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  const [ref, slider] = useCarousel({
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
  })

  if (!images) {
    return (
      <Stack spacing="4" {...rootProps}>
        <ElementLinkHandler href={props.href}>
          <AspectRatio ratio={aspectRatio} width="100%" bg="gray.200">
            <Skeleton width="100%" />
          </AspectRatio>
        </ElementLinkHandler>
      </Stack>
    )
  }

  const hasPrevious = currentSlide !== 0
  const hasNext = currentSlide < images.length - 1

  return (
    <Stack
      display={'flex'}
      spacing="4"
      direction={{ base: 'column-reverse', md: 'row' }}
      border={'none'}
    >
      {images.length > 1 && (
        <Stack
          justify="center"
          flexWrap={'wrap'}
          direction={{ base: 'row', md: 'column' }}
        >
          {images.map((image, i) => (
            <Box
              as={'button'}
              key={image.src}
              onClick={() => slider.current?.moveToIdx(i)}
              border={currentSlide === i ? '2px solid' : 'none'}
              borderColor={'text'}
              borderRadius={'8px'}
              width={'64px'}
              height={'64px'}
            >
              <AspectRatio
                transition="all 200ms"
                ratio={1}
                margin={'2px'}
                _hover={{ opacity: 1 }}
              >
                <Image
                  alt={`View large product image ${i + 1} of ${
                    images.length
                  }. ${image.alt || productName}`}
                  src={image.src}
                  priority={image.priority}
                  width={64}
                  height={64}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </AspectRatio>
            </Box>
          ))}
        </Stack>
      )}
      <Box
        position="relative"
        w={'full'}
        overflow={'hidden'}
        sx={{
          _hover: {
            '> button': {
              display: 'inline-flex',
            },
          },
        }}
      >
        <Carousel ref={ref}>
          {images.map((image, i) => (
            <CarouselSlide key={image.src}>
              <ElementLinkHandler href={props.href}>
                <Box
                  width="100%"
                  position="relative"
                  style={{
                    aspectRatio: '3/4',
                  }}
                >
                  <Image
                    fill
                    alt={`View large product image ${i + 1} of ${
                      images.length
                    }. ${image.alt || productName}`}
                    src={image.src}
                    priority={image.priority}
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 70vw, 50vw"
                    style={{
                      objectFit: 'contain',
                    }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </Box>
              </ElementLinkHandler>
            </CarouselSlide>
          ))}
        </Carousel>
        {hasPrevious && (
          <CarouselIconButton
            pos="absolute"
            left="3"
            top="50%"
            transform="translateY(-50%)"
            onClick={() => slider.current?.prev()}
            icon={<IoChevronBackOutline color="#111111" />}
            aria-label="Previous Slide"
          />
        )}

        {hasNext && (
          <CarouselIconButton
            pos="absolute"
            right="3"
            top="50%"
            transform="translateY(-50%)"
            onClick={() => slider.current?.next()}
            icon={<IoChevronForwardOutline color="#111111" />}
            aria-label="Next Slide"
          />
        )}
      </Box>
    </Stack>
  )
}

const CarouselIconButton = (props: IconButtonProps) => (
  <IconButton
    fontSize="lg"
    width={'48px'}
    height={'48px'}
    bg={'shading.100'}
    _active={{
      bg: 'shading.200',
    }}
    {...props}
  />
)

const ElementLinkHandler = (props: {
  children: JSX.Element
  href?: string
}) => {
  return props.href ? (
    <Link as={NextLink} href={props.href}>
      {props.children}
    </Link>
  ) : (
    props.children
  )
}
