import {
  HorizontalProductCardEditable,
  HorizontalProductCardEditableProps,
} from './horizontal-product-card-editable'
import {
  HorizontalProductCardReadOnly,
  HorizontalProductCardReadOnlyProps,
} from './horizontal-product-card-read-only'

export type HorizontalProductCardProps = (
  | HorizontalProductCardEditableProps
  | HorizontalProductCardReadOnlyProps
) & {
  editable?: boolean
}

export const HorizontalProductCard = (props: HorizontalProductCardProps) => {
  const { editable } = props
  return editable ? (
    <HorizontalProductCardEditable {...props} />
  ) : (
    <HorizontalProductCardReadOnly {...props} />
  )
}
