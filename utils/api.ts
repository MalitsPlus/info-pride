import type { APIMapping } from '@outloudvi/hoshimi-types'
import { UnwrapPromise } from '@outloudvi/hoshimi-types/helpers'
import { QueryFunction } from 'react-query'

export type UnArray<T> = T extends (infer R)[] ? R : never

export type GetFirst<T extends unknown[]> = T[0]

export type LengthOf<T extends unknown[]> = T['length']

export type APIResponseOf<M extends keyof APIMapping> = UnwrapPromise<
  ReturnType<APIMapping[M]>
>

export const frontendQueryFn: QueryFunction<any> = ({ queryKey: [path] }) =>
  fetch(path as string).then((x) => x.json())
