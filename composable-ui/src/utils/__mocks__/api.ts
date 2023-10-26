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
              id: '23385feb-cd12-4122-8105-bf5da178d70c',
            },
            {
              __typename: 'BannerFull',
              id: '2d095fdd-e3ea-4f7a-907a-359ef1d0593d',
            },
            {
              __typename: 'BannerTextOnly',
              id: '40433348-1eb0-43fd-99dc-090c79972512',
            },
            {
              __typename: 'BannerTextOnly',
              id: 'a609a45e-f3f2-4cfc-8709-29a08153c9ac',
            },
            {
              __typename: 'Grid',
              id: '9fad8aa3-6e8d-43e2-b79a-492409b49003',
            },
            {
              __typename: 'CommerceConnector',
              id: '662f1110-8a51-4a11-9a8e-730a43d6867d',
            },
          ],
        },
      }),
    },
  },
}
