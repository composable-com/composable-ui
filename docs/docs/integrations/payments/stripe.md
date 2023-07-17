---
sidebar_position: 5
---
# Stripe Integration

The checkout experience in Composable UI is pre-integrated with Stripe using the following to enable payments by credit card:

- The [Stripe Payment Intents API](https://stripe.com/docs/payments/payment-intents) that enables complex checkout experience flows.
- The [Stripe Payment Element](https://stripe.com/docs/payments/payment-element), which is an embeddable UI component for handling sensitive customer information, such as credit cards.

## Reference Files

### Backend files

- `packages/stripe`: This package contains services used to communicate to the Stripe REST API.
- `composable-ui/src/server/api/routers/stripe.ts`: This file defines the API routes that allow the frontend React components to consume the services defined in `packages/stripe`
### React Components
  - `composable-ui/src/components/checkout/step-2/step-2.tsx`: The Step 2 of the Checkout flow brings in the embeddable Stripe [`Element`](https://stripe.com/docs/payments/payment-element) component to allow up to 25+ payment methods with a single integration.

## Integrating Stripe with Composable UI

1. [Create a Stripe account](https://dashboard.stripe.com/register).
2. [Retrieve your API keys](https://stripe.com/docs/keys#reveal-an-api-secret-key-for-test-mode) from your Stripe dashboard and set the following environment variables:

:::caution
Ensure that you never expose your Stripe secret keys in the `NEXT_PUBLIC_*` environment variables or in client-side code. Take the necessary steps to ensure that secret keys are never disclosed to the public.
:::


```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

For more information about the configurations, see the [Application Configuration](essentials/configuration.md) section.

## Stripe tRPC Router

The Composable UI frontend uses Stripe endpoints that are built in the tRPC Stripe router. For more information, see the `composable-ui/src/server/api/routers/stripe.ts` file. This router uses the Composable UI Stripe package `packages/stripe` to perform a secure server to server communication with the [Stripe Payment Intents API](https://stripe.com/docs/payments/payment-intents).

## Related Resources

- [Application Configuration](essentials/configuration.md)
- [Mono-repository](essentials/monorepo.md)
