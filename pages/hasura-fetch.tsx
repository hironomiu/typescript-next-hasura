import Layout from '../components/Layout'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'

const HasuraFetch = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  if (error)
    return (
      <Layout title="hasura error">
        <p>error:{error.message}</p>
      </Layout>
    )

  return (
    <Layout title="hasura-fetch">
      {data?.users.map((user) => {
        return <p key={user.id}>{user.name}</p>
      })}
    </Layout>
  )
}

export default HasuraFetch
