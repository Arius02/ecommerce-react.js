import { useContext, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import {
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import BlockIcon from "@mui/icons-material/Block";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import { AppContext } from "../../../context/AppContext";
import useMutationHook from "../../../hooks/useMutationHook";
const UsersList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 4,
  });
  const {
    data: users,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useTableQueryHook({
    sorting,
    globalFilter,
    pagination,
    url: "auth/allUsers",
    selectionName: "users",
    queryName: "getUsers",
  });

  const { auth } = useContext(AppContext);
  const { mutate: toggleBlock } = useMutationHook({
    url: "auth/toggleBlock",
    method: "PATCH",
    refetch,
  });
  const columns = useMemo<MRT_ColumnDef<UserListType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue, row }) => (
          <Stack>
            <Typography variant="body2" fontWeight="bold">
              {renderedCellValue}
            </Typography>

            <Tooltip title={row.original._id}>
              <Typography fontSize={"12px"}>
                #{row.original._id.slice(0, 9)}
              </Typography>
            </Tooltip>
          </Stack>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "deliveryDetails",
        header: "Phone",
        Cell: ({ renderedCellValue, row }) => {
          console.log(row.original);
          return (
            <Typography variant="body2" fontWeight="bold">
              {renderedCellValue && (renderedCellValue as any[]).length
                ? (renderedCellValue as any[])[0]?.phone
                : "---"}
            </Typography>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ renderedCellValue }) => (
          <Chip
            label={renderedCellValue}
            color={
              renderedCellValue === "Online"
                ? "success"
                : renderedCellValue === "Offline"
                ? "warning"
                : "error"
            }
            variant="outlined"
          />
        ),
      },

      {
        accessorKey: "_id",
        header: "Actions",
        Cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            {auth.role == "SuperAdmin" && (
              <IconButton>
                <EditRoadIcon />
              </IconButton>
            )}
            <IconButton
              color={row.original.status === "Blocked" ? "error" : "info"}
              onClick={() =>
                toggleBlock({
                  userId: row.original._id,
                  status:
                    row.original.status === "Blocked" ? "Blocked" : "Offline",
                })
              }
            >
              <BlockIcon />
            </IconButton>
          </Stack>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Customers List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={users ?? []} //data is undefined on first render
        enableFilters={false}
        manualPagination
        enablePagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        renderTopToolbarCustomActions={() => (
          <Tooltip arrow title="Refresh Data">
            <IconButton onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
        state={{
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting,
        }}
      />
    </>
  );
};

export default UsersList;
