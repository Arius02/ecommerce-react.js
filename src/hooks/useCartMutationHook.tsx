import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { Dispatch, SetStateAction } from "react";

type Props = {
  url: string;
  method: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  setLoadingIndecator?: Dispatch<SetStateAction<string>>;
};

const useCartMutationHook = ({ url, method, setLoadingIndecator,refetch }: Props) => {
  const isTokenPresent = Boolean(localStorage.getItem("token"));
  const isCartIdPresent = Boolean(localStorage.getItem("cartId"));

  let customUrl: string;

  if (isTokenPresent) {
    customUrl = url === "/cart/merge" ? "/cart/merge" : "/cart";
  } else {
    customUrl = "/cart/guest";
  }
  return useMutation({
    mutationFn: (data: any) => {
      let options = {
        method,
        url: customUrl || "/cart/guest",
        data,
        token: "",
      };
      if (isCartIdPresent) {
        options.data = { ...data, cartId: localStorage.getItem("cartId") };
      }
      if (isTokenPresent) {
        options.token = localStorage.getItem("token") as string;
      }

      return fetchData(options);
    },
    onSuccess: (data: any) => {
      
      if (customUrl == "/cart/guest" && method == "POST") {
        localStorage.setItem("cartId", data.data.cart._id);
      }
      if (url == "/cart/merge") {
        localStorage.removeItem("cartId");
      }
      setLoadingIndecator && setLoadingIndecator("");
       refetch()
    },
    onError: () => {
      setLoadingIndecator && setLoadingIndecator("");
    },
  });
};

export default useCartMutationHook;
