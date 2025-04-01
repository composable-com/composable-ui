import { useCallback, useMemo, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'utils/api'
import { useSession } from 'next-auth/react'
import { Wishlist } from '@composable/types'

const USE_WISHLIST_KEY = 'useWishlistKey'

export type WishlistData = Partial<Wishlist> & {
  isLoading: boolean
  isEmpty: boolean
}

interface UseWishlistOptions {
  onWishlistItemAddError?: () => void
  onWishlistItemRemoveError?: () => void
  onWishlistItemAddSuccess?: (wishlist: Wishlist) => void
}

export const useWishlist = (userId?: string, options?: UseWishlistOptions) => {
  // const session = useSession();
  // const userId = session?.data?.id || '' as string;
  const queryClient = useQueryClient()
  const { client } = api.useContext()
  const optionsRef = useRef(options)
  optionsRef.current = options

  /**
   * Fetch Wishlist
   */
  const { data: wishlist, status } = useQuery(
    [USE_WISHLIST_KEY, userId],
    async () => {
      if (!userId) return undefined
      const response = await client.commerce.getWishlist.query({ userId })
      return response
    },
    {
      enabled: !!userId,
      retry: false,
      keepPreviousData: true,
    }
  )

  /**
   * Create Wishlist
   */
  const wishlistCreate = useMutation(
    ['wishlistCreate'],
    async (name: string) => {
      if (!userId) throw new Error('User not authenticated')
      debugger
      const response = await client.commerce.createWishlist.mutate({
        userId: userId,
        name,
        items: [],
      })
      debugger
      return response
    }
  )

  /**
   * Add Wishlist Item
   */
  const wishlistItemAdd = useMutation(
    ['wishlistItemAdd'],
    async (variables: {
      productId: string
      name: string
      brand: string
      sku: string
      type: string
      price: number
      image: {
        url: string
        alt?: string
      }
      slug: string
    }) => {
      debugger
      if (!userId) {
        debugger
        throw 'no user id error'
      }
      const response = await client.commerce.addWishlistItem.mutate({
        wishlistId: userId,
        userId: userId,
        ...variables,
      })
      queryClient.setQueryData([USE_WISHLIST_KEY, userId], response)
      return response
    },
    {
      onError: optionsRef.current?.onWishlistItemAddError,
      onSuccess: optionsRef.current?.onWishlistItemAddSuccess,
    }
  )

  /**
   * Remove Wishlist Item
   */
  const wishlistItemRemove = useMutation(
    ['wishlistItemRemove'],
    async (variables: { userId: string; itemId: string }) => {
      const response = await client.commerce.removeWishlistItem.mutate(
        variables
      )
      queryClient.setQueryData([USE_WISHLIST_KEY, variables.userId], response)
      return response
    },
    {
      onError: options?.onWishlistItemRemoveError,
    }
  )

  /**
   * Delete Wishlist
   */
  // const wishlistDelete = useMutation(
  //   ['wishlistDelete'],
  //   async (variables: { wishlistId: string }) => {
  //     await client.commerce.deleteWishlist.mutate(variables)
  //     queryClient.removeQueries([USE_WISHLIST_KEY, variables.userId])
  //   }
  // )

  const data = useMemo(() => {
    return {
      wishlist,
      isLoading: status === 'loading',
      isEmpty: !wishlist?.items?.length,
    }
  }, [wishlist, status])

  return {
    ...data,
    createWishlist: wishlistCreate.mutateAsync,
    addWishlistItem: wishlistItemAdd.mutateAsync,
    removeWishlistItem: wishlistItemRemove.mutateAsync,
    // deleteWishlist: wishlistDelete.mutateAsync,
  }
}
