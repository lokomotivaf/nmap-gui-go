import { useQuery } from '@tanstack/react-query'
import { GetReports } from '../../wailsjs/go/main/App'

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      return GetReports()
    },
    enabled: true,
    refetchOnWindowFocus: true,
    refetchInterval: false,
  })
}
