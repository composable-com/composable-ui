# Integrating Conscia Components into Composable-UI


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
1. **Replace the getPage import for the @composable/conscia one:**
   ```javascript
   import { getPage } from '@composable/conscia'
   ```

