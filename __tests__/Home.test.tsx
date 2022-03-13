import { render, screen } from '@testing-library/react'
//  TypeError: expect(...).toBeInTheDocument is not a function
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

describe('Home', () => {
  it('getByText hello', () => {
    render(<Home />)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
