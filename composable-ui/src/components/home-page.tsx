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
import { useOnScreen } from 'hooks'
import React, { useState, useEffect } from 'react'
import { LAZY_LOAD_BATCH_SIZE } from 'utils/constants'

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
  const [visibleCount, setVisibleCount] = useState(LAZY_LOAD_BATCH_SIZE)
  const [loaderRef, isLoaderVisible] = useOnScreen<HTMLDivElement>({
    rootMargin: '200px',
  })

  useEffect(() => {
    if (isLoaderVisible) {
      setVisibleCount((prevCount) => prevCount + LAZY_LOAD_BATCH_SIZE)
    }
  }, [isLoaderVisible, data])
  return (
    <Box>
      <NextSeo
        title="Composable UI Open Source Storefront"
        description="Welcome to Composable UI! Create impactful, online storefronts with a foundational React and Next.js design system and UI library for modern composable commerce websites."
      />
      <Container maxW="container.xl">
        {data?.items?.slice(0, visibleCount).map((item) => {
          return (
            <UiContainer
              key={item?.id}
              size={item?.containerSize}
              marginBottom={item?.containerMarginBottom}
              marginTop={item?.containerMarginTop}
            >
              {renderItem(item)}
            </UiContainer>
          )
        })}
        {visibleCount < (data?.items?.length || 0) && (
          <div ref={loaderRef}></div>
        )}
      </Container>
    </Box>
  )
}
