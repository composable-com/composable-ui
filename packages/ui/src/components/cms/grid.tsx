import { Grid as ChakraGrid } from '@chakra-ui/react'
import { ArticleCard } from './article-card'
import { CoverCard } from './cover-card'
import { TextCard } from './text-card'

interface GridProps {
  items: any[]
  columns?: number
  gridGap?: number
}

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
        base: `repeat(${_columns > 2 ? 2 : _columns}, 1fr)`,
        md: `repeat(${_columns > 4 ? 4 : _columns}, 1fr)`,
        lg: `repeat(${_columns > 6 ? 6 : _columns}, 1fr)`,
      }}
    >
      {items.filter(Boolean).map((item) => {
        switch (item?.__typename) {
          case 'ComponentArticleCard': {
            return <ArticleCard key={item.id} {...item} />
          }

          case 'ComponentCoverCard': {
            return <CoverCard key={item.id} {...item} />
          }

          case 'ComponentTextCard': {
            return <TextCard key={item.id} {...item} />
          }

          default: {
            return null
          }
        }
      })}
    </ChakraGrid>
  )
}
