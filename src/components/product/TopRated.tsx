import {
  Box,
  Paper,
  Grid,
} from "@mui/material";
import SectionHeader from "../common/SectionHeader";
import TopRatedIcon from "../../SVGs/TopRated";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import ProductBox from "./ProductBox";
import ProductBoxSkeleton from "../skeleton/product/ProductBoxSkeleton";

const TopRated = () => {
  const { data: products, isPending } = useMultiQueryHook({
    queries: ["getTopRatedProducts"],
    url: `/product?sort=-rating&size=6`,
    selectedProp: "products",
  });
  console.log(products);
  return (
    <Box mt={5}>
      <SectionHeader Icon={TopRatedIcon} title="Top Ratings" />
      <Paper sx={{ px: { md: 2, xs: 0 }, py: 2,  borderRadius: "8px" }} elevation={0}>
        {isPending && <ProductBoxSkeleton/>}
        {products && (
          <Grid container>
            {products.map((product: any) => (
              <Grid
              xl={2}
                md={4}
                sm={6}
                xs={6}
                key={product.customId}
                display="flex"
                flexDirection={"column"}
                alignItems={"center"}
              >
               <ProductBox rating={true} product={product}/>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default TopRated;
