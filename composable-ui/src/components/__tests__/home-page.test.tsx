import React from 'react'
import { render, screen } from 'utils/tests'
import { api } from 'utils/api'
import { HomePage } from '../home-page'

jest.mock('utils/api')
jest.mock('../cms', () => ({
  BannerFull: jest
    .fn()
    .mockReturnValue(<div role="cms-page-item" data-testid="BannerFull" />),
  BannerSplit: jest
    .fn()
    .mockReturnValue(<div role="cms-page-item" data-testid="BannerSplit" />),
  BannerTextOnly: jest
    .fn()
    .mockReturnValue(<div role="cms-page-item" data-testid="BannerTextOnly" />),
  CommerceConnector: jest
    .fn()
    .mockReturnValue(
      <div role="cms-page-item" data-testid="CommerceConnector" />
    ),
  Grid: jest
    .fn()
    .mockReturnValue(<div role="cms-page-item" data-testid="Grid" />),
}))

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage />)
  })

  it('calls the useQuery hook with the correct parameters', () => {
    expect(api.cms.getPage.useQuery).toHaveBeenCalledWith(
      {
        slug: 'home',
      },
      {
        refetchOnMount: false,
      }
    )
  })

  it('renders cms each item properly', async () => {
    const items = await screen.findAllByRole('cms-page-item')

    const { data } = api.cms.getPage.useQuery({ slug: 'home' })
    if (!data) return
    const pageItems = data.items

    for (const item of pageItems) {
      const index = pageItems.indexOf(item)
      expect(items[index]).toHaveAttribute('data-testid', item.__typename)
    }
  })
})
