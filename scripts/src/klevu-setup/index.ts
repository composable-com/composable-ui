import { config } from 'dotenv'
import { createKlevuClient } from '@klevu/indexing'
import products from '../../../packages/commerce-generic/src/data/products.json'
import categories from '../../../packages/commerce-generic/src/data/categories.json'

config()

const KLEVU_API_KEY = process.env.KLEVU_API_KEY
const KLEVU_REST_KEY = process.env.KLEVU_REST_KEY
const BATCH_SIZE = 250

const klevuKeysMissing = [KLEVU_API_KEY, KLEVU_REST_KEY].some((key) => !key)
const cagegoryNameMap = categories.reduce((acc, category) => {
  acc[category.name] = category
  return acc
}, {})

const klevuSetup = async () => {
  console.log('Starting setting up Klevu!')
  try {
    if (klevuKeysMissing) {
      console.error(
        'You are missing some Klevu keys in your .env file.',
        `You must set the following: KLEVU_API_KEY, KLEVU_REST_KEY.`
      )
      throw new Error('KLEVU_MISSING_KEYS')
    }

    const client = createKlevuClient(KLEVU_API_KEY, KLEVU_REST_KEY, {
      logger: true,
    })

    console.log('=== Indexing attributes ===')

    // Create few new attributes that do not exists on the default Klevu index
    const slugResponse = await client.newAttribute({
      parameter: {
        attributeName: 'slug',
      },
      requestBody: {
        datatype: 'STRING',
        filterable: false,
        label: {
          default: 'Slug',
        },
        returnable: true,
        searchable: true,
      },
    })

    console.log(slugResponse.message)

    const brandResponse = await client.newAttribute({
      parameter: {
        attributeName: 'brand',
      },
      requestBody: {
        datatype: 'STRING',
        filterable: true,
        label: {
          default: 'Brand',
        },
        returnable: true,
        searchable: true,
      },
    })

    console.log(brandResponse.message)

    const materialResponse = await client.newAttribute({
      parameter: {
        attributeName: 'materialAndCare',
      },
      requestBody: {
        datatype: 'STRING',
        filterable: false,
        label: {
          default: 'Material & Care',
        },
        returnable: true,
        searchable: true,
      },
    })

    console.log(materialResponse.message)

    console.log('=== Indexing categories ===')

    // index categories
    const categoryResponse = await client.addOrReplaceBatch({
      requestBody: categories.map((category) => ({
        id: category.id,
        type: 'KLEVU_CATEGORY',
        attributes: {
          name: {
            default: category.name,
          },
          categoryPath: category.slug,
          slug: category.slug,
          url: category.slug,
          prices: [],
        },
      })),
    })

    console.log(categoryResponse.message)

    console.log('=== Indexing products ===')

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      // Create a batch
      const batch = products.slice(i, i + BATCH_SIZE)

      const productResponse = await client.addOrReplaceBatch({
        requestBody: batch.map((product) => ({
          id: product.id,
          type: 'KLEVU_PRODUCT',
          relations: {
            categories: {
              values: [cagegoryNameMap[product.category].id],
            },
          },
          attributes: {
            name: {
              default: product.name,
            },
            prices: [
              {
                amount: product.price,
                currency: 'USD',
                type: 'defaultPrice',
              },
              {
                amount: product.price,
                currency: 'USD',
                type: 'salePrice',
              },
            ],
            slug: product.slug,
            url: product.slug,
            brand: product.brand,
            categoryPath: cagegoryNameMap[product.category].slug,
            images: product.images.map((image) => ({
              url: image.url,
              type: 'default',
            })),
            sku: product.sku,
            description: {
              default: product.description,
            },
            materialAndCare: product.materialAndCare,
            inStock: true,
          },
          display: {
            default: product,
          },
        })),
      })

      console.log(productResponse.message)
    }

    console.log('Finished setting up Klevu!')
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

;(async () => {
  await klevuSetup()
})()
