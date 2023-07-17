import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from 'react-instantsearch-hooks-web'
import { Box, Button, Grid, GridItem, VStack } from '@chakra-ui/react'
import { AlgoliaProduct, CategoryProductCard } from './category-product-card'
import { CategoryPageProductGrid } from '@composable/types'

const GRID_TEMPLATE_COLUMNS: Record<CategoryPageProductGrid, string> = {
  single: 'repeat(1, 1fr)',
  comfortable: 'repeat(2, 1fr)',
  standard: 'repeat(3, 1fr)',
  condensed: 'repeat(4, 1fr)',
}

interface ProductListProps extends UseInfiniteHitsProps<AlgoliaProduct> {
  grid: CategoryPageProductGrid
}

export const ProductList = (props: ProductListProps) => {
  const { hits, isLastPage, showMore } = useInfiniteHits(props)

  return (
    <VStack w="full">
      <Grid
        w="full"
        gridTemplateColumns={GRID_TEMPLATE_COLUMNS[props.grid]}
        rowGap={12}
      >
        {hits.map((product, index) => {
          return (
            <GridItem key={product.objectID}>
              <CategoryProductCard
                key={product.objectID}
                product={product}
                priority={index < 3}
              />
            </GridItem>
          )
        })}
      </Grid>
      {!isLastPage && (
        <Box p={25}>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => showMore()}
          >
            Show More
          </Button>
        </Box>
      )}
    </VStack>
  )
}
