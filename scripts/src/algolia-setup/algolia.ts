import algoliasearch, { SearchIndex } from 'algoliasearch'
import {
  ALGOLIA_APP_ID,
  ALGOLIA_API_ADMIN_KEY,
  ALGOLIA_INDEX_NAME,
  DEFAULT_RANKING_OPTIONS,
} from './config'

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_ADMIN_KEY)

export const setIndexSettings = ({
  settings,
  index = ALGOLIA_INDEX_NAME,
}: {
  settings: Parameters<SearchIndex['setSettings']>[0]
  index?: string
}) => {
  return algoliaClient.initIndex(index).setSettings(settings).wait()
}

export const createReplicas = async ({
  replicas,
  index = ALGOLIA_INDEX_NAME,
}: {
  replicas: { name: string; ranking: string }[]
  index?: string
}) => {
  const _replicas = replicas.map((replica) => ({
    id: `${ALGOLIA_INDEX_NAME}_${replica.name}`,
    ...replica,
  }))

  await algoliaClient
    .initIndex(index)
    .setSettings({ replicas: _replicas.map(({ id }) => id) })
    .wait()

  return Promise.all(
    _replicas.map((replica) =>
      setIndexSettings({
        index: replica.id,
        settings: {
          ranking: [replica.ranking, ...DEFAULT_RANKING_OPTIONS],
        },
      })
    )
  )
}

export const saveProducts = ({
  products,
  index = ALGOLIA_INDEX_NAME,
}: {
  products: Parameters<SearchIndex['saveObjects']>[0]
  index?: string
}) => {
  return algoliaClient
    .initIndex(index)
    .saveObjects(products, { autoGenerateObjectIDIfNotExist: true })
    .wait()
}
