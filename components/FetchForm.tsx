const FetchForm = ({ input, setInput, handleClick }) => {
  return (
    <form className="">
      <input
        className="border px-2"
        type="text"
        value={input.name}
        onChange={(e) =>
          setInput((_prev) => (_prev = { ...input, name: e.target.value }))
        }
      />
      <button
        className="bg-blue-300 mx-2 px-4 rounded"
        disabled={!input.name}
        onClick={handleClick}
        data-testid="add-button"
      >
        追加
      </button>
    </form>
  )
}

export default FetchForm
