import { useState } from 'react'
import Layout from '../components/Layout'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USERS, CREATE_USER, DELETE_USER } from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
} from '../types/generated/graphql'

const HasuraFetch = () => {
  const [input, setInput] = useState({ id: '', name: '' })
  // cache-and-networkなのでloadingは不要
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  const [insert_users_one, create] = useMutation<CreateUserMutation>(
    CREATE_USER,
    {
      update(cache, { data: { insert_users_one } }) {
        const cacheId = cache.identify(insert_users_one)
        cache.modify({
          fields: {
            users(existingUsers, { toReference }) {
              return [toReference(cacheId), ...existingUsers]
            },
          },
        })
      },
    }
  )

  // TODO 命名 del
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
  const LoadingOrError = ({ title, message }) => {
    return (
      <Layout title={title}>
        <p>{message}</p>
      </Layout>
    )
  }
  if (error)
    return <LoadingOrError title="hasura error" message={error.message} />

  if (create.error)
    return (
      <LoadingOrError title="hasura error" message={create.error.message} />
    )

  if (del.error)
    return <LoadingOrError title="hasura error" message={del.error.message} />

  if (create.loading || del.loading)
    return <LoadingOrError title="hasura loading" message="loaging..." />

  return (
    <Layout title="hasura-fetch">
      <form className="">
        <input
          className="border px-2"
          type="text"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <button
          className="px-2"
          disabled={!input.name}
          // TODO 綺麗にする
          onClick={async (e) => {
            e.preventDefault()
            try {
              await insert_users_one({
                variables: {
                  name: input.name,
                },
              })
            } catch (error) {
              alert(error.message)
            }
            setInput({ id: '', name: '' })
          }}
        >
          追加
        </button>
      </form>
      {data?.users.map((user) => {
        // TODO 綺麗にする
        return (
          <div key={user.id} className="flex flex-row my-1">
            <p>{user.name}</p>
            <button
              onClick={async () =>
                await delete_users_by_pk({
                  variables: {
                    id: user.id,
                  },
                })
              }
              className="border px-2 mx-2 rounded bg-green-500"
            >
              delete
            </button>
          </div>
        )
      })}
    </Layout>
  )
}

export default HasuraFetch
