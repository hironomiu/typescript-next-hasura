import { render, screen, waitFor } from '@testing-library/react'
import { getPage, initTestHelpers } from 'next-page-tester'
import '@testing-library/jest-dom/extend-expect'
import HasuraFetch from '../pages/hasura-fetch'

initTestHelpers()

describe('HasraFetch', () => {
  it('HasuraFetch', async () => {
    const { page } = await getPage({
      route: '/hasura-fetch',
    })
    render(page)
    expect(screen.getByText('loading...')).toBeInTheDocument()
    // TODO Only absolute URLs are supported
    expect(await screen.findByTestId('add-button')).toBeInTheDocument()
  })
})
