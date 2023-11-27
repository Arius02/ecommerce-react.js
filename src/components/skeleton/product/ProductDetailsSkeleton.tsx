import { Box, Stack, Grid } from "@mui/material";
import { Skeleton } from "@mui/lab";
import ProductReviewsSkeleton from "./ProductReviewsSkeleton";
const ProductDetailsSkeleton = () => {
  return (
    <>
      <Grid container>
        <Grid md={5} xs={12}>
          <Stack flexDirection={{ md: "row", xs: "column-reverse" }}>
            <Stack
              gap={5}
              flexDirection={{ md: "column", xs: "row" }}
              justifyContent={"center"}
            >
              {[12, 33, 64, 53].map((image: any) => (
                <Skeleton width="70px" height="70px" key={image} />
              ))}
            </Stack>
            <Stack
              justifyContent={"center"}
              alignItems="center"
              width={"300px"}
              maxHeight="500px"
              mx="auto"
              mb={4}
            >
              <Skeleton width="100%" height="100%" />
            </Stack>
          </Stack>
        </Grid>
        <Grid md={1} xs={0} />
        <Grid md={6} xs={12} mt={{ md: 0, xs: 5 }}>
          <Box>
            <Skeleton
              variant="text"
              sx={{ fontSize: { md: "25px", xs: "20px" } }}
              width={400}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: { md: "20px", xs: "16px" } }}
              width={80}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: { md: "22px", xs: "18px" } }}
              width={100}
            />

            <Box mt={4}>
              <Skeleton variant="rectangular" height={120} width={350} />
            </Box>
            <Skeleton
              variant="text"
              sx={{ fontSize: { md: "20px", xs: "16px" } }}
              width={100}
            />

            <Stack flexDirection={"row"} gap={2} mt={5}>
              <Skeleton variant="rectangular" width={120} height={40} />
              <Skeleton variant="rectangular" width={100} height={40} />
            </Stack>
          </Box>
        </Grid>
      </Grid>
        <ProductReviewsSkeleton/>
    </>
  );
};

export default ProductDetailsSkeleton;
