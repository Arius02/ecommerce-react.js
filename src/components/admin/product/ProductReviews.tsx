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
  Rating,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../../components/admin/modals/DeleteModal";
import useTableQueryHook from "../../../hooks/useTableQueryHook";
import {Link as RouterLink} from "react-router-dom"
import Link from "@mui/material/Link";


type Props = {
    id:string
}    

const ProductReviews = ({id}: Props) => {

  //  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
  //    []
  //  );
   const [globalFilter, setGlobalFilter] = useState("");
   const [sorting, setSorting] = useState<MRT_SortingState>([]);
   const [pagination, setPagination] = useState<MRT_PaginationState>({
     pageIndex: 1,
     pageSize: 10,
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
     url: `review/${id}`,
     selectedProp: "reviews",
     queryName: "getReviews",
   });

    const columns = useMemo<MRT_ColumnDef<RivewsListType>[]>(
      () => [
        {
          accessorKey: "userId",
          header: "User ID",
          Cell: ({ renderedCellValue }) => (
            <Tooltip title={renderedCellValue}>
              <Link
                to={`/dashboard/user/details/${renderedCellValue}`}
                component={RouterLink}
                color={"black"}
                underline="none"
              >
                <Typography variant="body1">
                  #
                  {renderedCellValue &&
                    typeof renderedCellValue == "string" &&
                    renderedCellValue.slice(0, 9)}
                </Typography>
              </Link>
            </Tooltip>
          ),
        },
        {
          accessorKey: "reviewDisc",
          header: "Review",
          Cell: ({ renderedCellValue }) => (
            <>
              {renderedCellValue &&
              typeof renderedCellValue == "string" &&
              renderedCellValue.length > 20 ? (
                <Tooltip title={renderedCellValue}>
                  <Typography variant="body1">
                    {renderedCellValue.slice(0, 20)}
                    ...
                  </Typography>
                </Tooltip>
              ) : (
                <Typography variant="body1">{renderedCellValue}</Typography>
              )}
            </>
          ),
        },
        {
          accessorKey: "rating",
          header: "Rating",
          Cell: ({ renderedCellValue }) => (
            <Rating name="rating" value={Number(renderedCellValue)} readOnly />
          ),
        },
      ],
      []
    );
   const [openDelete, setOpenDelete] = useState(false);
   const [idToDelete, setIdToDelete] = useState("");
  return <>
    <MaterialReactTable
      columns={columns}
      data={cateegories ?? []} //data is undefined on first render
      // initialState={{ showColumnFilters: true }}
      // manualFiltering
      // enableFilters={false}
      manualPagination
      enablePagination
      manualSorting
      enableRowActions
      renderRowActionMenuItems={({ closeMenu, row }) => [
        <MenuItem
          key={1}
          onClick={() => {
            setIdToDelete(row.original._id);
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
      // onColumnFiltersChange={setColumnFilters}
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
        title="Delete Review"
        open={openDelete}
        setOpen={setOpenDelete}
        url={`/review/${idToDelete}`}
        name="Review"
        refetch={refetch}
      />
      </>
  
}

export default ProductReviews