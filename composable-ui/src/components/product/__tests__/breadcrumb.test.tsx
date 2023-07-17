import { render, screen } from 'utils/tests'
import { Breadcrumb } from '../breadcrumb'
import { breadcrumbData } from '../__data__/breadcrumb-data'

describe('Testing Breadcrumb', () => {
  it('renders the component properly', () => {
    render(<Breadcrumb items={breadcrumbData} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(breadcrumbData.length)
  })
})
