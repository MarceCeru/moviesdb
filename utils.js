import { readFileSync } from 'fs'

export function readJson(path) {
  const data = readFileSync(path, 'utf-8')
  return JSON.parse(data)
}
