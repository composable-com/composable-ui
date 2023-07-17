import { CartItem } from '@composable/types'
import {
  HorizontalProductCard,
  HorizontalProductCardProps,
} from '@composable/ui'
import { APP_CONFIG } from '../../utils/constants'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { useRouter } from 'next/router'

interface ProductsListProps {
  products?: CartItem[]
  productCardProps?: Partial<HorizontalProductCardProps>
}

export const ProductsList = ({
  products,
  productCardProps,
}: ProductsListProps) => {
  const intl = useIntl()
  const router = useRouter()

  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  return (
    <>
      {products?.map((item) => {
        return (
          <HorizontalProductCard
            key={`${item.name}-${item.id}`}
            columns={2}
            size="lg"
            name={item.name}
            brand={item.brand}
            quantity={item.quantity}
            image={{
              src: item.image.url,
              alt: item.image.alt ?? item.name,
              onClickImage: () => router.push(`/product/${item.slug}`),
            }}
            regularPrice={intl.formatNumber(item.price, currencyFormatConfig)}
            labels={{
              quantity: intl.formatMessage({
                id: 'cart.item.quantity',
              }),
              itemPrice: intl.formatMessage({ id: 'cart.item.price' }),
              totalPrice: intl.formatMessage({ id: 'cart.item.totalPrice' }),
              remove: intl.formatMessage({ id: 'action.remove' }),
            }}
            {...productCardProps}
          />
        )
      })}
    </>
  )
}
