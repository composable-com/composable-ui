const getSitemapUrl = () => {
  if (process.env.SITEMAP_HOST_URL) {
    return process.env.SITEMAP_HOST_URL
  }

  // Localhost
  return `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}`
}

module.exports = { getSitemapUrl }
