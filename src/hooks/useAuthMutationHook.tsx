/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { Dispatch, SetStateAction, useContext } from "react";
import decode from "../utils/decode";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
type Props = {
  url: string;
  method: string;
  message?: string;
  setSnack?: Dispatch<SetStateAction<SnackbarType>>;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  handleNavigate?: () => void;
};
const useAuthMutationHook = ({
  url,
  method,
  message,
  setSnack,
  refetch,
  handleNavigate,
}: Props) => {
  const { setAuth, setAuthDialog } = useContext(AppContext);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) =>
      fetchData({
        url,
        method,
        data,
        token: localStorage.getItem("token") || "",
      }),
    onSuccess: (data) => {
      setSnack &&
        setSnack({
          open: true,
          message: message || "",
          severity: "success",
        });
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        setAuth(decode(localStorage.getItem("token") as string));
        setAuthDialog({
          open: false,
          to: "",
        });
      }

      refetch && refetch();
      handleNavigate && handleNavigate();
      if (url == "/auth/logout") {
        localStorage.removeItem("token");
        setAuth({
          _id: null,
          role: "",
        });
        navigate("/auth/login");
      }
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
