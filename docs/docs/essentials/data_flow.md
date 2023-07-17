---
sidebar_position: 9
---

# Data Flow

Composable UI, uses Next.js API routes as a middle layer between the frontend and third-party services. This architectural approach helps us to keep the code organized and maintain a consistent data flow throughout the application, by separating the frontend logic from the server-side logic.
Also, this approach provides an extra layer of security by allowing us to manage authentication on the server, where sensitive information, such as API keys and access tokens, are securely accessed and managed.

## Authentication

Composable UI uses NextAuth for authentication. NextAuth handles user authentication on the server side and provides a secure and reliable way to authenticate with credentials or third-party services.

## tRPC

Composable UI uses tRPC to communicate between the client and server.

tRPC is a Remote Procedure Call (RPC) framework that simplifies and streamlines data communication between the client and server. It enables you to define server-side functions and automatically generates TypeScript client-side code for these functions. This approach ensures end-to-end type safety and enhances code reliability throughout your application.

The browser sends an HTTP request to an API route using tRPC to call server-side functions, passing any necessary parameters and returning the requested data.

### Adding new data sources

1. Create a new data provider with all the necessary service functions by following the instructions provided by the provider.
 We recommend creating the new data provider as a new package in the `packages` directory.
2. In the `composable-ui/src/server/api/routers` directory,  create a new tRPC router with the required queries and mutations.  
3. Register the router in the `composable-ui/src/server/api/root.ts` file.  

## Related Topics

- [Next.js API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [tRPC](https://trpc.io/docs)
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
