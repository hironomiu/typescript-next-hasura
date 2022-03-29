import { FormEvent, useState } from 'react'
import Layout from '../components/Layout'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USERS, CREATE_USER, DELETE_USER } from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
} from '../types/generated/graphql'
import FetchLine from '../components/FetchLine'
import FetchForm from '../components/FetchForm'

const HasuraFetch = (): JSX.Element => {
  const [input, setInput] = useState({ id: '', name: '' })
  // cache-and-networkなのでloadingは不要
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
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

  type LoadingOrErrorProps<T> = {
    title: T
    message: T
  }

  const LoadingOrError = (props: LoadingOrErrorProps<string>): JSX.Element => {
    return (
      <Layout title={props.title}>
        <p>{props.message}</p>
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

  if (create.loading || del.loading || loading)
    return <LoadingOrError title="hasura loading" message="Loading..." />

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
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
  }
  return (
    <Layout title="hasura-fetch">
      <h1>Fetch</h1>
      <FetchForm input={input} setInput={setInput} handleClick={handleClick} />
      {data?.users.map((user) => (
        <FetchLine
          key={user.id}
          user={user}
          delete_users_by_pk={delete_users_by_pk}
        />
      ))}
    </Layout>
  )
}

export default HasuraFetch
