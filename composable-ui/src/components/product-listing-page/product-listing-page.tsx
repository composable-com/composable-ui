import { NextSeo } from 'next-seo'
import { Box, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react'

import algoliasearch from 'algoliasearch/lite'
import {
  Configure,
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web'
import {
  AppliedFilters,
  Breadcrumb,
  Filters,
  GridControl,
  Header,
  MobileFilters,
  ProductList,
  ResultsData,
  SortingControl,
} from './.'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { CategoryPageProductGrid } from '@composable/types'
import {
  ALGOLIA_API_SEARCH_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
} from '../../utils/constants'

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_SEARCH_KEY)

export interface ProductListingPageProps {
  query: string
  serverState?: InstantSearchServerState
}

export const ProductListingPage = ({
  query,
  serverState,
}: ProductListingPageProps) => {
  const intl = useIntl()
  const [productsGridOption, setProductsGridOption] =
    useState<CategoryPageProductGrid>('comfortable')

  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        <Configure
          hitsPerPage={12}
          query={query}
          restrictSearchableAttributes={['category']}
        />

        <Container maxW="container.2xl" px={[4, 6, 24]} mt={[4, 6, 8]} mb={20}>
          <NextSeo title={query} description={query} />

          <Box mt={{ base: 6, md: 16 }} mb={{ base: 2, md: 3 }}>
            <Breadcrumb query={query.toString() ?? ''} />
          </Box>

          <Box mb={{ base: 9, md: 12 }}>
            <Header query={query.toString() ?? ''} />
          </Box>

          <Flex gap={6}>
            <Box
              flexBasis={72}
              flexShrink={0}
              display={{ base: 'none', md: 'initial' }}
            >
              <Text as="h2" mb={3} textStyle={'Desktop/L'}>
                {intl.formatMessage({ id: 'category.filters.refineBy' })}
              </Text>

              <Filters />
            </Box>

            <Box flexGrow={1}>
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <Flex flexGrow={1} justifyContent="space-between" align="end">
                  <Box alignSelf="start">
                    <ResultsData />
                  </Box>

                  <Box>
                    {!!serverState && (
                      <GridControl
                        grid={productsGridOption}
                        setGrid={setProductsGridOption}
                      />
                    )}
                  </Box>
                </Flex>

                <Grid templateColumns={{ base: '1fr 1fr', md: '1fr' }} gap={4}>
                  <GridItem display={{ base: 'initial', md: 'none' }}>
                    <MobileFilters />
                  </GridItem>
                  <GridItem>
                    <SortingControl />
                  </GridItem>
                </Grid>
              </Flex>

              <Box>
                <AppliedFilters />
              </Box>

              <Box mt={{ base: 8, md: 10 }} mb={6}>
                <ProductList grid={productsGridOption} />
              </Box>
            </Box>
          </Flex>
        </Container>
      </InstantSearch>
    </InstantSearchSSRProvider>
  )
}
