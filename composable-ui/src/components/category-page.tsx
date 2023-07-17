import {
  AlgoliaIntructionsPage,
  ProductListingPage,
  ProductListingPageProps,
} from './product-listing-page'

export interface CategoryPageProps extends ProductListingPageProps {
  algoliaKeysSet?: boolean
}

export const CategoryPage = ({
  query,
  serverState,
  algoliaKeysSet = false,
}: CategoryPageProps) => {
  return !algoliaKeysSet ? (
    <AlgoliaIntructionsPage />
  ) : (
    <ProductListingPage query={query} serverState={serverState} />
  )
}
