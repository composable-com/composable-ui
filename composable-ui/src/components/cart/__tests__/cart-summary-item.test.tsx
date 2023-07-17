import { render, screen } from 'utils/tests'
import { CartSummaryItem } from '../cart-summary-item'

describe('CartSummaryItem', () => {
  it('renders a label and children', () => {
    render(
      <CartSummaryItem label="Random label">
        <div>The children</div>
      </CartSummaryItem>
    )
    const label = screen.getByText('Random label')
    const children = screen.getByText('The children')
    expect(label).toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})
