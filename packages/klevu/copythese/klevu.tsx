import React, { useState } from 'react'
import {
  KlevuInit,
  KlevuMerchandising,
  KlevuProduct,
  KlevuProductGrid,
  KlevuQuicksearch,
  KlevuSearchLandingPage,
} from '@klevu/ui-react'
import { KlevuRecord } from '@klevu/core'
import { useRouter } from 'next/router'
import { Box, Container } from '@chakra-ui/react'
import { CategoryProductCard } from '../product-listing-page'

// Change these values to your own
const apiKey = process.env.NEXT_PUBLIC_KLEVU_SEARCH_API_KEY
const url = process.env.NEXT_PUBLIC_KLEVU_SEARCH_URL
const assetsPath = process.env.NEXT_PUBLIC_KLEVU_ASSETS_PATH

if (!apiKey || !url || !assetsPath) {
  throw new Error('Klevu API key, URL or assets path is not defined in .env')
}

const Init = (props: { children: any }) => {
  let router: any = null
  router = useRouter()

  return (
    <KlevuInit
      apiKey={apiKey}
      url={url}
      settings={{
        generateProductUrl(product) {
          return `/product/${product.url}`
        },
        onItemClick(item, event) {
          if (router) router.push(`/product/${item.url}`)
          return false
        },
        renderPrice(amount, currency) {
          return `$${amount}`
        },
      }}
      assetsPath={assetsPath}
    >
      {props.children}
    </KlevuInit>
  )
}

export const QuickSearch = () => {
  const router = useRouter()

  return (
    <Init>
      <Box margin={'0 16px'}>
        <KlevuQuicksearch
          searchFieldVariant="default-no-button"
          popupAnchor="bottom"
          onKlevuSearch={(e) => {
            router.push(`/search?term=${e.detail}`)
          }}
          searchCategories
        />
      </Box>
    </Init>
  )
}

export const KlevuCategoryPage = (props: {
  category: string
  serverState?: string
}) => {
  const [products, setProducts] = useState<KlevuRecord[]>([])

  return (
    <Init>
      <Box margin={'0 16px'}>
        <KlevuMerchandising
          category={props.category}
          categoryTitle={props.category}
          onKlevuData={(e) => {
            setProducts(e.detail.records)
          }}
        >
          <div slot="content">
            <CustomGridRenderer products={products} />
          </div>
        </KlevuMerchandising>
      </Box>
    </Init>
  )
}

function CustomGridRenderer(props: { products: KlevuRecord[] }) {
  return (
    <KlevuProductGrid>
      {props.products.map((product) => {
        // additionalDataToReturn is JSON have been indexed to display key on the product.
        const originalProductJSON = JSON.parse(
          product.additionalDataToReturn
        ).default
        return (
          <KlevuProduct key={product.id} product={product} isWrapper>
            {/* Above: Components should be put inside KlevuProduct that has `isWrapper` prop defined. It means that it's empty shell. */}
            {/* Below: Here you can use your own components */}
            <CategoryProductCard product={originalProductJSON} />
          </KlevuProduct>
        )
      })}
    </KlevuProductGrid>
  )
}

export const KlevuSearchPage = (props: { term: string }) => {
  const [products, setProducts] = useState<KlevuRecord[]>([])

  return (
    <Container maxW="container.xl" py={{ base: '4', md: '8' }}>
      <Box margin={'0 16px'}>
        <Init>
          <KlevuSearchLandingPage
            term={props.term}
            onKlevuData={(e) => {
              setProducts(e.detail.records)
            }}
          >
            <div slot="content">
              <CustomGridRenderer products={products} />
            </div>
          </KlevuSearchLandingPage>
        </Init>
      </Box>
    </Container>
  )
}
