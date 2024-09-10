import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";

type Props = {
  query: string;
  selectedProp?: string;
  url:string;
  options?:any
};


const useQueryHook = ({ query, selectedProp,url,options }: Props) => {

  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const response = await fetchData({
        url,
        method: "GET",
        token: localStorage.getItem("token") || "",
      });
      return selectedProp ? response?.data[selectedProp] : response?.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 500000,
    ...options
  });
};

export default useQueryHook;
