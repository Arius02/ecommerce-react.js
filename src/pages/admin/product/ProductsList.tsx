/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  // type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import {
  IconButton,
  MenuItem,
  Tooltip,
  ListItemIcon,
  Typography,
  Stack,
  Box,
  Switch,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import { DeleteModal, EditProductModel } from "../../../components/admin";
import { formatPrice } from "../../../utils/priceFormat";
import { Helmet } from "react-helmet";

import useMutationHook from "../../../hooks/useMutationHook";
const ProductsList = () => {
  // const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
  //   []
  // );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isError, isRefetching, isLoading, refetch } = useTableQueryHook(
    {
      sorting,
      globalFilter,
      pagination,
      url: "product",
      queryName: "getProducts", 
    }
  );
  const { mutate: toggleVisibility } = useMutationHook({
    url: `/product/visibility`,
    method: "PATCH",
    refetch,
  });
  const columns = useMemo<MRT_ColumnDef<ProductListType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue, row }) => (
          <Stack>
            <Link
              to={`/dashboard/product/details/${row.original._id}`}
              component={RouterLink}
              color={"black"}
              underline="none"
            >
              <Typography variant="body2" fontWeight="bold">
                {renderedCellValue}
              </Typography>
            </Link>
            <Tooltip title={row.original._id}>
              <Typography fontSize={"12px"}>
                #{row.original._id.slice(0, 9)}
              </Typography>
            </Tooltip>
          </Stack>
        ),
      },
      {
        accessorKey: "coverImage.secure_url",
        header: "Image",
        Cell: ({ renderedCellValue }) => (
          <Box width={{ md: "100px", xs: "70px" }} p={2}>
            <img
              src={(renderedCellValue as string) || ""}
              loading="lazy"
              style={{ width: "100%" }}
            />
          </Box>
        ),
      },
      {
        accessorKey: "isDisabled",
        header: "Visibility",
        Cell: ({ renderedCellValue, row }) => (
          <Switch
            inputProps={{ "aria-label": "Switch Visibility" }}
            defaultChecked={!renderedCellValue as boolean}
            onChange={() => toggleVisibility({ productId: row.original._id })}
          />
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ renderedCellValue }) => (
          <Typography>
            {formatPrice((renderedCellValue as number) || 0)}
          </Typography>
        ),
      },
      {
        accessorKey: "appliedDiscount",
        header: "Applied Discount",
        Cell: ({ renderedCellValue }) => (
          <Typography>{renderedCellValue}%</Typography>
        ),
      },
      {
        accessorKey: "priceAfterDiscount",
        header: "PAD",
        Cell: ({ renderedCellValue }) => (
          <Typography>
            {formatPrice((renderedCellValue as number) || 0)}
          </Typography>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        Cell: ({ renderedCellValue }) => (
          <Typography
            color={
              renderedCellValue &&
              typeof renderedCellValue == "number" &&
              renderedCellValue > 10
                ? "black"
                : "red"
            }
          >
            {renderedCellValue}
          </Typography>
        ),
      },
      {
        accessorKey: "sold",
        header: "Soold",
        Cell: ({ renderedCellValue }) => (
          <Typography
            color={
              renderedCellValue &&
              typeof renderedCellValue == "number" &&
              renderedCellValue < 10
                ? "black"
                : "red"
            }
          >
            {renderedCellValue}
          </Typography>
        ),
      },
      {
        accessorKey: "category.categoryId.name",
        header: "Parent Category",
        Cell: ({ renderedCellValue, row }) => (
          <Link
            to={`/dashboard/category/details/${row.original.category.categoryId._id}`}
            underline="none"
            component={RouterLink}
            color={"black"}
          >
            <Typography variant="body2" fontWeight="bold">
              {renderedCellValue}
            </Typography>
          </Link>
        ),
      },
      {
        accessorKey: "subCategory.subCategoryId.name",
        header: "Parent Sub Category",
        Cell: ({ renderedCellValue, row }) => (
          <Link
            to={`/dashboard/subCategory/details/${row.original.subCategory.subCategoryId._id}`}
            underline="none"
            component={RouterLink}
            color={"black"}
          >
            <Typography variant="body2" fontWeight="bold">
              {renderedCellValue}
            </Typography>
          </Link>
        ),
      },
      {
        accessorKey: "brand.name",
        header: "Parent Brand",
        Cell: ({ renderedCellValue, row }) => (
          <Link
            to={`/dashboard/brand/details/${row.original.brand._id}`}
            underline="none"
            component={RouterLink}
            color={"black"}
          >
            <Typography variant="body2" fontWeight="bold">
              {renderedCellValue}
            </Typography>
          </Link>
        ),
      },
    ],
    []
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<EditItemType | any>({});
  const [id, setId] = useState("");

  return (
    <>
      <Helmet>
        <title>Products List</title>
      </Helmet>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Products List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={data?.products ?? []} //data is undefined on first render
        // enableFilters={false}
        pageCount={5}
        muiPaginationProps={{
          showLastButton: true,
        }}
        manualPagination
        paginationDisplayMode="pages"
        enablePinning
        manualFiltering
        onPaginationChange={setPagination}
        manualSorting
        enableRowActions
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              setItem(row.original);
              setOpenEdit(true);
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
        title="Delete Product"
        open={openDelete}
        setOpen={setOpenDelete}
        url={`/product/${id}`}
        name="Product"
        refetch={refetch}
      />
      <EditProductModel
        open={openEdit}
        setOpen={setOpenEdit}
        product={item}
        refetch={refetch}
        key={item._id}
      />
    </>
  );
};

export default ProductsList;
