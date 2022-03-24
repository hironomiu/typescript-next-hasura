import { memo } from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { memoVar, toggleVar } from '../cache'

// memoを使う際、下に引っかかるため () => から function FuncName() に修正
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
const TabA = memo(function TabA(): JSX.Element {
  const [input, setInput] = useState<string>('')
  const memos = useReactiveVar(memoVar)
  const toggle = useReactiveVar(toggleVar)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((_prev) => (_prev = e.target.value))
  }

  const handleClickToggle = () => {
    toggleVar(!toggle)
  }
  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    memoVar([...memoVar(), { title: input }])
    setInput((_prev) => (_prev = ''))
  }
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl">TabA makeVar</h1>
      {memos?.map((memo, index) => (
        <div key={index}>{memo.title}</div>
      ))}
      <input
        type="text"
        className="border-2 w-40 rounded my-4 px-2"
        value={input}
        data-testid="input-input"
        onChange={handleChange}
      />
      <button
        disabled={!input}
        onClick={handleClick}
        data-testid="input-button"
        className="disabled:bg-gray-200 w-40 rounded bg-sky-300"
      >
        追加
      </button>
      <button
        className="w-20 h-8 bg-sky-400 rounded my-4"
        onClick={handleClickToggle}
        data-testid="toggle-button"
      >
        toggle
      </button>
      {toggle ? <div>toggle!!</div> : null}
    </div>
  )
})

export default TabA
