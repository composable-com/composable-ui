import {
  Box,
  Grid,
  GridItem,
  Text,
  CloseButton,
  AspectRatio,
} from '@chakra-ui/react'
import { HorizontalProductCardCommon, ProductCardLayout } from './types'
import Image from 'next/image'

export interface HorizontalProductCardReadOnlyProps
  extends HorizontalProductCardCommon {}

const getGridConfig: (labels: {
  quantityLabel: string
  itemPriceLabel: string
}) => ProductCardLayout = ({ quantityLabel, itemPriceLabel }) => ({
  2: {
    sm: {
      areas: `
                    ". . remove"
                    "img brand brand"
                    "img name name"
                    "img price price"
                    "img quantity quantity"
                `,
      columns: 'auto 1fr auto',
      removeButton: 'icon',
      image: {
        width: 66,
        height: 100,
      },
      quantity: {
        display: 'inline',
        label: `${quantityLabel}: `,
      },
    },
    lg: {
      areas: `
                    ". . remove"
                    "img brand brand"
                    "img name name"
                    "img price price"
                    "img quantity quantity"
                `,
      columns: 'auto 1fr auto',
      removeButton: 'icon',
      image: {
        width: 81,
        height: 100,
      },
      quantity: {
        display: 'inline',
        label: `${quantityLabel}: `,
      },
    },
  },
  3: {
    sm: {
      areas: `
                    "img . . remove"
                    "img brand brand brand"
                    "img name name name"
                    "img price price price"
                    "img details details details"
                    "img wishlist wishlist wishlist"
                    "meta meta meta meta"
                `,
      columns: 'auto 1fr 1fr auto',
      rows: '5px auto auto auto auto auto auto',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 141,
      },
    },
    lg: {
      areas: `
                    "img brand brand price"
                    "img name name price"
                    "img details details price"
                    "img meta wishlist remove"
                `,
      columns: 'auto 1fr auto auto',
      rows: 'auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 175,
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
  4: {
    sm: {
      areas: `
                    "img . remove"
                    "img brand price"
                    "img name price"
                    "img details ."
                    "img wishlist ."
                    "meta meta meta"
                `,
      columns: 'auto 1fr auto',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 110,
      },
      quantity: {
        display: 'block',
        label: quantityLabel,
        align: 'center',
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
        align: 'center',
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
  5: null,
})

export const HorizontalProductCardReadOnly = (
  props: HorizontalProductCardReadOnlyProps
) => {
  const {
    image,
    brand,
    name,
    details = [],
    regularPrice,
    salePrice,
    quantity,
    metaText,
    labels,
  } = props
  const { columns = 3, size = 'lg' } = props
  const { onRemove, onAddToWishlist } = props

  const quantityLabel = labels.quantity ?? ''
  const itemPriceLabel = labels.itemPrice ?? ''
  const removeLabel = labels.remove ?? ''
  const addToWishlistLabel = labels.addToWishlist ?? ''

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

  const getGridItemDisplayValue = (area: string) => {
    const shouldHide = !gridTemplateAreas.includes(area)
    return shouldHide ? 'none' : undefined
  }

  return (
    <Box>
      <Grid
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        paddingY={5}
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
            <Image
              src={image?.src ?? ''}
              alt={image?.alt ?? ''}
              height={Number(imageSize.height ?? 180)}
              width={Number(imageSize.width ?? 145)}
              quality={90}
              style={{ objectFit: 'cover' }}
              onClick={image?.onClickImage}
            />
          </AspectRatio>
        </GridItem>
        <GridItem
          area="brand"
          fontSize={size === 'lg' ? 'xs' : 'xxs'}
          color="text-muted"
        >
          {brand}
        </GridItem>
        <GridItem
          area="name"
          textStyle={'Desktop/Body-Default'}
          fontSize={size === 'lg' ? 'base' : 'xs'}
        >
          {name}
        </GridItem>
        <GridItem
          area="price"
          fontSize={size === 'lg' ? 'sm' : 'xs'}
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
        <GridItem area="remove" display="flex" justifyContent="end">
          {onRemove && (
            <>
              {removeButtonType === 'text' && (
                <Text
                  textAlign="end"
                  textDecoration="underline"
                  fontSize="xs"
                  onClick={onRemove}
                  cursor="pointer"
                >
                  {removeLabel}
                </Text>
              )}
              {removeButtonType === 'icon' && (
                <CloseButton size="sm" isDisabled={false} onClick={onRemove} />
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
            <Text key={id}>
              {name}: {value}
            </Text>
          ))}
        </GridItem>
        <GridItem
          area="quantity"
          fontSize={size === 'lg' ? 'xs' : 'xxs'}
          textAlign={quantityOptions?.align}
          display={getGridItemDisplayValue('quantity')}
        >
          <Text
            as={quantityOptions?.display === 'block' ? 'p' : 'span'}
            color="text-muted"
            fontWeight="extrabold"
            mr={1}
          >
            {quantityOptions?.label}
          </Text>
          <Text as={quantityOptions?.display === 'block' ? 'p' : 'span'}>
            {quantity}
          </Text>
        </GridItem>
        <GridItem area="wishlist" display={getGridItemDisplayValue('wishlist')}>
          {onAddToWishlist && (
            <Text
              fontSize={size === 'lg' ? 'xs' : 'xxs'}
              textDecoration="underline"
              onClick={onAddToWishlist}
              cursor="pointer"
            >
              {addToWishlistLabel}
            </Text>
          )}
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
