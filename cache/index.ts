import { makeVar } from '@apollo/client'
interface Memo {
  title: string
}

export const memoVar = makeVar<Memo>({ title: '' })
export const memosVar = makeVar<Memo[]>([])
export const toggleVar = makeVar(false)
export const serviceNameVar = makeVar('Supre Web Site!!')
