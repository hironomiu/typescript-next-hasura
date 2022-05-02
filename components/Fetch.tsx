import { GetUsersQuery } from '../types/generated/graphql'
import FetchLine from './FetchLine'

// TODO: 型
const Fetch = ({ data }: { data: GetUsersQuery }) => {
  return (
    <>
      {data?.users.map((user) => (
        <FetchLine key={user.id} user={user} />
      ))}
    </>
  )
}

export default Fetch
