import { useReactiveVar, useMutation } from '@apollo/client'
import { isUpdateModalOnVar, updateUserVar, User } from '../cache'
import { DeleteUserMutation } from '../types/generated/graphql'
import { DELETE_USER } from '../queries/queries'
import Layout from './Layout'
const FetchLine = ({ user }: { user: User }) => {
  const isUpdateModalOn = useReactiveVar(isUpdateModalOnVar)
  // TODO: 命名 del
  // TODO: 削除実行中の状態を管理する（error & loading的な）
  const [delete_users_by_pk, del] = useMutation<DeleteUserMutation>(
    DELETE_USER,
    {
      update(cache, { data: { delete_users_by_pk } }) {
        cache.modify({
          fields: {
            users(existingUsers, { readField }) {
              return existingUsers.filter(
                (user) => delete_users_by_pk.id !== readField('id', user)
              )
            },
          },
        })
      },
    }
  )

  // TODO: pages/hasura-fetchに状態を伝える
  if (del.loading) {
    // return <LoadingOrError title="hasura loading" message="Loading..." />
  }

  // TODO: pages/hasura-fetchに状態を伝える
  if (del.error) {
    // return <LoadingOrError title="hasura error" message={del.error.message} />
  }

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
        onClick={async () => {
          await delete_users_by_pk({
            variables: {
              id: user.id,
            },
          })
        }}
        className="border px-4 mx-2 rounded bg-green-500"
      >
        削除
      </button>
    </div>
  )
}

export default FetchLine
