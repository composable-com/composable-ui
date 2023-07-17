import { GetStaticPropsContext } from 'next'
import superjson from 'superjson'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '../api/root'

export const createServerApp = async (params: {
  context: GetStaticPropsContext
}) => {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {
      session: null,
    },
    transformer: superjson,
  })

  await ssg.config.intl.prefetch()

  return {
    ssg,
  }
}
