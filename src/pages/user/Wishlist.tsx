import { Grid, Typography, Stack, Box, Pagination } from "@mui/material";
import { ProductCard } from "../../components";
import useCartMutationHook from "../../hooks/useCartMutationHook";
import useCartQueryHook from "../../hooks/useCartQueryHook";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { pink, blueGrey } from "@mui/material/colors";
import { useState } from "react";
import ProductCardSkeleton from "../../components/skeleton/product/ProductCardSkeleton";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";

const Wishlist = () => {
  const [page, setPage] = useState(1);
  const {
    data: wishlist,
    refetch: refetchWishlist,
    isPending,
  } = useMultiQueryHook({
    url: `/wishlist?size=4&page=${page}`,
    queries: ["getWishlist", page],
    selectedProp: "wishlist",
    // options: {
    //   enabled: localStorage.getItem("token") ? true : false,
    // },
  });
  const { data: cart, refetch: refetchCart } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const [loadingIndecator, setLoadingIndecator] = useState("");
  const { mutate: AddToCart } = useCartMutationHook({
    url: "add",
    method: "POST",
    refetch: refetchCart,
    setLoadingIndecator,
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setPage(value);
  };
  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <FavoriteOutlinedIcon sx={{ color: pink[500] }} />
        <Typography fontWeight={"bold"} color={blueGrey[900]} fontSize={"24px"}>
          My Wish List
        </Typography>
      </Stack>
      <Grid container xs={12} rowGap={2}>
        {wishlist &&
          wishlist.map((product: any) => (
            <Grid item md={4} sm={6} xs={12}>
              <Box p={2}>
                <ProductCard
                  product={product}
                  cart={cart}
                  wishlist={[...wishlist.map((product: any) => product._id)]}
                  refetch={refetchWishlist}
                  AddToCart={AddToCart}
                  loadingIndecator={loadingIndecator}
                  setLoadingIndecator={setLoadingIndecator}
                />
              </Box>
            </Grid>
          ))}
        {isPending && <ProductCardSkeleton />}
      </Grid>
      {wishlist&&<Pagination
        count={3}
        page={page}
        variant="outlined"
        color="primary"
        onChange={handleChange}
        sx={{ width: "fit-content", m: "auto", mt: 2 }}
      />}
    </>
  );
};

export default Wishlist;
