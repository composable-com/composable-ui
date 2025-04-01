import { WishlistPage } from 'components/wishlist/wishlist-page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Wishlist() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const wishlistId = session?.user?.email || ''
  // Redirect to login if not authenticated
  useEffect(() => {
    console.log('martin - status', status)
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return null // Or a loading spinner
  }

  if (!session) {
    return null
  }

  return <WishlistPage wishlistId={wishlistId} />
}
