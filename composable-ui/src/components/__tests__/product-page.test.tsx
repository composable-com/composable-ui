import { fireEvent, waitFor } from '@testing-library/react'

import { mockData } from '@composable/commerce-generic'
import { ProductPage } from '../product-page'
import { render, screen } from 'utils/tests'
import * as translations from '../../server/intl/en-US.json'

const useCartMock = {
  addCartItem: {
    mutate: jest.fn(),
  },
}

const toastMock = jest.fn()
jest.mock('hooks', () => ({
  useCart: jest
    .fn()
    .mockImplementation(
      ({
        onCartItemAddSuccess,
        onCartItemAddError,
      }: {
        onCartItemAddError?: () => void
        onCartItemAddSuccess?: () => void
      }) => {
        onCartItemAddSuccess?.()
        onCartItemAddError?.()
        return useCartMock
      }
    ),
  useToast: () => toastMock,
}))
jest.mock('next-seo')
jest.mock('@composable/ui', () => {
  const { PdpLayout, Gallery } = jest.requireActual('@composable/ui')
  return {
    AlertBox: () => <div data-testid="AlertBox" />,
    Accordion: () => <div data-testid="Accordion" />,
    PdpLayout: PdpLayout,
    Gallery: Gallery,
  }
})
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      slug: 'test',
    },
  }),
}))
jest.mock('utils/api', () => ({
  api: {
    commerce: {
      getProductBy: {
        useQuery: jest
          // base case: has product
          .fn(() => ({
            data: { ...mockData.products[0], id: 'test_product_id' },
            isLoading: false,
          }))
          // case #1: isLoading
          .mockImplementationOnce(() => ({
            data: mockData.products[0],
            isLoading: true,
          }))
          // case #2: No product
          .mockImplementationOnce(() => ({
            data: mockData.products[-1],
            isLoading: false,
          }))
          // case #3: No product images
          .mockImplementationOnce(() => ({
            //@ts-ignore
            data: { ...mockData.products[0], images: null },
            isLoading: false,
          }))
          // case #4: Has product but no product id
          .mockImplementationOnce(() => ({
            //@ts-ignore
            data: { ...mockData.products[0], id: null },
            isLoading: false,
          }))
          // case #5: Has product with product id
          .mockImplementationOnce(() => ({
            data: mockData.products[0],
            isLoading: false,
          })),
      },
    },
  },
}))

describe('testing ProductPage', () => {
  it('case #1 render nothing if isLoading is true', async () => {
    const { container } = render(<ProductPage />, { translations })
    expect(container.childElementCount).toEqual(1)
  })

  it('case #2 lazy load NoMatchPage if no product', async () => {
    jest.doMock('../../components/no-match-page', () => ({
      NoMatchPage: () => <div>no match</div>,
    }))
    render(<ProductPage />, { translations })
    await waitFor(() =>
      expect(screen.getByText(/no match/)).toBeInTheDocument()
    )
  })

  it('case #3 show image-placeholder if no images', async () => {
    render(<ProductPage />, { translations })
    const testImg = document.querySelector('img')
    expect(testImg?.src).toContain('image-placeholder.svg')
  })

  it('case #4 click add to cart button should not call addCartItem if no product id', () => {
    render(<ProductPage />, { translations })
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(useCartMock.addCartItem.mutate).toHaveBeenCalledTimes(0)
  })

  it('case #5 click add to cart button should call addCartItem if product id is valid', () => {
    render(<ProductPage />, { translations })
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(useCartMock.addCartItem.mutate).toHaveBeenCalledTimes(1)
  })

  it('call addCartItem with correct quantity when add to cart button is clicked', () => {
    render(<ProductPage />, { translations })
    fireEvent.click(screen.getByLabelText('Increment'))
    fireEvent.click(screen.getByLabelText('Increment'))
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(useCartMock.addCartItem.mutate).toBeCalledWith({
      productId: 'test_product_id',
      quantity: 3,
    })
    expect(toastMock).toBeCalled()
  })

  it('renders AlertBox', () => {
    render(<ProductPage />, { translations })
    expect(screen.getByTestId(/AlertBox/)).toBeInTheDocument()
  })

  it('renders Accordion', () => {
    render(<ProductPage />, { translations })
    expect(screen.getByTestId(/Accordion/)).toBeInTheDocument()
  })
})
