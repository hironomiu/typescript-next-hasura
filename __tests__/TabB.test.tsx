import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import TabB from '../components/TabB'

describe('TabB', () => {
  it('render text h1', () => {
    render(<TabB />)
    expect(screen.getByText('TabB makeVar')).toBeInTheDocument()
  })
  it('toggle button', async () => {
    render(<TabB />)
    expect(screen.getByTestId('toggle-button')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('toggle-button'))
    expect(await screen.findByText('toggle!!'))
  })
})
