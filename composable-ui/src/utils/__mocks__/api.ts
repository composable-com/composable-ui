import { mockData as commerceMock } from '@composable/commerce-generic'
import { mockData as cmsMock } from '@composable/cms-generic'

export const api = {
  commerce: {
    getCategoryBy: {
      useQuery: (params: { slug: string }) => {
        return {
          data: {
            products: commerceMock.products.slice(0, 3),
          },
        }
      },
    },
    getProducts: {
      useQuery: () => {
        return {
          data: commerceMock.products,
        }
      },
    },
  },
  cms: {
    getPage: {
      useQuery: jest.fn().mockReturnValue({
        data: {
          ...cmsMock.pages.find((page) => page.slug === '/'),
          items: [
            {
              __typename: 'BannerSplit',
            },
            {
              __typename: 'BannerFull',
            },
            {
              __typename: 'BannerTextOnly',
            },
            {
              __typename: 'BannerTextOnly',
            },
            {
              __typename: 'Grid',
            },
            {
              __typename: 'CommerceConnector',
            },
          ],
        },
      }),
    },
  },
}
