import { WishlistPage } from 'components/wishlist'
import { GetStaticProps, GetStaticPaths } from 'next'
import { createServerApp } from 'server/isr/server-app'

export const getStaticProps: GetStaticProps = async (context) => {
  const { ssg } = await createServerApp({ context })
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default WishlistPage
