import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import { UseMutateFunction } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useQueryHook from "../../hooks/useQueryHook";
import { AppContext } from "../../context/AppContext";

type Props = {
  subCategoryId: string;
  AddToCart: UseMutateFunction<any, any, any, unknown>;
  reduceFromCart: UseMutateFunction<any, any, any, unknown>;
  cart: any;
};

const RelatedProducts = ({
  subCategoryId,
  AddToCart,
  cart,
  reduceFromCart,
}: Props) => {
  const { data: relatedProducts } = useMultiQueryHook({
    queries: [`getRelatedProducts-${subCategoryId}`],
    url: `/product?subCategory.subCategoryId[eq]=${subCategoryId}&size=4`,
    selectedProp: "products",
  });
  const { auth } = useContext(AppContext);
  const [loadingIndecator, setLoadingIndecator] = useState("");
  const { data: user, refetch } = useQueryHook({
    url: "/auth",
    query: "getUser",
    selectedProp: "user",
    options: {
      enabled: auth._id ? true : false,
    },
  }) as { data: any; refetch: any };
  return (
    <Box mt={3}>
      <Typography fontWeight={"bold"} fontSize={{ md: "30px", xs: "22px" }}>
        Related Products
      </Typography>
      {relatedProducts && (
        <Grid container rowGap={2} mt={2}>
          {relatedProducts.map((product: any) => (
            <Grid lg={3} md={4} sm={6} xs={12}>
              <Box px={2}>
                <ProductCard
                  product={product}
                  key={product._id}
                  cart={cart}
                  AddToCart={AddToCart}
                  loadingIndecator={loadingIndecator}
                  setLoadingIndecator={setLoadingIndecator}
                  refetch={refetch}
                  wishlist={user?.wishlist}
                  reduceFromCart={reduceFromCart}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RelatedProducts;
