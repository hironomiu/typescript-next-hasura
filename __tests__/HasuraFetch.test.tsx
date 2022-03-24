import { render, screen, waitFor } from '@testing-library/react'
import { getPage, initTestHelpers } from 'next-page-tester'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'

initTestHelpers()

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

describe('HasraFetch', () => {
  it('HasuraFetch', async () => {
    const { page } = await getPage({
      route: '/hasura-fetch',
    })
    render(page)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(await screen.findByText('Fetch')).toBeInTheDocument()
    screen.debug()
    expect(await screen.findByTestId('add-button')).toBeInTheDocument()
  })
})
