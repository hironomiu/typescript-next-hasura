import React from 'react'

type User = {
  __typename?: 'users'
  id: any
  name: string
  created_at: any
}
const FetchLine = ({
  user,
  delete_users_by_pk,
}: {
  user: User
  delete_users_by_pk: any
}) => {
  return (
    <div className="flex flex-row my-2" key={user.id}>
      <p>{user.name}</p>
      {/* TODO 更新処理の追加 */}
      <button
        onClick={() => null}
        className="border px-4 mx-2 bg-orange-300 rounded"
      >
        更新
      </button>
      <button
        onClick={async () =>
          await delete_users_by_pk({
            variables: {
              id: user.id,
            },
          })
        }
        className="border px-4 mx-2 rounded bg-green-500"
      >
        削除
      </button>
    </div>
  )
}

export default FetchLine
