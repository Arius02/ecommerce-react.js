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
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import { editSubCategorySchema } from "../../../validation/subCategory.validator";
import Link from "@mui/material/Link";
import {  Link as RouterLink } from "react-router-dom";
import { DeleteModal, EditItemModal } from "../../../components/admin";
import { Helmet } from "react-helmet";


const SubCategoriesList = () => {
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 4,
  });
  const {
    data: cateegories,
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useTableQueryHook({
    sorting,
    globalFilter,
    pagination,
    url: "subCategory",
    selectedProp: "subCategories",
    queryName: "getSubCategories",
  });

  const columns = useMemo<MRT_ColumnDef<SubCategoriesListType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue, row }) => (
          <Stack>
            <Link
              to={`/dashboard/subCategory/details/${row.original._id}`}
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
      {
        accessorKey: "category.categoryId.name",
        header: "Parent Category",
        Cell: ({ renderedCellValue, row }) => (
          <Link
            to={`/dashboard/category/details/${row.original.category.categoryId._id }`}
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
        <title>Sub Categories List</title>
      </Helmet>
      <Typography fontWeight={"bold"} variant={"h5"} mb={4}>
        Sub Categories List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={cateegories ?? []} //data is undefined on first render
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
        title="Delete Sub Category"
        warning="By deleting this sub category, all products under this sub category will also be deleted."
        open={openDelete}
        setOpen={setOpenDelete}
        url={`/subCategory/${id}`}
        name="Sub Category"
        refetch={refetch}
      />
      <EditItemModal
        title="Edit Sub Category"
        open={openEdit}
        setOpen={setOpenEdit}
        item={item}
        refetch={refetch}
        key={item._id}
        name="Sub Category"
        url={`/subCategory/${item._id}`}
        schema={editSubCategorySchema}
        enabled={true}
      />
    </>
  );
};

export default SubCategoriesList;
