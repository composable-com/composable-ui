import { GridProps } from '@composable/types'
import { Grid as ChakraGrid } from '@chakra-ui/react'
import { ArticleCard } from './article-card'
import { CoverCard } from './cover-card'
import { TextCard } from './text-card'

export const Grid = ({ items, columns, gridGap }: GridProps) => {
  if (!items.length) {
    return null
  }

  const _columns = columns ?? items.length

  return (
    <ChakraGrid
      gridGap={gridGap || 0}
      alignItems="stretch"
      templateColumns={{
        sm: `repeat(${_columns > 2 ? 1 : _columns}, 1fr)`,
        md: `repeat(${_columns > 4 ? 4 : _columns}, 1fr)`,
        lg: `repeat(${_columns > 6 ? 6 : _columns}, 1fr)`,
      }}
    >
      {items.filter(Boolean).map((item) => {
        switch (item?.__typename) {
          case 'TextCard': {
            return <TextCard key={`${item.title}-${item.id}`} {...item} />
          }
          case 'CoverCard': {
            return <CoverCard key={`${item.title}-${item.id}`} {...item} />
          }
          case 'ArticleCard': {
            return <ArticleCard key={`${item.title}-${item.id}`} {...item} />
          }

          default: {
            return null
          }
        }
      })}
    </ChakraGrid>
  )
}
