import { useCallback, useMemo, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteFromStorage,
  useLocalStorage,
  writeStorage,
} from 'utils/local-storage'
import { api } from 'utils/api'
import {
  LOCAL_STORAGE_CART_ID,
  LOCAL_STORAGE_CART_UPDATED_AT,
} from 'utils/constants'
import { Cart } from '@composable/types'
import { useSession } from 'next-auth/react'

const USE_CART_KEY = 'useCartKey'

export type CartData = Partial<Cart> & {
  isLoading: boolean
  isEmpty: boolean
  quantity: number
}

const setCartUpdatedAt = (timestamp: number) => {
  writeStorage(LOCAL_STORAGE_CART_UPDATED_AT, timestamp)
}

const deleteCart = () => {
  deleteFromStorage(LOCAL_STORAGE_CART_ID)
}

const setCartId = (id: string) => {
  writeStorage(LOCAL_STORAGE_CART_ID, id)
}

interface UseCartOptions {
  onCartItemAddError?: () => void
  onCartItemUpdateError?: () => void
  onCartItemDeleteError?: () => void
  onCartItemAddSuccess?: (cart: Cart) => void
}

export const useCart = (options?: UseCartOptions) => {
  const session = useSession()
  const queryClient = useQueryClient()
  const { client } = api.useContext()
  const [cartId] = useLocalStorage(LOCAL_STORAGE_CART_ID, '')
  const [updatedAt] = useLocalStorage(LOCAL_STORAGE_CART_UPDATED_AT, Date.now())
  const optionsRef = useRef(options)
  optionsRef.current = options

  /**
   * Fetch Cart
   */
  const { data: cart, status } = useQuery(
    [USE_CART_KEY, cartId, updatedAt],
    async () => {
      const response = await client.commerce.getCart.query({ cartId })
      return response
    },
    {
      enabled: session.status === 'authenticated',
      retry: false,
      keepPreviousData: true,
    }
  )

  /**
   * Cart Create
   */
  const cartCreate = useMutation(['cartCreate'], async () => {
    const response = await client.commerce.createCart.mutate()
    const id = response.id
    setCartId(id)
    return id
  })

  /**
   * Cart Item Add
   */
  const cartItemAdd = useMutation(
    ['cartItemAdd'],
    async (variables: {
      cartId: string
      productId: string
      variantId?: string
      quantity: number
    }) => {
      const params = {
        cartId: variables.cartId,
        productId: variables.productId,
        variantId: variables.variantId,
        quantity: variables.quantity,
      }

      const response = await client.commerce.addCartItem.mutate(params)
      const updatedAt = Date.now()

      queryClient.setQueryData(
        [USE_CART_KEY, variables.cartId, updatedAt],
        response
      )

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: optionsRef.current?.onCartItemAddError,
    }
  )

  /**
   * Cart Item Add Mutation
   */
  const cartItemAddMutation = useCallback(
    async (params: {
      productId: string
      variantId?: string
      quantity: number
    }) => {
      const id = cartId ? cartId : await cartCreate.mutateAsync()
      await cartItemAdd.mutate(
        {
          cartId: id,
          productId: params.productId,
          variantId: params.variantId,
          quantity: params.quantity,
        },
        {
          onSuccess: optionsRef.current?.onCartItemAddSuccess,
        }
      )
    },
    [cartId, cartCreate, cartItemAdd]
  )

  /**
   * Cart Item Update
   */
  const cartItemUpdate = useMutation(
    ['cartItemUpdate'],
    async (variables: { cartId: string; itemId: string; quantity: number }) => {
      const params = {
        cartId: variables.cartId,
        productId: variables.itemId,
        quantity: variables.quantity,
      }

      const response = await client.commerce.updateCartItem.mutate(params)
      const updatedAt = Date.now()

      queryClient.setQueryData(
        [USE_CART_KEY, variables.cartId, updatedAt],
        response
      )

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: options?.onCartItemUpdateError,
    }
  )

  /**
   * Cart Item Update Mutation
   */
  const cartItemUpdateMutation = useCallback(
    async (params: { itemId: string; quantity: number }) => {
      if (!cartId) {
        return
      }

      await cartItemUpdate.mutate({
        cartId,
        itemId: params.itemId,
        quantity: params.quantity,
      })
    },
    [cartId, cartItemUpdate]
  )

  /**
   * Cart Item Delete
   */
  const cartItemDelete = useMutation(
    ['cartItemDelete'],
    async (variables: { cartId: string; itemId: string }) => {
      const params = {
        cartId: variables.cartId,
        productId: variables.itemId,
      }

      const response = await client.commerce.deleteCartItem.mutate(params)
      const updatedAt = Date.now()

      queryClient.setQueryData(
        [USE_CART_KEY, variables.cartId, updatedAt],
        response
      )

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: options?.onCartItemDeleteError,
    }
  )

  /**
   * Cart Item Delete Mutation
   */
  const cartItemDeleteMutation = useCallback(
    async (params: { itemId: string }) => {
      if (!cartId) {
        return
      }

      await cartItemDelete.mutate({
        cartId,
        itemId: params.itemId,
      })
    },
    [cartId, cartItemDelete]
  )

  /**
   * Cart Item Add Facade
   */
  const addCartItem = {
    mutate: cartItemAddMutation,
    isLoading: cartItemAdd.isLoading || cartCreate.isLoading,
  }

  /**
   * Cart Item Update Facade
   */
  const updateCartItem = {
    mutate: cartItemUpdateMutation,
    isLoading: cartItemUpdate.isLoading,
  }

  /**
   * Cart Item Delete Facade
   */
  const deleteCartItem = {
    mutate: cartItemDeleteMutation,
    isLoading: cartItemDelete.isLoading,
  }

  /**
   * Cart data
   */
  const cartData: CartData = useMemo(() => {
    const quantity = cart?.items.reduce((acc, el) => acc + el.quantity, 0) ?? 0
    return {
      ...cart,
      isLoading: status === 'loading',
      isEmpty: !quantity,
      quantity,
    }
  }, [cart, status])

  /**
   * Delete Cart Handler
   */
  const deleteCartHandler = useCallback(() => {
    deleteCart()
    queryClient.setQueryData([USE_CART_KEY], undefined)
    queryClient.removeQueries([USE_CART_KEY])
  }, [queryClient])

  /**
   * Public
   */
  return {
    addCartItem,
    updateCartItem,
    deleteCartItem,
    cart: cartData,
    deleteCart: deleteCartHandler,
  }
}
