import { GetStaticProps } from 'next'
import { createServerApp } from 'server/isr/server-app'
import { HomePage } from 'components/home-page'

export const getStaticProps: GetStaticProps = async (context) => {
  // In this particular implementation, the application is using "Static Site Generation" (SSG)
  // to generate pages on the server, which will be served as pre-built HTML files to the client.
  // The purpose of this is to provide fast initial loading times for the user,
  // as well as to reduce the load on the server.

  const { ssg } = await createServerApp({ context })
  await ssg.cms.getPage.prefetch({ slug: 'home' })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    // The cache control mechanism will be relied on to regenerate the page
    // using "Incremental Static Regeneration" (ISR).
    // This is to prevent flashing of content - if the page was refetched every
    // time the user visited it, they would likely see a brief flash of an older
    // version of the page before the updated content is loaded.
    revalidate: 60,
  }
}

export default HomePage
