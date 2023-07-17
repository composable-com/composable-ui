---
sidebar_position: 6
---
# Sitemap

A sitemap is a file that lists the URLs and metadata of the pages on your website. It serves as a blueprint or guide for search engine crawlers, helping them discover and understand the structure of your website. By optimizing your sitemap, you can enhance your website's visibility and indexing on search engines, improving your overall search engine optimization (SEO) efforts.

## Importance of Sitemaps
Sitemaps offer the following benefits and more:

- **Improved Indexing**: Helps search engine crawlers to discover and index your pages more effectively, ensuring the the website's content is appropriately represented in search engine results.
- **Crawl Efficiency**: Provides a structured overview of your website's pages, making it easier for search engine crawlers to navigate and understand the hierarchy of your content.
- **Enhanced SEO**: Includes additional metadata such as the last modification date, change frequency, and priority in your pages, helping search engines determine the relevancy and freshness of your content, potentially improving your SEO rankings.

## Sitemaps in Composable UI
The Composable UI uses [next-sitemap](https://www.npmjs.com/package/next-sitemap) to generate sitemaps and robots.txt files for both static and dynamic pages of your website. It includes a custom route in `composable-ui/src/pages/sitemap/[slug].tsx` which uses the `getServerSideSitemap` function to return an application/xml dynamic sitemap.

For configuring the next-sitemap settings, you can modify the `composable-ui/next-sitemap.config.js` file. For more details on available configuration options, see the [Configuration Options](https://www.npmjs.com/package/next-sitemap#configuration-options) section.

For proper construction of sitemap URLs during application deployment, ensure that you set the `SITEMAP_HOST_URL` environment variable with the base URL of your website. For example `https://example.com`.

Upon running the `build` script, the `next-sitemap` command is automatically executed as a post-build script, generating the required sitemaps for your website.
