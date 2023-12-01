import { useMemo, useState } from "react";
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
  Chip
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import setColor from "../../../utils/orderStatusColor";
import { formatPrice } from "../../../utils/priceFormat";
import Visibility from "@mui/icons-material/Visibility";
import { Helmet } from "react-helmet";

const OrdersList = () => {
 
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 4,
  });
  const {
    data: orders,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useTableQueryHook({
    sorting,
    
    globalFilter,
    pagination,
    url: "order/admin/getAllOrders",
    selectedProp: "orders",
    queryName: "getAdminOrders",
  });

  const columns = useMemo<MRT_ColumnDef<OrdersListType>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        Cell: ({ renderedCellValue, row }) => (
          <Tooltip title={renderedCellValue}>
            <Link
              to={`/dashboard/order/details/${row.original._id}`}
              underline="none"
              component={RouterLink}
              color={"black"}
            >
              <Typography fontSize={"16px"}>
                #{row.original._id.slice(0, 9)}
              </Typography>
            </Link>
          </Tooltip>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ renderedCellValue }) => (
          <Chip
            label={renderedCellValue}
            color={setColor((renderedCellValue as string) || "")}
            variant="outlined"
          />
        ),
      },
      {
        accessorKey: "deliveryDetails",
        header: "Address",
        Cell: ({ renderedCellValue }) => (
          <Tooltip
            title={`${(renderedCellValue as any)?.city},${(renderedCellValue as any)?.city}`}
          >
            <Typography fontSize={"16px"}>
              {(renderedCellValue as any)
                ? `${(renderedCellValue as any)?.city},${(renderedCellValue as any)?.street.slice(
                    0,
                    13
                  )}`
                : "----"}
            </Typography>
          </Tooltip>
        ),
      },
      {
        accessorKey: "deliveryDetails.phone",
        header: "Phone",
      },
      {
        accessorKey: "totalPrice",
        header: "Total Price",
        Cell: ({ renderedCellValue }) => (
          <Typography>{formatPrice(renderedCellValue as number)}</Typography>
        ),
      },
      {
        accessorKey: "_id",
        header: "Actions",
        Cell: ({ renderedCellValue }) => (
          <Link
            to={`/dashboard/order/details/${renderedCellValue}`}
            underline="none"
            component={RouterLink}
            color={"black"}
          >
            <IconButton >
              <Visibility />
            </IconButton>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>Orders List</title>
      </Helmet>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Orders List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={orders ?? []} //data is undefined on first render
        manualFiltering
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

export default OrdersList;
