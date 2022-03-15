import { memoVar, toggleVar } from '../cache'
import { useReactiveVar } from '@apollo/client'

const TabB = (): JSX.Element => {
  const memos = useReactiveVar(memoVar)
  const toggle = useReactiveVar(toggleVar)

  console.log(toggle)

  const handleClickToggle = () => {
    toggleVar(!toggle)
  }
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl">makeVar</h1>
      {memos?.map((memo, index) => (
        <div key={index}>{memo.title}</div>
      ))}
      <button
        className="w-20 h-8 bg-purple-400 rounded my-4"
        onClick={handleClickToggle}
      >
        toggle
      </button>
      {toggle ? <div>toggle</div> : null}
    </div>
  )
}

export default TabB
