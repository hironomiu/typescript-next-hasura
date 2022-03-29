import { GetUsersQuery } from '../types/generated/graphql'
import FetchLine from './FetchLine'

const Fetch = ({
  data,
  delete_users_by_pk,
}: {
  data: GetUsersQuery
  delete_users_by_pk: any
}) => {
  return (
    <>
      {data?.users.map((user) => (
        <FetchLine
          key={user.id}
          user={user}
          delete_users_by_pk={delete_users_by_pk}
        />
      ))}
    </>
  )
}

export default Fetch
