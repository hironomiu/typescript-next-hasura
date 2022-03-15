import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TabA from '../components/TabA'

describe('TabA', () => {
  it('', () => {
    render(<TabA />)
    expect(screen.getByText('makeVar')).toBeInTheDocument()
  })
})
