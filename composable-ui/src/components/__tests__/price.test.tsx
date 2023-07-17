import { render, screen } from 'utils/tests'
import { Price } from '../price'

describe('Price', () => {
  it('renders a price', () => {
    render(<Price price="80" />)
    const value = screen.getByText('$80.00')
    expect(value).toBeInTheDocument()
  })

  it('renders nothing', () => {
    render(
      <div data-testid="price-container">
        <Price />
      </div>
    )
    const value = screen.getByTestId('price-container')
    expect(value.children).toHaveLength(0)
  })

  it('renders an arbitrary string', () => {
    render(<Price price="Free Shipping" />)
    const value = screen.getByText('Free Shipping')
    expect(value).toBeInTheDocument()
  })
})
