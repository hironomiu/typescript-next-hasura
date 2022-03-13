import { ChangeEvent, FormEvent, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { memoVar } from '../cache'

const TabA = () => {
  const [input, setInput] = useState<string>('')
  const memos = useReactiveVar(memoVar)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((_prev) => (_prev = e.target.value))
  }
  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    memoVar([...memoVar(), { title: input }])
    setInput((_prev) => (_prev = ''))
  }
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl">makeVar</h1>
      {memos?.map((memo, index) => (
        <div key={index}>{memo.title}</div>
      ))}
      <input
        type="text"
        className="border-2 w-40 rounded my-4"
        value={input}
        onChange={handleChange}
      />
      <button
        disabled={!input}
        onClick={handleClick}
        className="disabled:bg-gray-200 w-40 rounded bg-sky-300"
      >
        追加
      </button>
    </div>
  )
}

export default TabA
