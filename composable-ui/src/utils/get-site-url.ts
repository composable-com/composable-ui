export const getSiteUrl = () => {
  // Vercel Support
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Netlify Support
  if (process.env.NEXT_PUBLIC_NETLIFY_URL) {
    return process.env.NEXT_PUBLIC_NETLIFY_URL
  }

  // Localhost
  return `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}`
}
