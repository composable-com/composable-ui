# Composable Scripts

This app contains scripts to support new Composable projects.

For full instructions, see [Integrating Algolia](https://docs.composable.com/docs/integrations/search/algolia) in the Composable UI docs

***

### Setup Algolia for the Category/Product Listing page

The `algolia-setup` node application will:
- Create a primary index in Algolia.
- Set up the index configuration (searchable attributes, facets, replicas).
- Populate the indexes with products data.

##### Prerequisites
Create an `.env` file in the root of this `scripts` app, and set the following variables:
```
ALGOLIA_APP_ID
ALGOLIA_API_ADMIN_KEY
ALGOLIA_INDEX_NAME
```

There's a `.env.example` file that you can use as a starting template.


##### Run
1. Run the `install` command.
```
pnpm install
```

2. Run the `algolia-setup` command.
```
pnpm algolia-setup
```