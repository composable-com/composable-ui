---
sidebar_position: 3
---
# State

Composable UI uses [tRPC with React Query](https://trpc.io/docs/reactjs/introduction) to provide functionality for fetching, mutating, caching, and synchronizing server state to all Components in the application.

The following hooks in React Query manages states in Composable UI:

- [`useQuery`](https://react-query-v3.tanstack.com/reference/useQueries#_top): Retrieves data from an API endpoint and manages its caching, synchronization, and updating. You can pass following arguments to the hook:

  - A key that represents the unique identifier for the query.
  - A query function that returns the data you want to retrieve.

- [`useMutation`](https://react-query-v3.tanstack.com/reference/useMutation): Updates the server state as required.

You can import React Query hooks as in the following example:

```tsx
import { useMutation } from '@tanstack/react-query'
```

You may also want to use React Query for other parts of your project whenever you want to query data from external APIs.

## Related Resources

- [tRPC + React Query documentation](https://trpc.io/docs/reactjs/introduction)
- [React Query documentation](https://react-query-v3.tanstack.com/overview)
- [Hooks documentation](/docs/essentials/composition/hooks)
