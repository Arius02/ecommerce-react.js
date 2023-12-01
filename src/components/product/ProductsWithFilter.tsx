import { Typography, Box, Stack, Pagination, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import BrandFiltersBox from "./BrandFiltersBox";
import BrandFilterMenu from "./BrandFilterMenu";
import useCartMutationHook from "../../hooks/useCartMutationHook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import ProductCardSkeleton from "../skeleton/product/ProductCardSkeleton";
import { AppContext } from "../../context/AppContext";

type Props = {
  title: string;
  subCategory: string;
  queryName: string;
  brandQueryName: string;
  refetchWishlist: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
  wishlist: any;
  cart: any;
  refetchCart: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

const ProductsWithFilter = ({
  title,
  subCategory,
  queryName,
  brandQueryName,
  wishlist,
  refetchWishlist,
  cart,
  refetchCart,
}: Props) => {
  const { show } = useContext(AppContext);
  const [filterWord, setFilterWord] = useState("");
  const [page, setPage] = useState(1);
  const { data, isPending } = useMultiQueryHook({
    queries: [queryName, filterWord, page],
    url: `/product?subCategory.subCategoryId[eq]=${subCategory}${
      filterWord && "&brand[eq]=" + filterWord
    }&size=3&page=${page}`,
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setPage(value);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [loadingIndecator, setLoadingIndecator] = useState("");

  const { mutate: AddToCart } = useCartMutationHook({
    url: "add",
    method: "POST",
    setLoadingIndecator,
    refetch: refetchCart,
  });
  const { mutate: reduceFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PUT",
    setLoadingIndecator,
    refetch: refetchCart,
  });

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2 }}
      sx={{ mt: 4 }}
    >
      {!show && (
        <Grid md={3}>
          <BrandFiltersBox
            brandQueryName={brandQueryName}
            subCategory={subCategory}
            filterWord={filterWord}
            setFilterWord={setFilterWord}
            setPage={setPage}
          />
        </Grid>
      )}
      <Grid md={9} xs={12} pl={{ md: 2, xs: 0 }}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={"bold"} fontSize={"20px"} mb={2}>
            {title}
          </Typography>
          {show && (
            <>
              <IconButton
                type="button"
                sx={{ p: "14px" }}
                aria-label="filters"
                id="filter-menu"
                aria-controls={open ? "lfilter-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <FilterListIcon />
              </IconButton>
              <BrandFilterMenu
                anchorEl={anchorEl}
                brandQueryName={brandQueryName}
                subCategory={subCategory}
                filterWord={filterWord}
                setFilterWord={setFilterWord}
                setPage={setPage}
                open={open}
                setAnchorEl={setAnchorEl}
              />
            </>
          )}
        </Stack>
        <Grid container columns={12} rowGap={3}>
          {data &&
            data.products.map((product: any) => (
              <Grid lg={4} sm={6} xs={12} key={product._id}>
                <Box px={1}>
                  <ProductCard
                    product={product}
                    AddToCart={AddToCart}
                    cart={cart}
                    wishlist={wishlist}
                    refetch={refetchWishlist}
                    loadingIndecator={loadingIndecator}
                    setLoadingIndecator={setLoadingIndecator}
                    reduceFromCart={reduceFromCart}
                  />
                </Box>
              </Grid>
            ))}
          {isPending && (
            <ProductCardSkeleton columns={{ lg: 3, md: 6, xs: 12 }} />
          )}
        </Grid>
        {data && (
          <Pagination
            count={data.totalPages}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
            sx={{ width: "fit-content", m: "auto", mt: 2 }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ProductsWithFilter;
