import { render, screen } from 'utils/tests'
import { CartSummary } from '../cart-summary'
import { cartData } from '../__data__/cart-data'
import { fireEvent } from '@testing-library/react'

const pushMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: pushMock,
  }),
}))
jest.mock('hooks', () => ({
  useCart: () => {
    return {
      cart: {
        summary: {
          subtotalPrice: 70,
          shipping: 10,
          taxes: 15,
          totalPrice: 95,
        },
      },
    }
  },
}))

const translations = {
  'action.proceedToCheckout': 'Proceed to Checkout',
  'cart.summary.orderTotal': 'Order Total',
  'cart.summary.shipping': 'Shipping Label',
  'cart.summary.subtotal': 'Subtotal',
  'cart.summary.taxes': 'Taxes Label',
  'cart.summary.title': 'Cart Title',
}

describe('CartSummary', () => {
  it('renders the cart summary', () => {
    render(<CartSummary />, {
      translations,
    })

    const title = screen.getByText(translations['cart.summary.title'])
    // subtotalPrice
    const subtotalPrice = screen.getByText('$70.00')
    const subtotalLabel = screen.getByText(
      translations['cart.summary.subtotal']
    )
    // shipping
    const shippingPrice = screen.getByText('$10.00')
    const shippingLabel = screen.getByText(
      translations['cart.summary.shipping']
    )
    // taxes
    const taxesPrice = screen.getByText('$15.00')
    const taxesLabel = screen.getByText(translations['cart.summary.taxes'])
    // totalPrice
    const totalPrice = screen.getByText('$95.00')
    const totalPriceLabel = screen.getByText(
      translations['cart.summary.orderTotal']
    )
    // checkout button
    const proceedToCheckout = screen.getByText(
      translations['action.proceedToCheckout']
    )

    expect(title).toBeInTheDocument()
    expect(subtotalPrice).toBeInTheDocument()
    expect(subtotalLabel).toBeInTheDocument()
    expect(shippingPrice).toBeInTheDocument()
    expect(shippingLabel).toBeInTheDocument()
    expect(taxesPrice).toBeInTheDocument()
    expect(taxesLabel).toBeInTheDocument()
    expect(totalPrice).toBeInTheDocument()
    expect(totalPriceLabel).toBeInTheDocument()
    expect(proceedToCheckout).toBeInTheDocument()

    fireEvent.click(proceedToCheckout)
    expect(pushMock).toHaveBeenCalledWith('/checkout')
    expect(pushMock).toBeCalledTimes(1)
  })

  it('renders without checkout button', () => {
    render(<CartSummary renderCheckoutButton={false} />, {
      translations,
    })

    const proceedToCheckout = screen.queryByText(
      translations['action.proceedToCheckout']
    )
    expect(proceedToCheckout).toBeNull()
  })

  it('renders with custom cart data', () => {
    render(<CartSummary cartData={cartData} />, {
      translations,
    })

    const shippingPrice = screen.getByText('Free')
    const taxesPrice = screen.getByText('$2.45')
    const subtotalPrice = screen.getByText('$35.00')

    expect(shippingPrice).toBeInTheDocument()
    expect(taxesPrice).toBeInTheDocument()
    expect(subtotalPrice).toBeInTheDocument()
  })
})
