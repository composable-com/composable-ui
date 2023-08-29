import { randomUUID } from 'crypto'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { NextApiRequest, NextApiResponse } from 'next'
import { getCRSFCookieInfo } from 'server/auth-utils'

const authOptions = async (req: NextApiRequest, res: NextApiResponse) => {
  const actionList = req.query.nextauth || []

  if (
    actionList?.includes('signout') ||
    actionList?.includes('credentials') ||
    actionList?.includes('anon')
  ) {
    res.setHeader('Set-Cookie', getCRSFCookieInfo(req).cookieExpire)
  }

  return await NextAuth(req, res, {
    pages: {},
    providers: [
      // See https://next-auth.js.org/providers/google
      GoogleProvider({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      }),
      CredentialsProvider({
        id: 'anon',
        name: 'Anonymous',
        credentials: {},
        async authorize() {
          const anonymousUser = {
            id: randomUUID(),
            name: `anonymous_user`,
            email: `anonymous_user`,
            image: '',
          }
          //anyone can do an anonymous login
          return anonymousUser
        },
      }),
      CredentialsProvider({
        id: 'credentials',
        name: 'Credentials',
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const user = {
            id: randomUUID(),
            name: 'Test User',
            email: 'test@email.com',
            image: '',
          }

          if (
            credentials?.username === 'test@email.com' &&
            credentials?.password === 'password'
          ) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token }) => {
        if (token?.name === 'anonymous_user') {
          return {
            ...token,
            id: token.sub,
            loggedIn: false,
          }
        }
        return {
          ...token,
          id: token.sub,
          loggedIn: true,
        }
      },
      session: async ({ session, user, token }) => {
        return {
          ...session,
          id: token?.sub,
          loggedIn: (token?.loggedIn as boolean) ?? false,
        }
      },
    },
    session: {
      updateAge: 0,
    },
  })
}

export default authOptions
