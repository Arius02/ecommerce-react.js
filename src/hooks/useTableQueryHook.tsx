import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import fetchData from "../utils/fetchData";
type Props = {
  sorting: MRT_SortingState;
  globalFilter: string;
  pagination: MRT_PaginationState;
  url:string;
  selectedProp?:string;
  queryName:string
};

const useTableQueryHook = ({
  sorting,
  globalFilter,
  pagination,
  url,
  selectedProp,
  queryName
}: Props) => {
  return useQuery({
    queryKey: [
      queryName,
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const res: any = await fetchData({
        url: `/${url}?page=${pagination.pageIndex}&size=${
          pagination.pageSize
        }&search=${globalFilter ? globalFilter : ""}&sort=${sorting
          .map((s) => `${s.desc ? "-" : ""}${s.id}`)
          .join(",")}`,
        method: "GET",
        token: localStorage.getItem("token") || "",
      });
      return selectedProp&&res.data[selectedProp] || res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    staleTime: 300000,
  });
};

export default useTableQueryHook;
