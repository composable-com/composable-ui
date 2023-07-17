---
sidebar_position: 2
---

# Hooks

You can use hooks to share and reuse logic across multiple components within Composable UI and improve maintainability and reusability of the code. The following hooks are located in the `composable-ui/hooks/` directory:

| Hook            | Filepath                  | Description                                                                    |
| --------------- | ------------------------- | ------------------------------------------------------------------------------ |
| `useComposable` | `hooks/use-composable.ts` | Provides access to the `ComposableContext` context.                            |
| `useToast`      | `hooks/use-toast.ts`      | Provides ability to display a toast notification.                               |
| `useCart`       | `hooks/use-cart.ts`       | Manages the shopping cart functionality.                                       |
| `useCheckout`   | `hooks/use-checkout.ts`   | Provides ability to handle checkout functionality, especially placing an order. |

## useComposable

This hook is located at `composable-ui/src/hooks/use-composable.ts`

The `useComposable` hook provides access to a higher level state in your application, managed in the `ComposableContext` context. The following objects are exposed through `useComposable`:

| Function/ Parameter | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `accountDrawer`     | Specifies whether the account drawer is currently being shown or hidden and provides functions to control the drawer states, such as onOpen, OnClose, onToggle. For more information about the function, see the [`useDisclosure`](https://chakra-ui.com/docs/hooks/use-disclosure) section in Chakra UI documentation.    |
| `cartDrawer`        | Specifies whether the cart drawer is currently being shown or hidden and provides functions to control the drawer states, such as onOpen, OnClose, onToggle. For more information about the function, see the [`useDisclosure`](https://chakra-ui.com/docs/hooks/use-disclosure) section in Chakra UI documentation.        |
| `menuDrawer`        | Specifies whether the menu drawer is currently being shown or hidden and provides functions to control the drawer states, such as onOpen, OnClose, onToggle. For more information about the function, see the [`useDisclosure`](https://chakra-ui.com/docs/hooks/use-disclosure) section in Chakra UI documentation.      |
| `locale`            | Specifies the current locale, such as language and currency. |
| `setLocale`         | Specifies the function to update the current locale.         |

### Importing `useComposable`

If a component needs access to a state in `ComposableContext`, you must import the `useComposable` hook within the component.

- To import the `useComposable` hook in a component, add the following code snippet in the component file:

```tsx
import {useComposable} from 'hooks'
```

## `useToast` Hook

Composable UI uses the `useToast` hook to leverage [Chakra UI's toast](https://chakra-ui.com/docs/components/toast) and to display standardized toast notifications.

### Importing `useToast`

-  To use the `useToast` hook, import the hook and use the `toast` function as in the following sample code:

```js
import {useToast} from 'hooks'

const toast = useToast()

toast({
   status: 'error',
   description: 'an error has occured',
})
```

## `useCart` Hook

This hook is located at `composable-ui/src/hooks/use-cart.ts`

The React hook, `useCart`, in Composable UI manages the shopping cart functionality. The hook uses the `cart` object, `addCartItem`, `deleteCartItem`, `updateCartItem` and `deleteCart` for the shopping cart. Optionally, you can use the `options` input parameter with the following options in the `useCart` hook :

| Parameter               | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| `onCartItemAddError`    | Function to execute if adding an item to the cart fails.           |
| `onCartItemUpdateError` | Function to execute if adding an item in the cart fails.           |
| `onCartItemDeleteError` | Function to execute if removing an item from the cart fails.       |
| `onCartItemAddSuccess`  | Function to execute when an item is added t the cart successfully. |

The Composable UI displays an error when any of these optional functions in the `useCart` hook are executed.

### Importing `useCart`

-  To import the `useCart` hook in a component, add the following code snippet in the component file:

```tsx
import {useCart} from 'hooks'
```

## `useCheckout` Hook

This hook is located at `composable-ui/src/hooks/use-checkout.ts`

The React hook, `useCheckout`, in Composable UI manages the checkout operations. The `useCheckout` hook uses functions, such as `publicContext` and `placeOrder`, to manage the checkout operation. The `placeOrder` function is for accessing data related to the checkout, such as current checkout status. The `placeOrder` function is to finalize the checkout operation and to place orders.

### Importing `useCheckout`

-  To import the `useCheckout` hook in a component, add the following code snippet in the component file:

```tsx
import {useCheckout} from 'hooks'
```

## Creating Custom Hooks

You can create custom hooks in Composable UI to share and reuse logic across multiple components. Custom hooks are functions that can call other hooks within the function and it starts with `use`.

1. To create a custom hook in Composable UI, in the `hooks` directory, create a new file with the required name.
1. Add the custom logic within the function.

For example, to create a custom hook that fetches data from an API:

1. Create a new file with the name, `useFetchData.js` in the hooks directory.
1. To add the logic to fetch data from an API, add the following code in the file:

```tsx
import {useQuery} from 'react-query'

export default function useFetchData(url) {
   const {data, isLoading, error} = useQuery(url, async () => {
      const response = await fetch(url)
      const data = await response.json()
      return data
   })

   return {data, isLoading, error}
}
```

In this example, the `useQuery` hook from React Query fetches data from the specified URL. The custom hook returns an object with information, such as loading status and any errors that occur during the query.

After creating a custom hook, you can use it in any component in Composable UI by importing it from the hooks directory as in the following example:

```tsx
import {useFetchData} from 'hooks'
```
