import { Product } from './product'

export interface Category {
  name: string
  slug: string
  products: Product[]
}

export type CategoryPageProductGrid =
  | 'single'
  | 'comfortable'
  | 'standard'
  | 'condensed'

export type AlgoliaFilterItem = NumericMenuProps | RefinementListProps

export interface RefinementBaseProps {
  attribute: string
  translationKey: string
}

export interface RefinementListProps extends RefinementBaseProps {
  type: 'list'
  operator: 'and' | 'or'
}

export interface NumericMenuProps extends RefinementBaseProps {
  type: 'numeric'
  items: {
    label: string
    start?: number
    end?: number
  }[]
}
