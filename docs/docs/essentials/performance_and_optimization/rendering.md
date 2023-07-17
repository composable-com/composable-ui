---
sidebar_position: 4
---

# Server Rendering

Next.js has the ability to render pages on the server. This means that Next.js generates HTML for each page on the server, instead of relying on client-side JavaScript for rendering. Next.js also has the ability to pre-render pages at build time, meaning once a request for a page has occurred, the server can immediately send the page and it's assets to the browser. This results in better core web vital metrics and SEO rankings.

Next.js has two forms of pre-rendering on the server: 
- Static Site Generation (SSG)
- Server Side Rendering (SSR)

### Server Side Rendering

If a page uses Next.js's [Server Side Rendering (SSR)](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering), the page HTML is generated on demand during each request. Pages using SSR export an async function called `getServerSideProps`. On every request, the server calls this function. It is important to note that if your page relies on many network requests to fetch the page data, all of requests will be required to be completed prior to any page data being sent to the browser. Therefore, if your page depends on multiple data sources, using Static Site Generation might be a better option.

```jsx
export default function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
```

### Static Site Generation (SSG)

When Next.js's [Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation), the HTML of a page is generated during the build process, specifically when running `next build`. In production, this generated HTML is reused for each request, allowing it to be cached by a Content Delivery Network (CDN) for improved performance.

When using SSG, it is important to understand that sometimes a page need to be regenerated if the data it depends on has changed. For example, on a product page where the price of a product has changed, it is a good idea to regenerate the static page serving that particular product so customers are seeing the latest price. We recommend using [Incremental Static Regeneration](#incremental-static-regeneration) to control when Next.js rebuilds a page with the most recent data. You can also trigger a page to be re-generated using Next.js's [On-Demand Revalidation](https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration#using-on-demand-revalidation).

- If the page **content** require on external data, use `getStaticProps` to specify how to fetch the content for each page.
- If the page **paths** depend on external data, use `getStaticPaths` to instruct Next.js which page paths to generate during a build
- Much of the time, you'll need to use both `getStaticProps` and `getStaticPaths` to grab a set of both dynamic paths *and* content.

```jsx
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  return { paths }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post
```

### Incremental Static Regeneration 
Next.js allows you to create or update static pages even after building your site. Using [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration), you can perform static generation on a per-page basis without the need to rebuild the entire site.

1. To use ISR, add the [`revalidate` prop](https://nextjs.org/docs/pages/api-reference/functions/get-static-props#revalidate) to `getStaticProps`:
```jsx
export async function getStaticProps({ params }) {
  // ...
  return { 
      props: { post },
      revalidate: 10 // In seconds
  }
}
```

When a request is made to a page that is pre-rendered at build time, it initially shows the cached page. Any requests made to the page during the revalidate window are instantly served from the cache. However, after the revalidate window is elapsed, the next request still displays the cached, stale, page. In such cases, Next.js initiates a background regeneration process for the page. If the regeneration is successful, the cache is invalidated, and the updated page is displayed. If the background regeneration fails, the old page remains the same. This approach ensures that pages are consistently refreshed and updated while providing a seamless user experience.


When a request is made to a path that is not generated, Next.js dynamically renders the page on the server in response to the initial request. Future requests to the same page retrieve the pre-rendered HTML from the cache, avoiding the need for server-side rendering and improving response time.


## Related Topics

- [Rendering in Next.js](https://nextjs.org/docs/pages/building-your-application/rendering)
