/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
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
  setOpen?:Dispatch<SetStateAction<boolean>>
};
const useMutationHook = ({
  url,
  method,
  message,
  setSnack,
  refetch,
  setOpen
}: Props) => {
  return useMutation({
    mutationFn: (data: any) =>
      fetchData({
        url,
        method,
        data,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhZGU1NjMwNTJjNDgyNzBjZWE0NTUiLCJpYXQiOjE2OTgzNTcwMTQsImV4cCI6MTY5OTIyMTAxNH0.hLInwqX-TYMk6FU03Z10hKFL4_noguM0KjLS5e2qKKM",
      }),
    onSuccess: () => {
      setSnack &&
        setSnack({
          open: true,
          message: message || "",
          severity: "success",
        });
      refetch && refetch();
      setOpen && setOpen(false)
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