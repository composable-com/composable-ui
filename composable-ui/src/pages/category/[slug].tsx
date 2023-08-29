import { GetStaticPaths, GetStaticProps } from 'next'
import { createServerApp } from 'server/isr/server-app'
import { CategoryPage, CategoryPageProps } from 'components/category-page'
import { getServerState } from 'react-instantsearch-hooks-server'
import { renderToString } from 'react-dom/server'
import { IntlProvider } from 'react-intl'
import {
  ALGOLIA_API_SEARCH_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
} from '../../utils/constants'

const ALGOLIA_KEYS = [
  ALGOLIA_APP_ID,
  ALGOLIA_API_SEARCH_KEY,
  ALGOLIA_INDEX_NAME,
]

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { ssg } = await createServerApp({ context })
  const categories = await ssg.commerce.getCategories.fetch()
  const paths =
    categories?.map((category) => ({ params: { slug: category.slug } })) || []
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (
  context
) => {
  const { ssg } = await createServerApp({ context })
  const slug = `${context?.params?.slug?.toString()}`
  await ssg.commerce.getCategoryBy.prefetch({ slug })

  const algoliaKeysMissing = ALGOLIA_KEYS.some((key) => !key)

  if (algoliaKeysMissing) {
    return {
      props: {
        trpcState: ssg.dehydrate(),
        algoliaKeysSet: !algoliaKeysMissing,
        query: slug,
      },
      revalidate: 60,
    }
  }

  const intlConfig = await ssg.config.intl.fetch()
  const messages = intlConfig?.find((el) => el.locale === context.locale)

  const serverState = await getServerState(
    <IntlProvider locale={context.locale ?? ''} messages={messages?.keys ?? {}}>
      <CategoryPage query={slug} algoliaKeysSet={!algoliaKeysMissing} />
    </IntlProvider>,
    { renderToString }
  )

  return {
    props: {
      trpcState: ssg.dehydrate(),
      algoliaKeysSet: !algoliaKeysMissing,
      query: slug,
      serverState,
    },
    revalidate: 60,
  }
}

export default CategoryPage
