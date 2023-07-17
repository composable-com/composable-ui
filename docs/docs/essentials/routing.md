---
sidebar_position: 6
---
# Routing

Composable UI leverages [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) in Next.js to manage the Product Display Pages (PDP) and Product Listing Pages (PLP), based on a given product or category identifier.

The following table provides the details of the files in the `/pages` directory:

| Filepath |  Description |
| -------- |  ----------- |
| `index.tsx` | The home page file. |
| `404.tsx` | The  standard "Page Not Found" 404 page to display automatically when a requested URL does not exist. |
| `cart.tsx` | The cart page file. |
| `api/*` | [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction), which are server-side endpoints to handle incoming HTTP requests APIs in this directory can run as serverless functions or edge functions. |
| `category/slug.tsx` | A dynamic route to display a PLP based on the product category slug.|
| `checkout.tsx` | The checkout page. Composable UI uses a three-step checkout process. The `index.tsx` file manages the checkout route on the application by using the `CheckoutPage` component to manage the checkout logins. The `success.tsx` file manages the routing of the `/checkout/success` URL. After completing an order, the browser is redirected to the page configured in the `/checkout/success.tsx` file. |
| `products/slug.tsx` | A dynamic route to display a single PDP based on the product slug. |
