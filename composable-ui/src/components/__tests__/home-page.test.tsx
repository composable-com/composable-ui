import React from 'react'
import { render, screen } from 'utils/tests'
import { api } from 'utils/api'
import { HomePage } from '../home-page'
import { mockedIntersectionObserver } from 'components/__mocks__/intersection-observer'
import { LAZY_LOAD_BATCH_SIZE } from 'utils/constants'

global.IntersectionObserver = mockedIntersectionObserver
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

  it('renders first batch of cms items', async () => {
    const items = await screen.findAllByRole('cms-page-item')

    const { data } = api.cms.getPage.useQuery({ slug: 'home' })
    if (!data) return

    for (let i = 0; i < LAZY_LOAD_BATCH_SIZE; i++) {
      expect(items[i]).toHaveAttribute('data-testid', data.items[i].__typename)
    }
  })
})
