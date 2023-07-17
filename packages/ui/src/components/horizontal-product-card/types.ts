export type Columns = 2 | 3 | 4 | 5

export interface HorizontalProductCardCommon {
  columns?: Columns
  image?: {
    src: string
    alt: string
    onClickImage?: () => void
  }
  brand?: string
  name: string
  details?: {
    name: string
    id: string
    value: string | number
  }[]
  regularPrice: string
  salePrice?: string
  quantity: number
  metaText?: string
  size?: 'sm' | 'lg'
  onRemove?: () => any
  onAddToWishlist?: () => any
  isLoading?: boolean
  labels: {
    quantity?: string
    remove?: string
    addToWishlist?: string
    itemPrice?: string
    totalPrice?: string
  }
}

export type ProductCardLayout = Record<
  Columns,
  {
    sm: GridLayoutOption
    lg: GridLayoutOption
  } | null
>

interface GridLayoutOption {
  areas: string
  columns?: string
  rows?: string
  removeButton?: 'icon' | 'text'
  image: {
    width: number | string
    height?: number | string
  }
  quantity?: {
    label?: string
    display?: 'inline' | 'block'
    align?: 'center' | 'start' | 'end' | 'initial'
  }
  price?: {
    label?: string
    display?: 'inline' | 'block'
    align?: 'center' | 'end' | 'initial'
  }
  priceLabel?: string
}
