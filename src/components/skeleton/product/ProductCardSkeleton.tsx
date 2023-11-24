import { Box, Grid } from "@mui/material";
import { Skeleton } from "@mui/lab";

const ProductCardSkeleton = () => {
  return [1, 2, 3, 4, 5, 6].map((product: any) => (
    <Grid lg={4} md={6} xs={12} key={product + "Sdoj"}>
      <Box px={1} >
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px" }}
          width={"100%"}
          height={418}
        />
      </Box>
    </Grid>
  ));
};

export default ProductCardSkeleton;
