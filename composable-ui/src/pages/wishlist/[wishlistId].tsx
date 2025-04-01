import { WishlistPage } from 'components/wishlist'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const { wishlistId } = router.query
  return <WishlistPage editable={false} wishlistId={wishlistId as string} />
}

export default Page
