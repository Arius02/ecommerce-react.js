/* eslint-disable @typescript-eslint/no-explicit-any */
import {  QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { Dispatch, SetStateAction } from "react";
import auth from "../utils/auth";
type Props = {
  url: string;
  method: string;
  message?: string;
  setSnack?: Dispatch<SetStateAction<SnackbarType>>;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  handleNavigate?:()=>void;
};
const useAuthMutationHook = ({
  url,
  method,
  message,
  setSnack,
  refetch,
  handleNavigate,
}: Props) => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData({
        url,
        method,
        data,
        // token:
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhZGU1NjMwNTJjNDgyNzBjZWE0NTUiLCJpYXQiOjE2OTkyNzM0NDQsImV4cCI6MTcwMDEzNzQ0NH0.9N0GJOb6iWuHbw_8FbJOrqXcmnjlaTrJ_1788NK8hsY",
      }),
    onSuccess: (data) => {
      setSnack &&
      //   setSnack({
      //     open: true,
      //     message: message || "",
      //     severity: "success",
      //   });
      refetch && refetch();
      handleNavigate && handleNavigate();
      localStorage.setItem("token", data.data.token);
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

export default useAuthMutationHook;