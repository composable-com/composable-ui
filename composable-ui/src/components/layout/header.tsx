import { useComposable, useCart } from 'hooks'
import { Logo } from 'components/logo'
import { CartIcon } from 'components/cart'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Link,
} from '@chakra-ui/react'
import { LoginAction } from './login-action'
import { cmsNavLinks } from './_data'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { MenuItem } from 'components/menu/menu-item'
import NextLink from 'next/link'

export const Header = () => {
  const { cart } = useCart()
  const { cartDrawer, menuDrawer } = useComposable()
  const {
    query: { slug },
  } = useRouter()

  return (
    <Box as="header" borderBottomWidth="1px" height={'4rem'}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={'repeat(3, 1fr)'}
          justifyContent={'center'}
          height={'4rem'}
        >
          <Box display={{ base: 'flex', md: 'none' }}>
            <Center>
              <Button
                name="menu"
                aria-label="menu"
                width={'40px'}
                variant="unstyled"
                onClick={() =>
                  menuDrawer?.isOpen
                    ? menuDrawer.onClose()
                    : menuDrawer.onOpen()
                }
              >
                <HamburgerIcon width={'26px'} height={'26px'} />
              </Button>
            </Center>
          </Box>
          <Flex
            alignItems={'center'}
            justifyContent={{ base: 'center', md: 'left' }}
          >
            <Link as={NextLink} href="/">
              <Logo h="21px" />
            </Link>
          </Flex>
          <Box
            as="nav"
            display={{ base: 'none', md: 'flex' }}
            justifyContent="center"
          >
            {cmsNavLinks.map((el) => {
              return (
                <MenuItem
                  label={el.name}
                  href={`/category/${el.slug}`}
                  key={el.slug}
                  state={el.slug === slug ? 'Active' : 'Default'}
                  rootProps={{
                    height: 'full',
                  }}
                />
              )
            })}
          </Box>
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent="flex-end"
            gap={3}
          >
            <Box display={{ base: 'none', md: 'flex' }}>
              <LoginAction />
            </Box>
            <Button
              variant="unstyled"
              aria-label={`${cart.quantity} items in your shopping cart`}
              height="auto"
              width="auto"
              ml={5}
              mr={2}
              aria-expanded={cartDrawer.isOpen}
              onClick={() => cartDrawer.onOpen()}
            >
              <CartIcon cartQuantity={cart.quantity} />
            </Button>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
