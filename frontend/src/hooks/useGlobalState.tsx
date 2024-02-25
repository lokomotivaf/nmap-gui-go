import type { QueryKey } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../queryClient'

type UseGlobalStateReturnType<T> = [T | undefined, (newData: T) => void]

export function useGlobalState<T, >(key: QueryKey, initialData?: T): UseGlobalStateReturnType<T> {
  const mutate = (newData: T) => {
    queryClient.setQueryData(key, newData)
  }

  const { data } = useQuery({
    queryKey: key,
    refetchInterval: false,
    queryFn: () => initialData,
    enabled: false,
    refetchOnWindowFocus: false,
  })

  return [data || initialData, mutate]
}
