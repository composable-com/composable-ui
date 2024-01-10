import { GetServerSideProps } from 'next'
import { createServerApp } from 'server/isr/server-app'
import { KlevuCategoryPage } from '../../components/klevu/klevu'

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { ssg } = await createServerApp({ context })
  const slug = `${context?.params?.slug?.toString()}`

  return {
    props: {
      trpcState: ssg.dehydrate(),
      category: slug,
    },
  }
}

export default KlevuCategoryPage
