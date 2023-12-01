import {
  Grid,
  Typography,
  Stack,
  Box,
  Pagination,
  IconButton,
} from "@mui/material";
import { ProductCard } from "../../components";
import useCartMutationHook from "../../hooks/useCartMutationHook";
import useCartQueryHook from "../../hooks/useCartQueryHook";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { pink, blueGrey } from "@mui/material/colors";
import { useContext, useState } from "react";
import ProductCardSkeleton from "../../components/skeleton/product/ProductCardSkeleton";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../context/AppContext";
import { Helmet } from "react-helmet";

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
  });
  const { data: cart,refetch } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const [loadingIndecator, setLoadingIndecator] = useState("");
  const { mutate: AddToCart } = useCartMutationHook({
    url: "add",
    method: "POST",
    setLoadingIndecator,
    refetch
  });
  const { mutate: reduceFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PUT",
    setLoadingIndecator,
    refetch
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setPage(value);
  };
  const { setOpenUserDashboard, show } = useContext(AppContext);
  return (
    <>
      <Helmet>
        <title>My Wishlist</title>
      </Helmet>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <FavoriteOutlinedIcon sx={{ color: pink[500] }} />
          <Typography
            fontWeight={"bold"}
            color={blueGrey[900]}
            fontSize={"24px"}
          >
            My Wish List
          </Typography>
        </Stack>
        {show && (
          <IconButton>
            <MenuIcon onClick={() => setOpenUserDashboard(true)} />
          </IconButton>
        )}
      </Stack>
      {wishlist?.length > 0 && (
        <>
          <Grid container xs={12} rowGap={2}>
            {wishlist.map((product: any) => (
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
                    reduceFromCart={reduceFromCart}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={3}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
            sx={{ width: "fit-content", m: "auto", mt: 2 }}
          />
        </>
      )}
      {wishlist?.length == 0 && (
        <Typography
          fontWeight={"bold"}
          color={"grey"}
          textAlign={"center"}
          mt={10}
        >
          There are no product in wishlist
        </Typography>
      )}
      {isPending && <ProductCardSkeleton columns={{ md: 4, sm: 6, xs: 12 }} />}
    </>
  );
};

export default Wishlist;
