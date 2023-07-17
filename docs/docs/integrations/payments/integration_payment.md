---
sidebar_position: 1
---
# Payment Provider Integration 

You can integrate third-party payment providers to process payments on your application.
Each payment provider has its own API documentation and integration guides. Refer to the integration guides and ensure that you follow the correct steps to ensure a secure and reliable integration. Additionally, you will need to configure credentials, such as API keys or secret keys, to establish a connection between your application and the payment provider's API.

## Reference Files

### Backend files
- `composable-ui/src/server/api/root.ts`: Registers [tRPC routers](https://trpc.io/docs/server/routers). If the integration contains logic that must run on the server side, we recommend creating a new router specific to that payment provider. For more information, see the [Stripe](stripe.md) section.

### React Components
- `composable-ui/src/components/checkout/step-2/step-2.tsx`: Contains the payment method section, which is where the available payment options are displayed to the customer.
