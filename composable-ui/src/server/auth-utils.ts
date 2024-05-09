import crypto from 'crypto'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { NextApiRequest } from 'next'

/** Create a hash, using SHA256 */
export function createHash(message: string): string {
  const hash = crypto.createHash('sha256')
  hash.update(message)
  return hash.digest('hex')
}

export const isValidCSRFToken = (opts: CreateNextContextOptions) => {
  const { req } = opts

  // we don't need to verify CSRF tokens on GET requests
  if (req.method === 'GET') return true

  const csrfCookie = req.cookies[getCRSFCookieInfo(req).cookieName]
  const csrfTokenHeader = req.headers['x-csrf-token']

  if (!csrfCookie) {
    //if the browser is not passing a csrfCookie, then we should not proceed with this request
    return false
  }

  const [_, csrfTokenHash] = csrfCookie.split('|')
  const expectedCsrfTokenHash = createHash(
    `${csrfTokenHeader}${process.env.NEXTAUTH_SECRET}`
  )

  if (csrfTokenHash === expectedCsrfTokenHash) {
    // if the CSRF token in the Header matches the CSRF in the Cookie, then we can proceed
    return true
  }

  return false
}

export const getCRSFCookieInfo = (req: NextApiRequest) => {
  //http non secure settings, ie during development on local host
  const http_cookieName = `next-auth.csrf-token`
  const http_cookieReset = `SameSite=Lax; HttpOnly; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`

  if (req.headers['x-forwarded-proto'] === 'https') {
    //https secure settings, ie a production deploy or cloud deployment
    //during https, the CSRF cookie is prefixed with __Host-
    const https_cookieName = `__Host-${http_cookieName}`
    const https_cookieReset = `Secure; ${http_cookieReset}`

    return {
      cookieName: https_cookieName,
      cookieExpire: `${https_cookieName}=; ${https_cookieReset}`,
    }
  }

  return {
    cookieName: http_cookieName,
    cookieExpire: `${http_cookieName}=; ${http_cookieReset}`,
  }
}
