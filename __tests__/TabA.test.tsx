import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import TabA from '../components/TabA'

describe('TabA', () => {
  it('', () => {
    render(<TabA />)
    expect(screen.getByText('TabA makeVar')).toBeInTheDocument()
  })
  it('', async () => {
    render(<TabA />)
    userEvent.click(screen.getByTestId('toggle-button'))
    expect(await screen.findByText('toggle!!')).toBeInTheDocument()
  })
})
