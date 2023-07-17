import { ProductCardProps } from '../product-card'

export const ProductCard = (props: ProductCardProps) => {
  return (
    <div>
      <div>{props.name}</div>
    </div>
  )
}
