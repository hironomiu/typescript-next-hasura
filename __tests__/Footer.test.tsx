import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('Footer', () => {
    render(<Footer />)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
