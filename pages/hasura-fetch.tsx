import { FormEvent, useState } from 'react'
import Layout from '../components/Layout'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { GET_USERS, CREATE_USER } from '../queries/queries'
import { GetUsersQuery, CreateUserMutation } from '../types/generated/graphql'
import { isUpdateModalOnVar, isDelVar } from '../cache'
import FetchForm from '../components/FetchForm'
import Fetch from '../components/Fetch'
import UpdateModal from '../components/modal/UpdateModal'
import LoadingOrError from '../components/LoadingOrError'

const HasuraFetch = (): JSX.Element => {
  const [input, setInput] = useState({ id: '', name: '' })
  const isUpdateModalOn = useReactiveVar(isUpdateModalOnVar)
  const isDel = useReactiveVar(isDelVar)
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

  if (error)
    return <LoadingOrError title="hasura error" message={error.message} />

  if (create.error)
    return (
      <LoadingOrError title="hasura error" message={create.error.message} />
    )

  if (create.loading || loading)
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
      <Fetch data={data} />
      {isUpdateModalOn ? <UpdateModal /> : null}
    </Layout>
  )
}

export default HasuraFetch
