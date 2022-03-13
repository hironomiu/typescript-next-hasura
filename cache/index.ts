import { makeVar } from '@apollo/client'
interface Memo {
  title: string
}

export const memoVar = makeVar<Memo[]>([])
export const toggleVar = makeVar(false)
