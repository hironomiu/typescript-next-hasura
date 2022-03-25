import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import TabA from '../components/TabA'

describe('TabA', () => {
  it('TabAのレンダリング', () => {
    render(<TabA />)
    expect(screen.getByText('TabA makeVar')).toBeInTheDocument()
  })
  it('makeVarでのData toggleの確認', async () => {
    render(<TabA />)
    userEvent.click(screen.getByTestId('toggle-button'))
    expect(await screen.findByText('toggle!!')).toBeInTheDocument()
  })
  it('makeVar(+ useState)でのglobal stateでのデータ挿入(input & button)と挿入後の表示の確認', async () => {
    render(<TabA />)
    const input = screen.getByTestId('input-input')
    const button = screen.getByTestId('input-button')
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    userEvent.type(input, 'dummy')
    userEvent.click(button)
    expect(await screen.findByText('dummy')).toBeInTheDocument()
  })
})
