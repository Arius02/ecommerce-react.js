import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";

type Props = {
  query: string;
  selectedProp?: string;
};

const generateData = () => {
  const cartId = localStorage.getItem("cartId");
  if (cartId) {
    return { cartId };
  } else if (localStorage.getItem("token")) {
    return { token: localStorage.getItem("token")  };
  }
  return {};
};

const useCartQueryHook = ({ query, selectedProp }: Props) => {

  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const data = generateData();
      const res = await fetchData({
        url: `/cart/${data.cartId ? "guset/" + data.cartId : ""}`,
        method: "GET",
        data,
        token:localStorage.getItem("token")?localStorage.getItem("token")as string:""
      
      });

      if (res.data.cart == null) {
        localStorage.removeItem("cartId");
      }

      return selectedProp ? res.data[selectedProp] : res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 500000,
    // enabled: Boolean(localStorage.getItem("cartId")),
  });
};

export default useCartQueryHook;
