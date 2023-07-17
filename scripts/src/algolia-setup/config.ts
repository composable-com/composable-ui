import { config } from 'dotenv'
config()

export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
export const ALGOLIA_API_ADMIN_KEY = process.env.ALGOLIA_API_ADMIN_KEY
export const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME

// Algolia defaults
export const DEFAULT_RANKING_OPTIONS = [
  'typo',
  'geo',
  'words',
  'filters',
  'proximity',
  'attribute',
  'exact',
]

export const PRIMARY_INDEX_SETTINGS = {
  attributesForFaceting: ['type', 'brand', 'price'],
  searchableAttributes: [
    'name',
    'category',
    'type',
    'brand',
    'description',
    'sku',
    'slug',
  ],
  ranking: [...DEFAULT_RANKING_OPTIONS, 'desc(updatedAt)'],
}

export const REPLICAS = [
  {
    name: 'newest',
    ranking: 'desc(updatedAt)',
  },
  {
    name: 'priceDesc',
    ranking: 'desc(price)',
  },
  {
    name: 'priceAsc',
    ranking: 'asc(price)',
  },
  {
    name: 'nameAsc',
    ranking: 'asc(name)',
  },
]
