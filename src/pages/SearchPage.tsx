import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Grid,
  Drawer,
  IconButton,
  Container,
  Pagination,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import useMultiQueryHook from "../hooks/useMultiQueryHook";
import { SearchFilters, SearchInfo } from "../components";
import CloseIcon from "@mui/icons-material/Close";
import ProductCard from "../components/product/ProductCard";
import { AppContext } from "../context/AppContext";
import useCartMutationHook from "../hooks/useCartMutationHook";
import useQueryHook from "../hooks/useQueryHook";
import useCartQueryHook from "../hooks/useCartQueryHook";
import ProductCardSkeleton from "../components/skeleton/product/ProductCardSkeleton";
import { Helmet } from "react-helmet";
const SearchPage = () => {
  const { searchTerm } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);

  const [sort, setSort] = React.useState(
    searchParams.get("sort") || "revelance"
  );
  const [page, setPage] = React.useState(1);

  const [ratings, setRatings] = useState<number[]>(
    (searchParams.get("ratings") as unknown as number[]) || []
  );
  const [price, setPrice] = useState([
    Number(searchParams.get("fromPrice")) || 0,
    Number(searchParams.get("toPrice")) || 100000,
  ]);

  const { data, isPending } = useMultiQueryHook({
    queries: [
      "getSearchProducts",
      page,
      sort,
      searchTerm as string,
      ratings as unknown as string,
      price as unknown as string,
    ],
    url: `/product?page=${page}&size=10&search=${searchTerm}${
      sort != "revelance" ? "&sort=" + sort : ""
    }${
      ratings.length > 0 ? "&rating[in]=" + JSON.stringify(ratings) : ""
    }&price[gte]=${price[0]}&price[lte]=${price[1]}`,
  });
  const { show } = useContext(AppContext);

  const [FilterSearch, setFilterSearch] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setPage(value);
  };
  const [loadingIndecator, setLoadingIndecator] = useState("");
  const { data: user, refetch: refetchWishlist } = useQueryHook({
    url: "/auth",
    query: "getUser",
    selectedProp: "user",
    options: {
      enabled: localStorage.getItem("token") ? true : false,
    },
  }) as { data: any; refetch: any };
  const { data: cart, refetch } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const { mutate: AddToCart } = useCartMutationHook({
    url: "add",
    method: "POST",
    setLoadingIndecator,
    refetch,
  });
  const { mutate: reduceFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PUT",
    setLoadingIndecator,
    refetch,
  });
  useEffect(() => {
    updatedSearchParams.set("sort", sort);

    setSearchParams(updatedSearchParams);
  }, [sort]);
  useEffect(() => {
    updatedSearchParams.set("ratings", ratings as unknown as string);
    setSearchParams(updatedSearchParams);
  }, [ratings]);
  useEffect(() => {
    updatedSearchParams.set("fromPrice", price[0].toString());
    updatedSearchParams.set("toPrice", price[1].toString());
    setSearchParams(updatedSearchParams);
  }, [price]);

  return (
    <>
      <Helmet>
        <title>search for {searchTerm}</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ height: "100vh" }}>
        <Box p={2}>
          <SearchInfo
            sort={sort}
            setSort={setSort}
            searchTerm={searchTerm || ""}
            setFilterSearch={setFilterSearch}
          />
          {show && (
            <React.Fragment key={"left"}>
              <Drawer
                anchor={"left"}
                variant="temporary"
                open={FilterSearch}
                onClose={() => setFilterSearch(false)}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    maxWidth: "350px",
                    height: "100%",
                    p: 2,
                  },
                }}
              >
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={2}
                >
                  <Typography>Search in Bazar</Typography>
                  <IconButton
                    type="button"
                    sx={{ p: "14px" }}
                    aria-label="close"
                    onClick={() => setFilterSearch(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <SearchFilters
                  ratings={ratings}
                  setRatings={setRatings}
                  price={price}
                  setPrice={
                    setPrice as Dispatch<SetStateAction<number | number[]>>
                  }
                />
              </Drawer>
            </React.Fragment>
          )}
          <Grid container mt={5}>
            {!show && (
              <Grid md={3} xs={0}>
                <Paper sx={{ p: 4, borderRaduis: "8px" }}>
                  <SearchFilters
                    ratings={ratings}
                    setRatings={setRatings}
                    price={price}
                    setPrice={
                      setPrice as Dispatch<SetStateAction<number | number[]>>
                    }
                  />
                </Paper>
              </Grid>
            )}
            <Grid container md={9} xs={12} pl={{ md: 2, xs: 0 }} rowGap={2}>
              {isPending && (
                <ProductCardSkeleton columns={{ md: 4, sm: 6, xs: 12 }} />
              )}
              {data?.products.length > 0 &&
                data.products.map((product: any) => (
                  <Grid lg={4} md={6} xs={12}>
                    <Box px={1}>
                      <ProductCard
                        product={product}
                        loadingIndecator={loadingIndecator}
                        AddToCart={AddToCart}
                        cart={cart}
                        refetch={refetchWishlist}
                        wishlist={user?.wishlist || []}
                        setLoadingIndecator={setLoadingIndecator}
                        reduceFromCart={reduceFromCart}
                      />
                    </Box>
                  </Grid>
                ))}
            </Grid>
            {data?.products.length == 0 && (
              <Typography
                color="grey"
                fontWeight="bold"
                textAlign="center"
                width="100%"
              >
                No search result
              </Typography>
            )}
            {data?.products.length > 0 && (
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
        </Box>
      </Container>
    </>
  );
};

export default SearchPage;
