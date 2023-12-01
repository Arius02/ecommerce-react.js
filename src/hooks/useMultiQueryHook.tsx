import { useQuery } from '@tanstack/react-query';
import fetchData from '../utils/fetchData';

type Props = {
  queries: (string|number)[];
  url: string;
  selectedProp?: string;
};

const useMultiQueryHook = ({queries,url,selectedProp}: Props) => {
  return useQuery({
    queryKey: queries,
    queryFn: async () => {
      const res = await fetchData({
        url,
        method: "GET",
        token: localStorage.getItem("token") || "",
      });
      return selectedProp?res.data[selectedProp]:res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 3000000,
  });
}

export default useMultiQueryHook