import { render } from 'utils/tests'
import { CartLoadingState } from '../cart-loading-state'

describe('CartLoadingState', () => {
  it('matches the snapshot', () => {
    const screen = render(<CartLoadingState />)
    expect(screen.container).toMatchSnapshot()
  })
})
