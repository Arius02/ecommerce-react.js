import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import systemRoles from "../utils/systemRoles";

type Props = {
  query: string;
  selectedProp?: string;
};

const generateData = () => {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");
  if (cartId && !token) {
    return { cartId };
  } else if (token) {
    return { token };
  }
  return {};
};

const useCartQueryHook = ({ query, selectedProp }: Props) => {
  const { auth } = useContext(AppContext);
 
  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const data = generateData();
      const res = await fetchData({
        url: `/cart/${data.cartId ? "guset/" + data.cartId : ""}`,
        method: "GET",
        data,
        token: localStorage.getItem("token")
          ? (localStorage.getItem("token") as string)
          : "",
      });

      if (res.data.cart == null) {
        localStorage.removeItem("cartId");
      }

      return selectedProp ? res.data[selectedProp] : res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 500000,
    enabled:
      auth.role != systemRoles.SuperAdmin && auth.role != systemRoles.SuperAdmin
        ? true
        :localStorage.getItem("cartId")
        ? true
        : false,
  });
};

export default useCartQueryHook;
