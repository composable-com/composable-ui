import { GetStaticPaths, GetStaticProps } from 'next'
import { createServerApp } from 'server/isr/server-app'
import { ProductPage } from 'components/product-page'

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { ssg } = await createServerApp({ context })
  /* 
      By default, this fetches all product slugs from the commerce API
      to generate product pages during build. Consider selectively
      generating product pages if you have a large number of products.

      The fallback is set to "blocking" to ensure that any new product
      pages added since the last build will be server side rendered.
   */
  const paths = await ssg.commerce.getProductStaticPaths.fetch()

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { ssg } = await createServerApp({ context })
  const slug = `${context?.params?.slug?.toString()}`
  await ssg.commerce.getProductBy.prefetch({ slug })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60,
  }
}

export default ProductPage
