import { Err } from './interfaces'

export function error(status: number, message: string, data?: any): Error {
  let err = new Error(message) as Err
  err.status = status
  err.data = data
  return err
}
