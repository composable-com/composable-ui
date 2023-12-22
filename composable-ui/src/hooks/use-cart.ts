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
  onCartVoucherAddError?: (errorMessage: string) => void
  onCartVoucherDeleteError?: () => void
  onCartItemAddSuccess?: (cart: Cart) => void
  onCartVoucherAddSuccess?: (
    data: {
      cart: Cart
      success: boolean
    },
    variables: {
      cartId: string
      code: string
    },
    context: unknown
  ) => void
  onCartVoucherDeleteSuccess?: (cart: Cart) => void
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
   * Cart Voucher Add
   */
  const cartVoucherAdd = useMutation(
    ['cartVoucherAdd'],
    async (variables: { cartId: string; code: string }) => {
      const params = {
        cartId: variables.cartId,
        code: variables.code,
      }

      const response = await client.commerce.addVoucher.mutate(params)
      const updatedAt = Date.now()
      queryClient.setQueryData(
        [USE_CART_KEY, variables.cartId, updatedAt],
        response.cart
      )

      setCartUpdatedAt(updatedAt)

      if (!response.success && optionsRef.current?.onCartVoucherAddError) {
        optionsRef.current?.onCartVoucherAddError(
          response.errorMessage || `Could not add ${variables.code} voucher`
        )
      }

      return response
    },
    {
      onError: optionsRef.current?.onCartVoucherAddError,
    }
  )

  /**
   * Cart Voucher Add Mutation
   */
  const cartVoucherAddMutation = useCallback(
    async (params: { cartId: string; code: string }) => {
      const id = cartId ? cartId : await cartCreate.mutateAsync()
      cartVoucherAdd.mutate(
        {
          cartId: id,
          code: params.code,
        },
        {
          onSuccess: optionsRef.current?.onCartVoucherAddSuccess,
        }
      )
    },
    [cartId, cartCreate, cartVoucherAdd]
  )

  /**
   * Cart Voucher Delete
   */
  const cartVoucherDelete = useMutation(
    ['cartVoucherDelete'],
    async (variables: { cartId: string; code: string }) => {
      const params = {
        cartId: variables.cartId,
        code: variables.code,
      }

      const response = await client.commerce.deleteVoucher.mutate(params)
      const updatedAt = Date.now()

      queryClient.setQueryData(
        [USE_CART_KEY, variables.cartId, updatedAt],
        response
      )

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: optionsRef.current?.onCartVoucherDeleteError,
    }
  )

  /**
   * Cart Voucher Delete Mutation
   */
  const cartVoucherDeleteMutation = useCallback(
    async (params: { cartId: string; code: string }) => {
      const id = cartId ? cartId : await cartCreate.mutateAsync()
      await cartVoucherDelete.mutate(
        {
          cartId: id,
          code: params.code,
        },
        {
          onSuccess: optionsRef.current?.onCartVoucherDeleteSuccess,
        }
      )
    },
    [cartId, cartCreate, cartVoucherDelete]
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
   * Cart Voucher Add Facade
   */
  const addCartVoucher = {
    mutate: cartVoucherAddMutation,
    isLoading: cartVoucherAdd.isLoading || cartCreate.isLoading,
  }

  /**
   * Cart Voucher Delete Facade
   */
  const deleteCartVoucher = {
    mutate: cartVoucherDeleteMutation,
    isLoading: cartVoucherDelete.isLoading || cartCreate.isLoading,
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
    addCartVoucher,
    deleteCartVoucher,
    cart: cartData,
    deleteCart: deleteCartHandler,
  }
}
