import { useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import { GET_USERS_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
const HasuraFetchCache = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)

  if (error)
    return (
      <Layout title="erro">
        <p>error:{error.message}</p>
      </Layout>
    )
  return (
    <Layout title="hasura fetch cache">
      {data?.users.map((user) => {
        return <p key={user.id}>{user.name}</p>
      })}
    </Layout>
  )
}

export default HasuraFetchCache
