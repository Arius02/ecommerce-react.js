import { useQuery, keepPreviousData } from "@tanstack/react-query";
import React from "react";
import {
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import fetchData from "../utils/fetchData";
type Props = {
  sorting: MRT_SortingState;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
  pagination: MRT_PaginationState;
  url:string;
  selectionName:string;
  queryName:string
};

const useTableQueryHook = ({
  sorting,
  columnFilters,
  globalFilter,
  pagination,
  url,
  selectionName,
  queryName
}: Props) => {
  return useQuery({
    queryKey: [
      queryName,
      columnFilters, //refetch when columnFilters changes
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
      });
      return res.data[selectionName];
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    staleTime: 300000,
  });
};

export default useTableQueryHook;
