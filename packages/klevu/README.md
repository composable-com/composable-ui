# Integrating Klevu Components into Composable-UI

## Introduction
Klevu is a powerful AI-driven search solution designed to enhance e-commerce
platforms. It offers advanced search capabilities, including autocomplete,
natural language processing, and machine learning insights to improve the user
experience. This guide outlines how to integrate Klevu components into the
Composable-UI project, enhancing your site with Klevu's robust search
functionalities.

## Installation and Setup

1. **Navigating to the Project Directory:** Open your terminal and navigate to
   your local `composable-ui` project directory:
   ```bash
   cd path/to/composable-ui
   ```

2. **Installing Required Packages:** Use `pnpm` to install the necessary Klevu
   packages:
   ```bash
   pnpm install @klevu/ui @klevu/ui-react @klevu/core
   ```

3. **Copying Icons:** Copy the Klevu UI icons from the `node_modules` to the
   `public/assets` directory:
   ```bash
   cp -R node_modules/@klevu/ui/dist/klevu-ui/assets/ public/assets/
   ```

4. **Setting Up Klevu Components:** Create the `klevu` folder inside
   `src/components` and copy the `klevu.tsx` file:
   ```bash
   mkdir -p src/components/klevu
   cp ../packages/klevu/copythese/klevu.tsx src/components/klevu/klevu.tsx
   ```

5. **Adding styles:** Add following two imports to `_app.tsx`

   ```typescript
   import '@composable/klevu/node_modules/@klevu/ui-react/dist/klevu-ui.css'
   import '@composable/klevu/style.css'
   ```

   Then you can modify the style in `packages/klevu/style.css`

6. **Configuring Category Pages:** Copy and replace the `[slug].tsx` file for
   category pages:
   ```bash
   cp ../packages/klevu/copythese/[slug].tsx src/pages/category/[slug].tsx
   ```

7. **Setting Up the Search Page:** Copy the `search.tsx` file to set up the
   search functionality:
   ```bash
   cp ../packages/klevu/copythese/search.tsx src/pages/search.tsx
   ```

8. **Adding QuickSearch Component:** Integrate the `QuickSearch` component into
   the header:
   - First, open `composable-ui/src/components/layout/header.tsx`.
   - Import the `QuickSearch` component:
     ```javascript
     import { QuickSearch } from 'components/klevu/klevu';
     ```
   - Add the `<QuickSearch />` component to the desired location within the
     `header.tsx` file.

## Running the Project
After completing the above steps, you can start the project to see the Klevu
components in action:
```bash
pnpm run dev
```

This will launch the Composable-UI project with Klevu's enhanced search
capabilities, providing a seamless and efficient search experience for your
users.

# Data Indexing in Klevu

## Overview

Klevu provides a robust solution for indexing data to enhance the search
functionality in e-commerce platforms. This process involves the categorization
and organization of your site's content, making it searchable and improving
overall user experience.

## Indexing Script
Located in the scripts folder, Klevu offers an alternative method for indexing
data. This script is tailored to interact with your site's data structure and
Klevu's search API. It's important to note that the attributes in the script
should be modified according to your specific data requirements and structure.

## Environment Variables
To securely interact with Klevu's API, you'll need to set up environment
variables in a .env file. This file should include your unique Klevu API and
REST keys, which can be found in the Klevu Merchant Center. Add these lines to
your .env file:

```env
# Klevu API key that is found in the Klevu Merchant Center
KLEVU_API_KEY=

# Klevu REST key that is found in the Klevu Merchant Center
KLEVU_REST_KEY=
```

## Modifying the Indexing Script
Before running the script, ensure that it is tailored to your site's specific
data structure. The script provided requires customization to match the
attributes and data types you wish to index. This step is crucial for accurate
and efficient search functionality.

## Running the Script
Once the script is customized and the environment variables are set, you can
execute the indexing process with the following command:

```bash
pnpm run klevu-setup
```

This command will initiate the script, which interacts with Klevu's API to index
your site's data, preparing it for an enhanced search experience.

## Getting the `display` key to work

`display` is a special property in the indexing. It can be used to pass any data
from to the frontend. But for it to work you need contact `support@klevu.com` and
request `additionalDataToReturn` to be enabled.