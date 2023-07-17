import {
  Box,
  Container,
  ContainerProps,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'

export type SectionOptions =
  | 'accordion'
  | 'brand'
  | 'breadcrumb'
  | 'description'
  | 'main'
  | 'price'
  | 'title'

export interface PdpLayoutProps {
  accordion?: JSX.Element
  aside: JSX.Element
  brand?: string | JSX.Element
  breadcrumb?: JSX.Element
  description: string | JSX.Element
  isLoaded: boolean
  main: JSX.Element
  mainStackProps?: StackProps
  price: JSX.Element
  rootProps?: ContainerProps
  sectionOrder?: SectionOptions[]
  seo?: JSX.Element
  stackProps?: StackProps
  title: string
}

const accordionSection = (accordion: JSX.Element, isLoaded: boolean) => (
  <SkeletonText noOfLines={4} skeletonHeight="10" isLoaded={isLoaded}>
    {accordion}
  </SkeletonText>
)
const brandSection = (brand: string | JSX.Element, isLoaded: boolean) => (
  <SkeletonText
    noOfLines={1}
    skeletonHeight="6"
    textStyle={'Eyebrow'}
    color={'text-muted'}
    isLoaded={isLoaded}
  >
    {brand}
  </SkeletonText>
)
const breadcrumbSection = (breadcrumb: JSX.Element, isLoaded: boolean) => (
  <SkeletonText noOfLines={1} skeletonHeight="6" isLoaded={isLoaded}>
    {breadcrumb}
  </SkeletonText>
)
const descriptionSection = (
  description: string | JSX.Element,
  isLoaded: boolean
) => (
  <SkeletonText
    mt={10}
    noOfLines={8}
    spacing="4"
    skeletonHeight="4"
    isLoaded={isLoaded}
  >
    <Text textStyle={'Body-S'} color={'text'}>
      {description}
    </Text>
  </SkeletonText>
)
const priceSection = (price: JSX.Element, isLoaded: boolean) => (
  <SkeletonText
    noOfLines={1}
    skeletonHeight="8"
    mt="4"
    isLoaded={isLoaded}
    textStyle={'Body-L'}
  >
    {price}
  </SkeletonText>
)
const titleSection = (title: string, isLoaded: boolean) => (
  <Heading>
    <Skeleton
      textStyle={{ base: 'Desktop/M', md: 'Desktop/XL' }}
      minHeight="1em"
      isLoaded={isLoaded}
    >
      {title}
    </Skeleton>
  </Heading>
)

export const PdpLayout = ({
  accordion,
  aside,
  brand,
  breadcrumb,
  description,
  isLoaded,
  main,
  mainStackProps,
  price,
  rootProps,
  sectionOrder = [
    'breadcrumb',
    'brand',
    'title',
    'price',
    'description',
    'main',
    'accordion',
  ],
  seo,
  stackProps,
  title,
}: PdpLayoutProps) => {
  const sectionMap = {
    accordion: accordion && accordionSection(accordion, isLoaded),
    brand: brand && brandSection(brand, isLoaded),
    breadcrumb: breadcrumb && breadcrumbSection(breadcrumb, isLoaded),
    description: descriptionSection(description, isLoaded),
    main: isLoaded && main,
    price: priceSection(price, isLoaded),
    title: titleSection(title, isLoaded),
  }

  return (
    <Box px={{ base: 2, md: 4 }}>
      <Container
        maxW="container.xl"
        mx="auto"
        py={{ base: '6', md: '8', lg: '12' }}
        {...rootProps}
      >
        {seo}
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          gap={{ base: '10', lg: '16', xl: '20' }}
          {...stackProps}
        >
          <Stack
            maxH={{ base: 'initial', lg: '95vh' }}
            maxW={{ lg: 'md' }}
            overflow={'hidden'}
            justify="flex-start"
            width="100%"
            layerStyle={'no-scroll-bar'}
            {...mainStackProps}
          >
            <Stack m={0} p={1} overflowY={'scroll'}>
              {sectionOrder.map((section) => (
                <Box key={`${section}`} m={'none'} p={'none'} border={'none'}>
                  {sectionMap[section]}
                </Box>
              ))}
            </Stack>
          </Stack>
          <Box flex="1" overflow="hidden">
            {aside}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
