import { loadEnvConfig } from '@next/env'

// Assign arrow function to a variable before exporting as module defaulteslintimport/no-anonymous-default-export
// export default async (): Promise<void> => {
module.exports = function async() {
  loadEnvConfig(process.env.PWD || process.cwd())
}
