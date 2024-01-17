import {useQuery} from "@tanstack/react-query";
import {GetConsoleOutput, GetReports} from "../../wailsjs/go/main/App";

export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      return GetReports();
    },
    enabled: true,
    refetchOnWindowFocus: true,
    refetchInterval: false,
  });
}
