import { makeVar, MutationResult } from '@apollo/client'
import { DeleteUserMutation } from '../types/generated/graphql'

interface Memo {
  title: string
}

export type User = {
  __typename?: 'users'
  id: any
  name: string
  created_at: any
}

export const memoVar = makeVar<Memo>({ title: '' })
export const memosVar = makeVar<Memo[]>([])
export const toggleVar = makeVar(false)
export const serviceNameVar = makeVar('Supre Web Site!!')
export const updateUserVar = makeVar<User>({
  __typename: 'users',
  id: 0,
  name: '',
  created_at: '',
})
export const isUpdateModalOnVar = makeVar<boolean>(false)

export const isDelVar = makeVar<MutationResult<DeleteUserMutation>>(null)
