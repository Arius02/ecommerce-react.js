/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { Dispatch, SetStateAction } from "react";

type SnackbarType = {
  open: boolean;
  message: string;
  severity: "error" | "success";
};

type MutationHookProps = {
  url: string;
  method: string;
  message?: string;
  setSnack?: Dispatch<SetStateAction<SnackbarType>>;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  handleNavigate?: () => void;
};

const useMutationHook = ({
  url,
  method,
  message,
  setSnack,
  refetch,
  setOpen,
  handleNavigate,
}: MutationHookProps) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const token = localStorage.getItem("token") || "";
      return fetchData({ url, method, data, token });
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.error) {
        setSnack?.({
          open: true,
          message: data.error || "An error occurred",
          severity: "error",
        });
        return;
      }

      setSnack?.({
        open: true,
        message: message || "Operation successful",
        severity: "success",
      });

      refetch?.();
      setOpen?.(false);
      handleNavigate?.();
    },
    onError: (error: any) => {
      console.log(error);
      setSnack?.({
        open: true,
        message: error.response?.data?.error || "An unexpected error occurred",
        severity: "error",
      });
    },
  });
};

export default useMutationHook;
