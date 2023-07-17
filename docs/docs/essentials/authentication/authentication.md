---
sidebar_position: 7
---

# Authentication

Authentication in Composable UI is built with the [NextAuth.js](https://next-auth.js.org/getting-started/introduction) library. NextAuth provides a framework to enable multiple different types of authentication flows like email sign-in, password sign-in, and OAuth sign-in to providers like Google, Apple, and many other OAuth providers. Refer to the [NextAuth Providers](https://next-auth.js.org/providers/) documentation for more information.

Composable UI uses secure encrypted JSON Web Tokens (JWTs) to manage user sessions. The JWTs are stored in a Cookie on the browser, and are encrypted automatically by NextAuth using your [NEXTAUTH_SECRET](https://next-auth.js.org/configuration/options#secret) environment variable. We recommend learning more about the security, advantages, and disadvantages of Json Web Tokens by referring to the [NextAuth JSON Web Tokens FAQ](https://next-auth.js.org/faq#json-web-tokens).

## OAuth Providers

Composable UI supports using any third party OAuth provider for authentication.

You can use the [NextAuth built-in providers](https://next-auth.js.org/configuration/providers/oauth#built-in-providers), or buid your own [custom OAuth provider](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider).

The Composable UI NextAuth configuration in `composable-ui/src/pages/api/auth/[...nextauth].ts` is ready to be setup with the [Google OAuth provider](https://next-auth.js.org/providers/google). To enable Google sign-in, follow the [NextAuth Google Provider](https://next-auth.js.org/providers/google#documentation) documentation including [Google's guide on generating your own Google API keys](https://developers.google.com/identity/protocols/oauth2). Add your API keys the the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` variables in `/composable-ui/.env` (and in Netlify or Vercel if you have deployed your application to one of these platforms). For more information about setting up environment variables, see the [Application Configurations](../configuration.md) section.

## NextAuth Configuration

Composable UI's NextAuth configuration is setup in two files:

- `/composable-ui/src/pages/api/auth/[...nextauth].ts`: Contains the dynamic route handler for NextAuth.js, with all of the global configurations and registered providers.
- `/composable-ui/.env`: Contains the environment variable [`NEXTAUTH_SECRET`](https://next-auth.js.org/configuration/options#nextauth_secret) for JWT encryption when signing in.

## Related Resources

- [Security](../best_practices/security.md)
- [NextAuth built-in OAuth Providers](https://next-auth.js.org/configuration/providers/oauth#built-in-providers)
- [NextAuth JSON Web Tokens FAQ](https://next-auth.js.org/faq#json-web-tokens)
