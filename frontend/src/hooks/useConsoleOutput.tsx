import { useQuery } from '@tanstack/react-query'
import { GetConsoleOutput } from '../../wailsjs/go/main/App'

export function useConsoleOutput() {
  return useQuery({
    queryKey: ['consoleOutput'],
    queryFn: () => {
      return GetConsoleOutput()
    },
    refetchInterval: 1000,
  })
}
