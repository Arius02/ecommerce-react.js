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

import { editCategorySchema } from "../../../validation/category.validator";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import {Link as RouterLink} from "react-router-dom"
import Link from "@mui/material/Link";
import { DeleteModal, EditItemModal } from "../../../components/admin";

import { Helmet } from "react-helmet";

const CategoriesList = () => {
    
   const [globalFilter, setGlobalFilter] = useState("");
   const [sorting, setSorting] = useState<MRT_SortingState>([]);
   const [pagination, setPagination] = useState<MRT_PaginationState>({
     pageIndex: 1,
     pageSize: 4,
   });
   const {
     data: categories,
     isError,
     isRefetching,
     isLoading,
     refetch,
   } = useTableQueryHook({
     sorting,
     globalFilter,
     pagination,
     url: "category",
     selectedProp: "categories",
     queryName: "getCategories",
   });

    const columns = useMemo<MRT_ColumnDef<CategoriesListType>[]>(
      () => [
        {
          accessorKey: "name",
          header: "Name",
          Cell: ({ renderedCellValue, row }) => (
            <Stack>
                 <Link
              to={`/dashboard/category/details/${row.original._id}`}
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
        <title>Categories List</title>
      </Helmet>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Categories List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={categories ?? []} //data is undefined on first render
        enableFilters={false}
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
        title="Delete Category"
        warning="By deleting this category, all sub categories and products under this category will also be deleted."
        open={openDelete}
        setOpen={setOpenDelete}
        url={`/category/${id}`}
        name="Category"
        refetch={refetch}
      />
      <EditItemModal
        title="Edit Category"
        open={openEdit}
        setOpen={setOpenEdit}
        item={item}
        refetch={refetch}
        key={item._id}
        name="Category"
        url={`/category/${item._id}`}
        schema={editCategorySchema}
      />
    </>
  );
};

export default CategoriesList;
