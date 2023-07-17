---
sidebar_position: 4
---

# Integrating Algolia

1. Sign up for a free Algolia account [here](https://www.algolia.com/users/sign_up).
1. Log into your account.
1. On the **Get Started** page, create your first index with a desired name.
1. Retrieve your Algolia API keys by following these steps:
   1. Go to **Settings > Team and Access > API Keys** and make a note of the following values:
      - **Application ID**
      - **Search API Key**
      - **Admin API Key**
    1. Add your API keys to the `scripts/.env` file and setup your **index name** as in the following example for creating an index named _demo_products_:

    ```
    ALGOLIA_APP_ID=YOUR_APPLICATION_ID
    ALGOLIA_API_ADMIN_KEY=YOUR_WRITE_API_KEY
    ALGOLIA_INDEX_NAME=demo_products
    ```

    1. Add your **Application ID**, **Search API Key**, and **index name** to the `/composable-ui/.env` file as in the following example:
      ```
      NEXT_PUBLIC_ALGOLIA_APP_ID=YOUR_APPLICATION_ID
      NEXT_PUBLIC_ALGOLIA_API_SEARCH_KEY=YOUR_SEARCH_API_KEY
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME=demo_products

      ```
:::info
  Do not include your **Admin API Key** in `/composable-ui/.env`. This key is not required for your Next.js application. For more information about public environment variables in Next.js, see the [Exposing Environment Variables to the Browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser) page.
:::
1. Configure and populate the new index using one of the following options:

- [Integrating Algolia](#integrating-algolia)
  - [Configuring and Populating the New Index Using the Script](#configuring-and-populating-the-new-index-using-the-script)
    - [Prerequisites](#prerequisites)
    - [Procedure](#procedure)
  - [Configuring the Algolia indexes manually](#configuring-the-algolia-indexes-manually)
  - [Related resources](#related-resources)


## Configuring and Populating the New Index Using the Script

Composable UI offers a preconfigured script located in the `scripts` directory. This script performs the following tasks:

- Creates a primary index in Algolia.
- Configures the index by specifying searchable attributes, facets, and replicas.
- Populates the index with product data.

### Prerequisites

- Create an `.env` file in the root of the `scripts` directory and set the following variables:
```
ALGOLIA_APP_ID
ALGOLIA_API_ADMIN_KEY
ALGOLIA_INDEX_NAME
```

You can use the `.env.example` file as a template.

### Procedure

1. Open the terminal and navigate to the `scripts` directory.
1. In the `scripts` directory, run the following command:
  ```
  pnpm install
  ```
1. To set up Algolia, run the following command:
  ```
  pnpm algolia-setup
  ```

## Configuring the Algolia indexes manually

Configuring the Algolia indexes manually requires more time and effort compared to other methods.

1. Import products by doing the following:
    1. If you haven't already created an index, in the Algolia **Getting Started** page, create a new index.

      This is used as the `ALGOLIA_INDEX_NAME` when configuring the replicas in step 3.
    1. In the **Import your records** section, click **Upload your records > Upload file**.
    1. Drag and drop the JSON file, `packages/commerce-generic/src/data/products.json`, that contains the demo products.
    The **Configure** page for your index is displayed.
1. To configure searchable attributes and facets, in the **Configure > Index** page, click the **Configuration** tab and do the following:
   1. In **RELEVANCE ESSENTIALS** -> **Searchable attributes** tab, click **Add a searchable attribute** and add the following attributes:
      - `name`.
      - `category`.

      These attributed are used as the [searchable attributes](https://www.algolia.com/doc/api-reference/api-parameters/searchableAttributes/?utm_medium=page_link&utm_source=dashboard).
   1. In **FILTERING AND FACETING** tab, click **Facets > Add an Attribute** and add the following attributes:
      - `type`
      - `brand`
      - `price`

    These attributes are used for [faceted search](https://www.algolia.com/doc/api-reference/api-parameters/attributesForFaceting/?utm_medium=page_link&utm_source=dashboard) in your application.
1. To create replicas for different sorting options, do the following:
    1. In the top menu, click the **New...** drop-down menu.
    1. Click **Replica**.

      The **Create a new replica** window is displayed with the default replica type set as **Standard Replica (default)**.
    1. Create four replicas, `newest`, `priceDesc`, `priceAsc` and `nameAsc`, in the following format:
      `{ALGOLIA_INDEX_NAME}_{SORTING_OPTION}`.
      For example, if your `ALGOLIA_INDEX_NAME` is `MyFirstIndex`:
        - `MyFirstIndex_newest`
        - `MyFirstIndex_priceDesc`
        - `MyFirstIndex_priceAsc`
        - `MyFirstIndex_nameAsc`
1. For each Replica, to configure sorting to match the name of the index, doo the following:
    1. Go to **Configuration** and click **RELEVANCE ESSENTIALS** > **Ranking and Sorting**.s
    1. Click **+ Add sort-by attribute**, enter the field name.
    1. Select **Ascending** or **Descending** for the sorting order.
    You can create different sorting options by modifying the `ALGOLIA_SORTING_OPTIONS` constant in the application.

:::warning
 To ensure the proper functioning of Composable UI's search feature, the `ALGOLIA_INDEX_NAME` value in your `.env` file and your Algolia index configuration must match. If these values do not match, Composable UI's search functionality will fail.
:::

## Related resources
- [Filtering in Algolia](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/)
- [Faceting in Algolia](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/)
- [Algolia Replicas](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/?utm_medium=page_link&utm_source=dashboard)
