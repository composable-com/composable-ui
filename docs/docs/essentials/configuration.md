---
sidebar_position: 4
---

# Application Configuration

## Environment Variables for Composable UI

Composable UI depends on a set of environment variables to showcase certain pre-built features, like Stripe payments or Algolia product filtering. Each integration has its own set of environment variables, which often include API keys. You must configure those variables in the `/composable-ui/.env.local` file to make sure that the integration runs successfully in the local environment.

| Environment Variable | Description |
| - | - |
| [`NEXTAUTH_SECRET`](https://next-auth.js.org/configuration/options#nextauth_secret) | The environment variable used for JWT encryption when signing in. NEXTAUTH_SECRET  **must** be set or an error will occur. See the NextAuth [docs](https://next-auth.js.org/configuration/options#secret) for more information, including a script for how to generate a secure secret that will be used for cookie JWT encryption. This secret is also used to mitigate Cross Site Request Forgery attacks. |
| [`NEXTAUTH_URL`](https://next-auth.js.org/configuration/options#nextauth_url) | (*Optional*) The environment variable used to determine the URL of your application. You must use the canonical URL of your site for this variable.|
| [`NEXT_PUBLIC_ALGOLIA_APP_ID`](../integrations/search/algolia.md) |  (*Optional*) The unique ID for an Algolia application, which is used to identify you when using Algolia's API. |
| [`NEXT_PUBLIC_ALGOLIA_API_SEARCH_KEY`](../integrations/search/algolia.md) |  (*Optional*) The public Algolia API key that allows search queries on your Algolia data. |
| [`NEXT_PUBLIC_ALGOLIA_INDEX_NAME`](../integrations/search/algolia.md) |  (*Optional*) The Algolia primary index name queried by Composable UI. |
| [`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`](../integrations/payments/stripe.md) |  (*Optional*) Public key used in the browser to initialize Stripe API operations. |
| [`STRIPE_SECRET_KEY`](../integrations/payments/stripe.md) |  (*Optional*) Server side key for use on privileged Stripe API operations. |
|[`GOOGLE_CLIENT_ID`](https://next-auth.js.org/providers/google) |  (*Optional*) The ID to set up Google as an identity provider. |
| [`GOOGLE_CLIENT_SECRET`](https://next-auth.js.org/providers/google) |  (*Optional*) The client secret code to set up Google as the identity provider.  |
| [`NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`](../essentials/google.md) |  (*Optional*) The Google Tag Manager container ID.  |
| [`SITEMAP_HOST_URL`](./best_practices/sitemap.md) |  (*Optional*) The environment variable that is used to determine the URL of your application for sitemap files. |

For Example:

```shell
GOOGLE_ID=1234567890abcdefg
GOOGLE_SECRET=0987654321zyxwvutsr
NEXTAUTH_URL=https://example.com
NEXTAUTH_SECRET=AbcDeFgHiJkLmNoPqRsTuVwXyZ1234567890
```

:::danger NEXTAUTH_SECRET
**NEXTAUTH_SECRET** must be set, or an error will be thrown by NextAuth. [See the NextAuth docs for more](https://next-auth.js.org/configuration/options#secret)
:::


### How do I configure my Production environment variables?

If you have deployed Composable UI to Vercel or Netlify, you will need to setup the environment variables on those platforms. Refer to each cloud provider's documentation for how to setup and manage environment variables for Vercel and Netlify hosted deployments.
- [Setting environment variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Setting environment variables in Netlify](https://docs.netlify.com/environment-variables/overview/)

See the Composable UI docs for a [1-click deployment](../build_and_deploy/deploy.md) to Vercel or Netlify.
### Want to learn how to setup Algolia? 
See the Composable UI [Algolia Integration](../integrations/search/algolia.md) guide.
### Want to learn how to setup Stripe? 
See the Composable UI [Stripe Integration](../integrations/payments/stripe.md) guide.


:::info
When configuring environment variables in Next.js, note that any variable prefixed with `NEXT_PUBLIC_` [is exposed to the browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser). Ensure to only expose data that is required in the browser and do not prefix API keys with escalated privileges with `NEXT_PUBLIC_`.
:::
## Constants for the Application

Composable UI references the values configured in the `composable-ui/src/utils/constants.ts` file while running the application. These constants provide the values of environment variables for the variables within the application code. You can update the `constants.ts` file with the constant values as required for the following settings and more:

- Values for the environment variables
- The mega menu and footer IDs
- The product channel
- List of locales available
- Configuration of integration variables

For example, you can set values as required for the name of your website, the default format of the title for every page, the favicon, and the default currency:

```tsx
export const APP_CONFIG = {
  NAME: 'Composable UI',
  TITLE_TEMPLATE: '%s | Composable UI',
  FAVICON: '/img/favicon.ico',
  CURRENCY_CODE: 'USD',
  IMAGE_PLACEHOLDER: '/img/image-placeholder.svg',
  COPYRIGHT: `© Copyright ${new Date().getFullYear()}`,
  TAG_LINE: 'Create beautiful websites really, really fast.',
  URL: 'https://composable.com',
} as const
```

### Using the application constants in the code

To use the application configurations defined in the `/composable-ui/src/utils/constants.ts` file, import the file and reference the variables. The `constants.ts` file contains various configurations for the application, such as URLs or API keys.

For example, the following code sample imports the constant, `APP_CONFIG`, from  the `utils/constants` file and displays the details of the application:

```tsx
import { APP_CONFIG } from 'utils/constants'
...
<Text>{APP_CONFIG.NAME}</Text>
...
```

:::tip
We recommend storing your constants centrally in the `constants.ts` file instead of maintaining different files.
:::

## Related Topics

- [Project Structure](project_structure.md)
- [Integrations](../integrations/overview.md)
- [Hooks](essentials/composition/hooks.md)
