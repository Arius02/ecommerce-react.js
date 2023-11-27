import BigDiscountCarousels from "../components/carousels/BigDiscountCarousels";
import BigOffersCarousels from "../components/carousels/BigOffersCarousels";
import NewArrivals from "../components/product/NewArrivals";
import ProductsWithFilter from "../components/product/ProductsWithFilter";
import TopRated from "../components/product/TopRated";
import { Box, Container } from "@mui/material";
import useQueryHook from "../hooks/useQueryHook";
import useCartQueryHook from "../hooks/useCartQueryHook";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { auth } = useContext(AppContext);
  const { data: user, refetch: refetchWishlist } = useQueryHook({
    url: "/auth",
    query: "getUser",
    selectedProp: "user",
    options: {
      enabled: auth._id ? true : false,
    },
  }) as { data: any; refetch: any };
  const { data: cart,  } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  return (
    <>
      <BigOffersCarousels />
      <Container maxWidth="xl">
        <Box my={4} px={{ md: 5, xs: 1 }}>
          <TopRated />
          <NewArrivals />
          <BigDiscountCarousels />
          <ProductsWithFilter
            title="home & kitchen"
            subCategory="65463c8d7595315d63f5e985"
            queryName="gethomeNKitchenProducts"
            brandQueryName="getHomeBrands"
            wishlist={user && user.wishlist}
            refetchWishlist={refetchWishlist}
            cart={cart}
          />
          <ProductsWithFilter
            title="Mobiles"
            subCategory="65463b9e7595315d63f5e971"
            queryName="getMobilesProducts"
            brandQueryName="getMobileBrands"
            wishlist={user && user.wishlist}
            refetchWishlist={refetchWishlist}
            cart={cart}
          />
        </Box>
      </Container>
    </>
  );
};

export default Home;
