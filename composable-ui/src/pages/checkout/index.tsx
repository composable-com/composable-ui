import { GetServerSideProps } from 'next'
import { createServerApp } from 'server/isr/server-app'
import { CheckoutPage } from 'components/checkout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ssg } = await createServerApp({ context })
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    // restart the checkout if the user refreshes the page
    redirect: context.query.step ? { destination: '/checkout' } : undefined,
  }
}

export default CheckoutPage
