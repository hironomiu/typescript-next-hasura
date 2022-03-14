import { useState } from 'react'
import Layout from '../components/Layout'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USERS, CREATE_USER } from '../queries/queries'
import { GetUsersQuery, CreateUserMutation } from '../types/generated/graphql'

const HasuraFetch = () => {
  const [input, setInput] = useState({ id: '', name: '' })
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
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
  })

  if (error)
    return (
      <Layout title="hasura error">
        <p>error:{error.message}</p>
      </Layout>
    )

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
        return <p key={user.id}>{user.name}</p>
      })}
    </Layout>
  )
}

export default HasuraFetch
