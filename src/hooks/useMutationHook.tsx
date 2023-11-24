/* eslint-disable @typescript-eslint/no-explicit-any */
import {  QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { Dispatch, SetStateAction } from "react";
type Props = {
  url: string;
  method: string;
  message?: string;
  setSnack?: Dispatch<SetStateAction<SnackbarType>>;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  handleNavigate?:()=>void;
};
const useMutationHook = ({
  url,
  method,
  message,
  setSnack,
  refetch,
  setOpen,
  handleNavigate,
}: Props) => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData({
        url,
        method,
        data,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTUyZDMwNTUyOTY4M2Q5Mzk0YTVmODYiLCJpYXQiOjE3MDA0Mzc5MTEsImV4cCI6MTcwMTMwMTkxMX0.4RLiN_IJ251sla5iA2ESYWnSm9bAkKaNvomAFe1GgBw",
      }),
    onSuccess: () => {
      setSnack &&
        setSnack({
          open: true,
          message: message || "",
          severity: "success",
        });
      refetch && refetch();
      setOpen && setOpen(false);
      handleNavigate && handleNavigate();
    },
    onError: (error: any) => {
      setSnack &&
        setSnack({
          open: true,
          message: error.response.data.error,
          severity: "error",
        });
    },
  });
};

export default useMutationHook;