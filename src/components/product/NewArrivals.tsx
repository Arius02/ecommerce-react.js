import {
  Box,
  Grid,

  Paper,
} from "@mui/material";
import SectionHeader from "../common/SectionHeader";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import New from "../../SVGs/New";
import ProductBox from "./ProductBox";
import ProductBoxSkeleton from "../skeleton/product/ProductBoxSkeleton"
const NewArrivals = () => {
  const { data: products, isPending } = useMultiQueryHook({
    queries: ["getBewArrivalsProducts"],
    url: `/product?sort=-createdAt&size=6`,
    selectedProp: "products",
  });
  
  return (
    <Box mt={5}>
      <SectionHeader Icon={New} title="New Arrivals" />
      <Paper
        sx={{ px: { md: 2, xs: 0 }, py: 2, borderRadius: "8px" }}
        elevation={0}
      >
        {isPending && <ProductBoxSkeleton/>}
        {products && (
          <Grid container rowGap={3}>
            {products.map((product: any) => (
              <Grid
                xl={2}
                md={4}
                xs={6}
                key={product.customId}
                display="flex"
                flexDirection={"column"}
                alignItems={"center"}
              >
                <ProductBox product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default NewArrivals;
