import { NextSeo } from 'next-seo'
import { api } from 'utils/api'
import { Box, Container } from '@chakra-ui/react'
import {
  BannerFull,
  BannerSplit,
  BannerTextOnly,
  Grid,
  CommerceConnector,
} from './cms'
import { UiContainer } from '@composable/ui/src/components/ui-container'
import { PageItem } from '@composable/types'

const renderItem = (item: PageItem) => {
  switch (item?.__typename) {
    case 'BannerSplit':
      return <BannerSplit {...item} />
    case 'BannerFull':
      return <BannerFull {...item} />
    case 'BannerTextOnly':
      return <BannerTextOnly {...item} />
    case 'Grid':
      return <Grid {...item} />
    case 'CommerceConnector':
      return <CommerceConnector {...item} />
    default:
      return null
  }
}

export const HomePage = () => {
  const { data } = api.cms.getPage.useQuery(
    {
      slug: 'home',
    },
    {
      // One important detail of this implementation is that the page will not be refetched on mount
      // (when the user first visits the page). Instead, we rely on the cache control mechanism.
      refetchOnMount: false,
    }
  )

  return (
    <Box>
      <NextSeo
        title="Composable UI Open Source Storefront"
        description="Welcome to Composable UI! Create impactful, online storefronts with a foundational React and Next.js design system and UI library for modern composable commerce websites."
      />
      <Container maxW="container.xl">
        {data?.items?.map((item) => (
          <UiContainer
            key={item?.id}
            size={item?.containerSize}
            marginBottom={item?.containerMarginBottom}
            marginTop={item?.containerMarginTop}
          >
            {renderItem(item)}
          </UiContainer>
        ))}
      </Container>
    </Box>
  )
}
