import { useReactiveVar } from '@apollo/client'
import { isUpdateModalOnVar, updateUserVar, User } from '../cache'
// type User = {
//   __typename?: 'users'
//   id: any
//   name: string
//   created_at: any
// }

const FetchLine = ({
  user,
  delete_users_by_pk,
  update_users_by_pk,
}: {
  user: User
  // TODO 型
  delete_users_by_pk: any
  update_users_by_pk: any
}) => {
  const isUpdateModalOn = useReactiveVar(isUpdateModalOnVar)
  return (
    <div className="flex flex-row my-2" key={user.id}>
      <p>{user.name}</p>
      <button
        onClick={() => {
          updateUserVar(user)
          isUpdateModalOnVar(true)
        }}
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
