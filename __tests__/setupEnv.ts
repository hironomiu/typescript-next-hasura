// TODO error -> Your test suite must contain at least one test.
import { loadEnvConfig } from '@next/env'

export default async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd())
}
