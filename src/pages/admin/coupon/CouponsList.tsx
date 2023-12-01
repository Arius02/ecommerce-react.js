import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import {
  IconButton,
  MenuItem,
  Tooltip,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";
import useMutationHook from "../../../hooks/useMutationHook";
import { green, red } from "@mui/material/colors";
import SnackbarComponent from "../../../components/common/SnackBar";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import { DeleteModal, EditCouponModal } from "../../../components/admin";
import { Helmet } from "react-helmet";

const CouponsList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 4,
  });
  const {
    data: coupons,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useTableQueryHook({
    sorting,
    globalFilter,
    pagination,
    url: "coupon",
    selectedProp: "coupons",
    queryName: "getCoupons",
  });
  const columns = useMemo<MRT_ColumnDef<CouponListType>[]>(
    () => [
      {
        accessorKey: "couponCode",
        header: "Code Code",

        Cell: ({ renderedCellValue }) => (
          <Typography variant="body2" fontWeight="bold" color="grey">
            {renderedCellValue}
          </Typography>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",

        Cell: ({ renderedCellValue }) => (
          <Typography
            variant="body2"
            sx={{
              backgroundColor:
                renderedCellValue === "active" ? green[50] : red[50],
              color: renderedCellValue === "active" ? green[900] : red[900],
              px: 1,
              py: 0.5,
              borderRadius: 2,
              width: "fit-content",
            }}
          >
            {renderedCellValue}
          </Typography>
        ),
      },
      {
        accessorKey: "couponType",
        header: "Coupon Type",

        Cell: ({ renderedCellValue }) => (
          <Typography variant="body2">
            {renderedCellValue === "percentage" ? "Percentage" : "Fixed"}
          </Typography>
        ),
      },
      {
        accessorKey: "discountValue",
        header: "Discount Value",

        Cell: ({ renderedCellValue, row }) => (
          <Typography variant="body2">
            {row.original.couponType === "percentage"
              ? `${renderedCellValue}%`
              : `${renderedCellValue} EGP`}
          </Typography>
        ),
      },
      {
        accessorKey: "usageCount",
        header: "Usage Count",
      },
      {
        accessorKey: "usageLimit",
        header: "Usage Limit",
      },

      {
        accessorKey: "minPurchaseAmount",
        header: "Min Purchase Amount",
      },
      {
        accessorKey: "userRestrictions",
        header: "User Restrictions",
        size: 100,
      },
    ],
    []
  );
  //for delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<CouponListType | any>({});
  const [id, setId] = useState("");
  const [openInfo, setOpenInfo] = useState(true);
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: toggleVisibility } = useMutationHook({
    url: `/coupon/${id}`,
    method: "PATCH",
    refetch,
    setSnack,
  });
  return (
    <>
      <Helmet>
        <title>Coupons List</title>
      </Helmet>
      <Box sx={{ width: "100%" }}>
        <Collapse in={openInfo}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenInfo(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            when editting coupon it's not allowed to edit coupon code, coupon
            type and user restrictions because they are important elements in
            creating the coupon, instead of modifying one of these elements, you
            can delete the coupon and create another.
          </Alert>
        </Collapse>
      </Box>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Coupons List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={coupons ?? []} //data is undefined on first render
        manualFiltering
        manualPagination
        enablePagination
        manualSorting
        enableRowActions
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              if (row.original.status !== "expired") {
                setItem(row.original);
                setOpenEdit(true);
              } else {
                setSnack({
                  open: true,
                  message: "This coupon is expired",
                  severity: "error",
                });
              }
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Edit
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              if (row.original.status !== "expired") {
                setId(row.original._id);
                toggleVisibility({});
              } else {
                setSnack({
                  open: true,
                  message: "This coupon is expired",
                  severity: "error",
                });
              }
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon onClick={() => {}}>
              {row.original.status == "active" ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityOnIcon />
              )}
            </ListItemIcon>
            {row.original.status == "active" ? "Deactivate" : "Activate"}
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              setId(row.original._id);
              setOpenDelete(true);
              closeMenu();
            }}
            sx={{ m: 0, color: "red" }}
          >
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemIcon>
            Delete
          </MenuItem>,
        ]}
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
      <DeleteModal
        title="Delete Coupon"
        open={openDelete}
        setOpen={setOpenDelete}
        url={`/coupon/${id}`}
        name="Coupon"
        refetch={refetch}
      />
      <EditCouponModal
        title="Edit Coupon"
        open={openEdit}
        setOpen={setOpenEdit}
        item={item}
        refetch={refetch}
        key={item._id}
      />
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </>
  );
};

export default CouponsList;
