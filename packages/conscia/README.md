# Integrating Conscia Components into Composable-UI

Read more about the Conscia.ai composable orchestration integration with Composable UI and what it accomplishes [here](https://docs.composable.com/docs/integrations/orchestration/conscia).

# Installation and Setup

1. **Navigating to the Project Directory:** Open your terminal and navigate to your local `composable-ui` project directory and then move to `composable-ui` subfolder.
   ```bash
   cd path/to/composable-ui/composable-ui
   ```
1. **Install the @composable/conscia package**:
   ```bash
   pnpm install @composable/conscia
   ```
1. **Set the required environment variables:** 

   ```shell
   NEXT_PUBLIC_CONSCIA_BASE_URL=https://...conscia.io/api
   NEXT_PUBLIC_CONSCIA_TOKEN=
   NEXT_PUBLIC_CONSCIA_CUSTOMER_CODE=
   ```
1. **Update your storefront to use the Conscia data fetching service:**

The `cmsRouter`, defined in `composable-ui/src/server/api/routers/cms.ts`, provides your storefront with a data fetching function called `getPage`, which retrieves the data that is used to populate the content on your storefront. By default this function returns data retrieved from a local file. 

In order to use data from Conscia, the `cmsRouter` needs to use the `getPage` data fetching service defined in `@composable/conscia`, instead of from `@composable/cms-generic`. Change the code as follows:


   ```javascript
   // cms.ts - before changes
   import { getPage } from '@composable/cms-generic'

...

   // cms.ts - after changes
   import { getPage } from '@composable/conscia'
   ```

:::note
Don't forget to update the `composable-ui/next.config.js` file with the image domains that you will be receiving. For example, 

```json
images: {
      domains: ['loremflickr.com', 'images.contentstack.io', ...]
}
```
:::