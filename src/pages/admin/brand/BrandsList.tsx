/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Stack,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../../components/admin/modals/DeleteModal";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import { editBrandSchema } from "../../../validation/brand.validator";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { EditItemModal } from "../../../components/admin";
import { Helmet } from "react-helmet";

const BrandsList = () => {
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 4,
  });
  const {
    data: brands,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useTableQueryHook({
    sorting,
    globalFilter,
    pagination,
    url:"brand",
    selectedProp:"brands",
    queryName:"getBrands",
  });
  const columns = useMemo<MRT_ColumnDef<BrandsListType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue, row }) => (
          <Stack>
             <Link
              to={`/dashboard/brand/details/${row.original._id}`}
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
        accessorKey: "image.secure_url",
        header: "Image",
        Cell: ({ renderedCellValue }) => (
          <img
            src={(renderedCellValue as string) || ""}
            loading="lazy"
            style={{ width: "100px", height: "100px" }}
          />
        ),
      },
      // {
      //   accessorKey: "createdBy",
      //   header:"Created By",

      // }
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
        <title>Brands List</title>
      </Helmet>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Brand List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={brands ?? []} //data is undefined on first render
        // enableFilters={false}
        manualFiltering
        manualPagination
        enablePagination
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
        title="Delete Brand"
        warning={`By deleting this Brand, all products under this Brand will also be deleted.`}
        open={openDelete}
        setOpen={setOpenDelete}
        url={`/brand/${id}`}
        name="Brand"
        refetch={refetch}
      />
      <EditItemModal
        title="Edit Brand"
        open={openEdit}
        setOpen={setOpenEdit}
        item={item}
        refetch={refetch}
        key={item._id}
        name="Brand"
        url={`/brand/${item._id}`}
        schema={editBrandSchema}
      />
    </>
  );
};

export default BrandsList;
