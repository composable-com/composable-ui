import { createReplicas, saveProducts, setIndexSettings } from './algolia'
import {
  ALGOLIA_APP_ID,
  ALGOLIA_API_ADMIN_KEY,
  ALGOLIA_INDEX_NAME,
  PRIMARY_INDEX_SETTINGS,
  REPLICAS,
} from './config'
import products from '../../../packages/commerce-generic/src/data/products.json'

const ALGOLIA_KEYS = [ALGOLIA_APP_ID, ALGOLIA_API_ADMIN_KEY, ALGOLIA_INDEX_NAME]
const algoliaKeysMissing = ALGOLIA_KEYS.some((key) => !key)

const algoliaSetup = async () => {
  console.log('Starting setting up Algolia!')
  try {
    if (algoliaKeysMissing) {
      console.error(
        'You are missing some Algolia keys in your .env file.',
        `You must set the following: ALGOLIA_APP_ID, ALGOLIA_API_ADMIN_KEY, ALGOLIA_INDEX_NAME.`
      )
      throw new Error('ALGOLIA_MISSING_KEYS')
    }
    const parsedProducts = products.map((product) => ({
      ...product,
      objectID: product.id,
    }))
    await setIndexSettings({ settings: PRIMARY_INDEX_SETTINGS })
    await saveProducts({ products: parsedProducts })
    await createReplicas({ replicas: REPLICAS })
    console.log('Finished setting up Algolia!')
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

;(async () => {
  await algoliaSetup()
})()
