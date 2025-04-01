import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useWishlist } from 'hooks'
import { useSession } from 'next-auth/react'

interface FormData {
  name: string
}

export const NewWishlistPage = () => {
  const intl = useIntl()
  const router = useRouter()
  const toast = useToast()
  const session = useSession()
  const { createWishlist } = useWishlist()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const wishlist = await createWishlist(data.name)

      router.push(`/wishlist/${wishlist.wishlistId}`)
      toast({
        status: 'success',
        description: intl.formatMessage({ id: 'wishlist.createSuccess' }),
      })
    } catch (error) {
      toast({
        status: 'error',
        description: intl.formatMessage({ id: 'app.failure' }),
      })
    }
  }

  if (session.status === 'unauthenticated') {
    router.push('/')
    return null
  }

  return (
    <Container maxW="container.sm" py={{ base: '4', md: '8' }}>
      <NextSeo
        title={intl.formatMessage({ id: 'wishlist.create.title' })}
        noindex
        nofollow
      />

      <Stack spacing={8}>
        <Flex
          gap={{ base: '0.5rem', md: '0.625rem' }}
          mb={'1.5rem'}
          alignItems={'baseline'}
        >
          <Text
            textStyle={{ base: 'Mobile/L', md: 'Desktop/L' }}
            color={'shading.700'}
          >
            {intl.formatMessage({ id: 'wishlist.create.title' })}
          </Text>
        </Flex>

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>
              {intl.formatMessage({ id: 'wishlist.create.nameLabel' })}
            </FormLabel>
            <Input
              {...register('name', {
                required: intl.formatMessage({
                  id: 'wishlist.create.nameRequired',
                }),
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" mt={4} colorScheme="blue" isLoading={false}>
            {intl.formatMessage({ id: 'wishlist.create.submit' })}
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}
