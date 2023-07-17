import {
  Box,
  Grid,
  GridItem,
  Text,
  CloseButton,
  Skeleton,
  AspectRatio,
} from '@chakra-ui/react'
import Image from 'next/image'
import { HorizontalProductCardCommon, ProductCardLayout } from './types'
import { QuantityPicker } from '../quantity-picker'

export interface HorizontalProductCardEditableProps
  extends HorizontalProductCardCommon {
  totalPrice?: string
  onChangeQuantity?: (val: number) => any
}

const getGridConfig: (labels: {
  quantityLabel: string
  itemPriceLabel: string
}) => ProductCardLayout = ({ quantityLabel, itemPriceLabel }) => ({
  2: null,
  3: {
    sm: {
      areas: `
                    "img . remove"
                    "img brand ."
                    "img name ."
                    "img price ."
                    "img details ."
                    "img quantity ."
                `,
      columns: 'auto 1fr auto',
      rows: '5px auto auto auto auto 1fr',
      removeButton: 'icon',
      image: {
        width: 145,
        height: 147,
      },
      quantity: {
        align: 'start',
      },
    },
    lg: {
      areas: `
                    "img . ."
                    "img brand quantity"
                    "img name quantity"
                    "img price quantity"
                    "img details ."
                    "img . remove"
                `,
      columns: 'auto 1fr auto',
      rows: 'auto auto auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 175,
      },
      quantity: {
        label: quantityLabel,
        align: 'end',
      },
    },
  },
  4: {
    sm: {
      areas: `
                    "img . remove"
                    "img brand ."
                    "img name ."
                    "img details ."
                    "img . price"
                    "img quantity ."
                    "img wishlist ."
                    "meta meta meta"
                `,
      columns: 'auto 1fr auto',
      rows: '5px auto auto auto 20px auto auto auto',
      removeButton: 'icon',
      image: {
        width: 120,
        height: 180,
      },
      quantity: {
        display: 'block',
        align: 'start',
      },
      price: {
        display: 'block',
        align: 'end',
      },
    },
    lg: {
      areas: `
                    "img brand quantity price"
                    "img name quantity price"
                    "img details quantity price"
                    "img meta wishlist remove"
                `,
      columns: 'auto 1fr auto auto',
      rows: 'auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 175,
      },
      quantity: {
        display: 'block',
        label: quantityLabel,
        align: 'end',
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
  5: {
    sm: {
      areas: `
                    "img . remove"
                    "img brand ."
                    "img name ."
                    "img details ."
                    "img . price"
                    "img quantity ."
                    "img wishlist ."
                    "meta meta meta"
                `,
      columns: 'auto 1fr auto',
      rows: '1px auto auto auto 20px auto auto auto',
      removeButton: 'icon',
      image: {
        width: 81,
        height: 116,
      },
      quantity: {
        display: 'block',
        align: 'start',
      },
      price: {
        display: 'block',
        align: 'end',
      },
    },
    lg: {
      areas: `
                    "img brand . . ."
                    "img name price quantity total-price"
                    "img details price quantity total-price"
                    "img meta . wishlist remove"
                `,
      columns: 'auto 1fr auto auto auto',
      rows: 'auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 175,
      },
      quantity: {
        display: 'block',
        label: quantityLabel,
        align: 'end',
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
})

export const HorizontalProductCardEditable = (
  props: HorizontalProductCardEditableProps
) => {
  const {
    image,
    brand,
    name,
    details = [],
    regularPrice,
    salePrice,
    totalPrice,
    quantity,
    metaText,
    labels,
  } = props
  const { columns = 3, size = 'lg' } = props
  const { onRemove, onAddToWishlist, onChangeQuantity, isLoading } = props

  const quantityLabel = labels.quantity ?? ''
  const itemPriceLabel = labels.itemPrice ?? ''
  const removeLabel = labels.remove ?? ''
  const addToWishlistLabel = labels.addToWishlist ?? ''
  const itemTotalPriceLabel = labels.totalPrice ?? ''

  const grid = getGridConfig({ quantityLabel, itemPriceLabel })

  const gridSettings = grid[columns]?.[size]

  if (!gridSettings) {
    return null
  }

  const gridTemplateAreas = gridSettings.areas
  const gridTemplateColumns = gridSettings.columns
  const gridTemplateRows = gridSettings.rows
  const removeButtonType = gridSettings.removeButton
  const imageSize = gridSettings.image
  const quantityOptions = gridSettings.quantity
  const priceOptions = gridSettings.price

  const getGridItemDisplayValue = (area: string, defaultDisplay?: string) => {
    const shouldHide = !gridTemplateAreas.includes(area)
    return shouldHide ? 'none' : defaultDisplay
  }

  const removeButtonLabel = `${removeLabel} ${name}`
  const addToWishlistButtonLabel = `${addToWishlistLabel} ${name}`

  return (
    <Box>
      <Grid
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        columnGap={4}
      >
        <GridItem area="img">
          <AspectRatio
            ratio={3 / 4}
            position="relative"
            width={imageSize.width}
            height={imageSize.height}
            overflow="hidden"
            cursor={image?.onClickImage ? 'pointer' : undefined}
            mb={3}
          >
            {image && (
              <Image
                src={image?.src}
                alt={image?.alt}
                height={Number(imageSize.height ?? 180)}
                width={Number(imageSize.width ?? 145)}
                quality={90}
                style={{ objectFit: 'cover' }}
                onClick={image?.onClickImage}
              />
            )}
          </AspectRatio>
        </GridItem>
        <GridItem
          area="brand"
          textStyle={'Desktop/Body-XS'}
          color={'text-muted'}
        >
          {brand}
        </GridItem>
        <GridItem area="name" textStyle={'Desktop/Body-XS'}>
          {name}
        </GridItem>
        <GridItem
          area="price"
          fontSize={size === 'lg' ? 'sm' : 'xs'}
          textStyle={'Desktop/Body-XS'}
          textAlign={priceOptions?.align}
        >
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            fontSize="xs"
            color="text-muted"
            fontWeight="extrabold"
          >
            {priceOptions?.label}
          </Text>
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            mr={priceOptions?.display !== 'block' ? 1 : undefined}
            textDecoration={salePrice ? 'line-through' : undefined}
          >
            {regularPrice}
          </Text>
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            color="danger-med"
          >
            {salePrice}
          </Text>
        </GridItem>
        <GridItem
          area="quantity"
          display={getGridItemDisplayValue('quantity', 'flex')}
          flexDirection="column"
          alignItems={quantityOptions?.align}
        >
          <Text
            fontSize={size === 'lg' ? 'xs' : 'xxs'}
            color="text-muted"
            fontWeight="extrabold"
          >
            {quantityOptions?.label}
          </Text>
          <QuantityPicker
            size={size === 'lg' ? 'lg' : 'sm'}
            hideLabel
            rootProps={{ maxW: '100px' }}
            isLoading={isLoading}
            controllableStateProps={{
              value: quantity,
              onChange: onChangeQuantity,
            }}
          />
        </GridItem>
        <GridItem
          area="wishlist"
          display={getGridItemDisplayValue(
            'wishlist',
            size === 'lg' ? 'flex' : undefined
          )}
        >
          {onAddToWishlist && (
            <Text
              as="button"
              fontSize={size === 'lg' ? 'xs' : 'xxs'}
              textDecoration="underline"
              onClick={onAddToWishlist}
              cursor="pointer"
              aria-label={addToWishlistButtonLabel}
            >
              {addToWishlistLabel}
            </Text>
          )}
        </GridItem>
        <GridItem area="remove" display="flex" justifyContent="end">
          {onRemove && (
            <>
              {removeButtonType === 'text' && (
                <Text
                  as="button"
                  textAlign="end"
                  textDecoration="underline"
                  fontSize="xs"
                  onClick={onRemove}
                  cursor="pointer"
                  aria-label={removeButtonLabel}
                >
                  {removeLabel}
                </Text>
              )}
              {removeButtonType === 'icon' && (
                <CloseButton
                  aria-label={removeButtonLabel}
                  size="sm"
                  isDisabled={false}
                  onClick={onRemove}
                />
              )}
            </>
          )}
        </GridItem>
        <GridItem
          area="details"
          fontSize={size === 'lg' ? 'xs' : 'xxs'}
          color="text-muted"
          display={getGridItemDisplayValue('details')}
        >
          {details.map(({ name, value, id }) => (
            <Text key={`${name}-${id}`}>
              {name}: {value}
            </Text>
          ))}
        </GridItem>
        <GridItem
          area="total-price"
          textAlign={priceOptions?.align}
          display={getGridItemDisplayValue('total-price')}
        >
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            fontSize="xs"
            color="text-muted"
            fontWeight="extrabold"
          >
            {itemTotalPriceLabel}
          </Text>
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            fontSize="sm"
          >
            {totalPrice}
          </Text>
        </GridItem>
        <GridItem
          area="meta"
          fontSize={size === 'lg' ? 'xs' : 'xxs'}
          display={getGridItemDisplayValue('meta')}
        >
          {metaText}
        </GridItem>
      </Grid>
    </Box>
  )
}
