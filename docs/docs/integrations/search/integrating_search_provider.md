---
sidebar_position: 2
---

# Integrating a Search Provider

You can integrate any search engine or search-as-a-service provider that meets your requirements with Composable UI. By default, Composable UI provides an integration with Algolia. By integrating a search provider, you can provide robust search functionality, enabling users to quickly find what they are looking for.

## Choosing a Search Provider

When selecting a search provider for your application, consider factors such as search capabilities, performance, scalability, pricing, and ease of integration. You can choose providers that offer a public API or SDK to handle queries.

After selecting a search provider, sign up to get the necessary API credentials to access their services. These credentials typically include an API key or access token required for authentication and authorization.

For keeping your API credentials and other sensitive information secure, configure them as environment variables in your application. Store the API credentials securely and access them in your code using the appropriate environment variable. For more information on best practices regarding API keys, see the [Security](../../essentials/best_practices/security.md) section.

## Implementing Search Functionality

Composable UI's search experience is powered by [Algolia](./algolia.md) and our Product Listing Page (PLP) is built using the [React InstantSearch Hooks](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react-hooks/).
The components and hooks provided by this library supports making queries and handling the state of the search, which allows you to easily build the following features:
- Show a set of results based on a query on a specific field. For example, the `category` field.
- Refine search using a dynamic set of filters.
- Infinite scrolling, with next pages being loaded when you click the **Show More** button.
- Different sorting options.
- Fetch results on the server and statically generate category pages.

When you change to a different search provider, you must either:
- Replace this functionality with the ones provided by the new service.
- Build your own custom integration to manage queries and state.

You can reuse most of the UI components from the PLP, which you can find in the `composable-ui/src/components/product-listing-page` directory.

## Testing and Optimization

Test your search integration thoroughly to ensure that search queries return accurate and relevant results. Additionally, optimize the search functionality for performance and scalability, considering factors such as caching, indexing strategies, and result ranking.

:::note
The specific implementation details and API references vary depending on the search provider you choose. Refer to the official documentation of your selected search provider for detailed integration instructions and guidance.
:::
