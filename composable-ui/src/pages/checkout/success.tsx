import { GetServerSideProps } from 'next'
import { CheckoutSuccessPage } from 'components/checkout'
import { createServerApp } from 'server/isr/server-app'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ssg } = await createServerApp({ context })
  const orderId = context.query.order?.toString()
  const paymentIntentId = context.query.payment_intent?.toString() ?? null

  return {
    props: {
      orderId,
      paymentIntentId,
      trpcState: ssg.dehydrate(),
    },
    redirect: !orderId
      ? {
          destination: '/',
        }
      : undefined,
  }
}

export default CheckoutSuccessPage
