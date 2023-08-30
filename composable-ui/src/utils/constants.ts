export const LOCAL_STORAGE_CART_ID = 'cart_id'
export const LOCAL_STORAGE_CART_UPDATED_AT = 'cart_updated_at'

export const APP_CONFIG = {
  NAME: 'Composable UI',
  TITLE_TEMPLATE: '%s | Composable UI',
  FAVICON: '/img/favicon.ico',
  CURRENCY_CODE: 'USD',
  IMAGE_PLACEHOLDER: '/img/image-placeholder.svg',
  COPYRIGHT: `© Copyright Composable UI ${new Date().getFullYear()}`,
  TAG_LINE: 'Learn. Experiment. Build.',
  FOOTER_MESSAGE: 'Learn more at',
  URL: 'https://composable.com',
  URL_TEXT: 'Composable.com',
} as const

export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''
export const ALGOLIA_API_SEARCH_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_API_SEARCH_KEY ?? ''
export const ALGOLIA_INDEX_NAME =
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ''

export const ALGOLIA_SORTING_OPTIONS = [
  { label: 'Newest Arrivals', value: ALGOLIA_INDEX_NAME },
  { label: 'Price (High to Low)', value: `${ALGOLIA_INDEX_NAME}_priceDesc` },
  { label: 'Price (Low to High)', value: `${ALGOLIA_INDEX_NAME}_priceAsc` },
  { label: 'Name', value: `${ALGOLIA_INDEX_NAME}_nameAsc` },
]

export const GOOGLE_TAG_MANAGER_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
export const PASSWORD_MIN_LENGTH = 8
export const LAZY_LOAD_BATCH_SIZE = 3
