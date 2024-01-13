import {useQuery} from "@tanstack/react-query";
import {GetConsoleOutput} from "../../wailsjs/go/main/App";

export const useConsoleOutput = () => {
  return useQuery({
    queryKey: ['results'],
    queryFn: () => {
      console.log('refetch called')
      return GetConsoleOutput();
    },
    refetchInterval: 1000,
  });
}
